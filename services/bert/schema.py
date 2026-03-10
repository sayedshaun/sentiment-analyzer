from pydantic import BaseModel, Field


class TextInput(BaseModel):
    text: str = Field(..., description="Bangla text for sentiment classification")


class BertResponse(BaseModel):
    label: str = Field(
        ..., description="Merged sentiment label (Positive/Negative/Neutral)"
    )
    score: float = Field(..., description="Confidence score for the predicted label")

    class Config:
        json_schema_extra = {
            "example": {
                "label": "Positive",
                "score": 0.9,
            }
        }