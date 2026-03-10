from typing import TypedDict
from .schema import Story


class State(TypedDict):
    text: str
    summary: str
    sentiment: str
    story: Story
    alert: bool
    positive: int
    negative: int
    neutral: int