from typing import Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    TTS_MODEL: Optional[str] = "hishab/titu_stt_bn_fastconformer"
    OLLAMA_MODEL: str
    BERT_MODEL: Optional[str] = "SayedShaun/bangla-classifier-multiclass"
    OLLAMA_URL: Optional[str]

    UI_PORT: int
    BACKEND_HOST: str
    BACKEND_PORT: int

    @property
    def OLLAMA_EXTERNAL_URL(self):
        """
        Returns OLLAMA_URL if set, otherwise constructs from host+port.
        Raises ValueError if neither is available.
        """
        if self.OLLAMA_URL:
            return self.OLLAMA_URL
        if self.OLLAMA_HOST and self.OLLAMA_PORT:
            return f"http://{self.OLLAMA_HOST}:{self.OLLAMA_PORT}"
        raise ValueError(
            "You must define either OLLAMA_URL or both OLLAMA_HOST and OLLAMA_PORT."
        )

    @property
    def TTS_URL(self):
        return "http://sentiment-analyzer-tts:8000/transcribe"

    @property
    def BERT_CLASSIFIER_URL(self):
        return "http://sentiment-analyzer-bert:8000/predict"

    @property
    def CONTENT_ANALYZER_URL(self):
        return "http://sentiment-analyzer-backend:8000"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
