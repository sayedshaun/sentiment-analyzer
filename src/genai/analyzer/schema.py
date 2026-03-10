from typing import List, Union, Literal
from pydantic import BaseModel, Field


class BertSentiment(BaseModel):
    label: Literal["Negative", "Positive", "Neutral"]
    score: float


class BaseEvent(BaseModel):
    action: str = Field(..., description="The action performed by the actor")
    actor: str = Field(..., description="The person or group performing the action")
    location: Union[str, None] = Field(
        ..., description="The location where the event or action occurred"
    )
    llm_sentiment: Literal["Negative", "Positive", "Neutral"] = Field(
        ...,
        description="The sentiment of the action, e.g., Negative, Positive, Neutral",
    )
    summary: str = Field(..., description="A short one-sentence summary of the event")


class Event(BaseEvent):
    bert_sentiment: Union[BertSentiment, None] = Field(
        default=None, description="Filled later by BERT sentiment classifier"
    )


class BaseStory(BaseModel):
    events: List[BaseEvent] = Field(
        ..., description="List of main events or actions identified in the text"
    )
    summary: str = Field(..., description="A brief summary of the text")


class Story(BaseModel):
    events: List[Event] = Field(
        ..., description="List of main events or actions identified in the text"
    )
    summary: str = Field(..., description="A brief summary of the text")
