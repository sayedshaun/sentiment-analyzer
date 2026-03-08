from langgraph.graph import StateGraph, START, END
from langgraph.graph.state import CompiledStateGraph
import os
import asyncio
from dotenv import load_dotenv
from .model import LLM, bert_inference
from .prompt import feature_extraction_prompt
from .schema import Story, Event, BaseStory, BertSentiment
from .state import State
from src.logging import configure_logger

load_dotenv()
logger = configure_logger(__name__)


async def features_extraction_node(state: State) -> State:
    text = state["text"]
    prompt = feature_extraction_prompt(text)
    model = await LLM.ollama()
    structured_model = model.with_structured_output(BaseStory)
    response = await structured_model.ainvoke(prompt)

    story = Story(
        events=[Event(**event.model_dump()) for event in response.events],
        summary=response.summary,
    )
    state["story"] = story
    return state


async def bert_classifier_node(state: State) -> State:
    story: Story = state["story"]

    async def classify(event: Event):
        result = await bert_inference(event.summary)  # returns dict
        # Wrap dict into BertSentiment
        event.bert_sentiment = BertSentiment(**result)

    await asyncio.gather(*(classify(event) for event in story.events))
    return state


async def sentiment_node(state: State) -> State:
    story: Story = state["story"]

    # Count LLM sentiment
    llm_counts = {"Negative": 0, "Positive": 0, "Neutral": 0}
    for event in story.events:
        llm_counts[event.llm_sentiment] += 1

    # Count BERT sentiment
    bert_counts = {"Negative": 0, "Positive": 0, "Neutral": 0}
    for event in story.events:
        if event.bert_sentiment:
            bert_label = event.bert_sentiment.label
            bert_counts[bert_label] += 1

    # Combine counts
    combined_counts = {
        "Negative": llm_counts["Negative"] + bert_counts["Negative"],
        "Positive": llm_counts["Positive"] + bert_counts["Positive"],
        "Neutral": llm_counts["Neutral"] + bert_counts["Neutral"],
    }
    state["sentiment"] = max(combined_counts, key=lambda x: combined_counts[x])
    state["positive"] = combined_counts["Positive"]
    state["negative"] = combined_counts["Negative"]
    state["neutral"] = combined_counts["Neutral"]

    return state


async def alert_node(state: State) -> State:
    positive = state["positive"]
    negative = state["negative"]
    neutral = state["neutral"]
    if negative > (positive + neutral):
        state["alert"] = True
    else:
        state["alert"] = False
    return state


async def create_graph() -> CompiledStateGraph[State]:
    """Create the workflow for the RAG agent."""
    graph = StateGraph(State)
    graph.add_node("features_extraction_node", features_extraction_node)
    graph.add_node("bert_classifier_node", bert_classifier_node)
    graph.add_node("sentiment_node", sentiment_node)
    graph.add_node("alert_node", alert_node)
    graph.add_edge(START, "features_extraction_node")
    graph.add_edge("features_extraction_node", "bert_classifier_node")
    graph.add_edge("bert_classifier_node", "sentiment_node")
    graph.add_edge("sentiment_node", "alert_node")
    graph.add_edge("alert_node", END)
    compiled_graph = graph.compile()
    return compiled_graph
