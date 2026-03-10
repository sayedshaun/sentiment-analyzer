from langchain_core.prompts import PromptTemplate


def feature_extraction_prompt(text: str) -> str:
    FEATURE_EXTRACTION_PROMPT_TEMPLATE = """
    You are a content analysis expert. Your task is to identify the **most important and highlighted stories** in the given text that define the main essence of the content. For each important story, provide:

    1. What happened
    2. Who was involved
    3. Where it happened
    4. A short one-sentence summary
    5. Your opinion on the sentiment (Negative, Positive, Neutral)

    Rules:
    - Only select the most important stories; ignore minor or trivial events.
    - Do not repeat the same story; each story must be unique.
    - If there is any threat, violence, or mention of harm → "Negative"
    - If law enforcement is performing their lawful duty → not negative
    - Peaceful protests or movements → "Neutral"
    - Natural disasters → "Negative"
    - Any crime or attempt to commit a crime → "Negative"
    - Positive outcomes or praise → "Positive"
    - Factual but unclear information → "Neutral"
    - Sentiment should be classified as "Negative" **only** if there is killing, murder, threat, or severe/violent harm. Minor conflicts or arguments should not be considered negative.
    - Answer must be in Bengali

    Text:
    {text}
    """

    prompt = PromptTemplate(
        input_variables=["text"],
        template=FEATURE_EXTRACTION_PROMPT_TEMPLATE,
    )

    return prompt.format(text=text)
