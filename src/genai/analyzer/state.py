from typing import TypedDict
from src.ml.schema import Story


class State(TypedDict):
    text: str
    summary: str
    sentiment: str
    story: Story
    alert: bool
    positive: int
    negative: int
    neutral: int