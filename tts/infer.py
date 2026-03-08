import litserve as ls
import nemo.collections.asr as nemo_asr
import tempfile
import os
from tts.utils import convert_to_wav, chunk_audio
from src.config import settings


class ASRLitAPI(ls.LitAPI):

    def setup(self, device):
        self.model = nemo_asr.models.ASRModel.from_pretrained(settings.TTS_MODEL)

    def transcribe(self, path: str) -> str:

        wav_path = convert_to_wav(path)
        chunks = chunk_audio(wav_path, chunk_length_ms=30_000)

        transcription = []
        for chunk_path in chunks:
            result = self.model.transcribe([chunk_path])
            transcription.append(result[0].text)

            os.remove(chunk_path)
        os.remove(wav_path)
        return " ".join(transcription)

    def predict(self, request):
        audio_file = request["file"]
        tmp_path = tempfile.NamedTemporaryFile(
            delete=False, suffix=audio_file.filename
        ).name
        with open(tmp_path, "wb") as f:
            f.write(audio_file.file.read())

        text = self.transcribe(tmp_path)

        os.remove(tmp_path)
        return {"text": text}

    def encode_response(self, output):
        return output
