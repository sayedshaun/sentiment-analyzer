from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    TTS_MODEL: str
    OLLAMA_MODEL: str

    @property
    def TTS_URL(self):
        return "http://sentiment-analyzer-tts:8000/predict"

settings = Settings()