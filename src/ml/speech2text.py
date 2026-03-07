# pip install -q 'nemo_toolkit[asr]' pydub

import nemo.collections.asr as nemo_asr
from pydub import AudioSegment
from pathlib import Path
import tempfile
import os


class SpeechToText:
    def __init__(self, chunk_length_ms: int = 30000):
        """
        chunk_length_ms: chunk size in milliseconds for long audio (default 30s)
        """
        print("Loading ASR model...")
        self.model = nemo_asr.models.ASRModel.from_pretrained(
            "hishab/titu_stt_bn_fastconformer"
        )
        print("Model loaded")
        self.chunk_length_ms = chunk_length_ms

    def _convert_to_wav(self, audio_path: str) -> str:
        """
        Convert any audio format to 16kHz mono WAV
        Returns path to temporary WAV file
        """
        audio = AudioSegment.from_file(audio_path)
        audio = audio.set_channels(1).set_frame_rate(16000)

        tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav").name
        audio.export(tmp_file, format="wav")
        return tmp_file

    def _chunk_audio(self, audio_path: str) -> list[str]:
        """
        Split WAV audio into chunks (temp files)
        Returns list of chunk file paths
        """
        audio = AudioSegment.from_file(audio_path)
        chunk_files = []

        for i in range(0, len(audio), self.chunk_length_ms):
            chunk = audio[i : i + self.chunk_length_ms]
            tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav").name
            chunk.export(tmp_file, format="wav")
            chunk_files.append(tmp_file)

        return chunk_files

    def transcribe(self, audio_path: str) -> str:
        """
        Convert audio (any format) to WAV, split into chunks if needed,
        transcribe, and return full text
        """
        wav_file = self._convert_to_wav(audio_path)
        chunk_files = self._chunk_audio(wav_file)

        all_text = []

        for chunk_file in chunk_files:
            result = self.model.transcribe([chunk_file])
            all_text.append(result[0].text)
            os.remove(chunk_file)  # cleanup chunk file

        os.remove(wav_file)  # cleanup converted WAV

        return " ".join(all_text)


if __name__ == "__main__":
    stt = SpeechToText()

    # Example: pass any audio file
    audio_file = "test_record.mp3"  # can be mp3, wav, m4a, ogg
    text = stt.transcribe(audio_file)

    print("Transcription:")
    print(text)
