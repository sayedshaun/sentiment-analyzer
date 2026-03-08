from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    TTS_MODEL: str
    OLLAMA_MODEL: str

    @property
    def TTS_URL(self):
        return "http://localhost:8000/transcribe"
    
    @property
    def OLLAMA_URL(self):
        return "http://localhost:11434"
    

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()