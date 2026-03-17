from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    TTS_MODEL: str
    OLLAMA_MODEL: str
    BERT_MODEL: str
    OLLAMA_HOST: str | None = "host.docker.internal"
    OLLAMA_PORT: int | None = 11434

    GOOGLE_MODEL: str | None = None
    OPENAI_MODEL: str | None = None

    @property
    def OLLAMA_EXTERNAL_URL(self):
        return f"http://{self.OLLAMA_HOST}:{self.OLLAMA_PORT}"

    @property
    def TTS_URL(self):
        return "http://sentiment-analyzer-tts:8000/transcribe"

    @property
    def OLLAMA_URL(self):
        return "http://sentiment-analyzer-llm:11434"

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
