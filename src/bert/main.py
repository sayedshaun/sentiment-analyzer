from fastapi import FastAPI
from transformers import pipeline
from schema import BertResponse, TextInput
from mapper import label_mapping, merged_label_mapping
import asyncio

app = FastAPI(title="Bangla Sentiment Classifier API")


classifier = pipeline(
    "text-classification", model="SayedShaun/bangla-classifier-multiclass"
)


@app.post("/bert_classifier", response_model=BertResponse)
async def bert_classifier(input_data: TextInput):
    """
    Classify Bangla text into Positive, Negative, or Neutral.
    """

    # Run blocking model inference in thread executor
    loop = asyncio.get_running_loop()
    result = await loop.run_in_executor(None, lambda: classifier(input_data.text)[0])

    raw_label = label_mapping[result["label"]]
    merged_label = merged_label_mapping[raw_label]

    return BertResponse(label=merged_label, score=round(result["score"], 4))