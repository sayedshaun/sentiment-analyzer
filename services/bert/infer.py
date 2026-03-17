import litserve as ls
import asyncio
from transformers import pipeline
from config import settings
from schema import TextInput, BertResponse
from mapper import label_mapping, merged_label_mapping


class BERTClassifierLitAPI(ls.LitAPI):

    def setup(self, device):
        self.model = pipeline("text-classification", model=settings.BERT_MODEL)

    async def classifier(self, input_data: TextInput):
        """
        Classify Bangla text into Positive, Negative, or Neutral.
        """

        result = await asyncio.to_thread(self.model, input_data.text)
        result = result[0]

        raw_label = label_mapping[result["label"]]
        merged_label = merged_label_mapping[raw_label]

        return BertResponse(label=merged_label, score=round(result["score"], 4))

    async def predict(self, request):
        text = request.get("text")

        if not text:
            raise ValueError("text field is required")

        response = await self.classifier(TextInput(text=text))
        return response

    def encode_response(self, output: BertResponse):
        return output
