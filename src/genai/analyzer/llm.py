import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_ollama import ChatOllama
from langchain_openai import ChatOpenAI
from langchain_community.cache import SQLiteCache
from ...config import settings


cache_dir = ".cache"
os.makedirs(cache_dir, exist_ok=True)
cache_path = f"{cache_dir}/langchain_cache.db"
sqlite_cache = SQLiteCache(database_path=cache_path)


class LLMManager:

    @staticmethod
    async def ollama(model_name: str = settings.OLLAMA_MODEL):
        try:
            return ChatOllama(
                model=model_name,
                cache=sqlite_cache,
                base_url=settings.OLLAMA_EXTERNAL_URL,
            )
        except Exception as e:
            raise e

    @staticmethod
    async def google(model_name: str = settings.GOOGLE_MODEL):
        try:
            return ChatGoogleGenerativeAI(
                model=model_name,
                cache=sqlite_cache,
            )
        except Exception as e:
            raise e

    @staticmethod
    async def openai(model_name: str = settings.OPENAI_MODEL):
        try:
            return ChatOpenAI(
                model=model_name,
                cache=sqlite_cache,
            )
        except Exception as e:
            raise e
