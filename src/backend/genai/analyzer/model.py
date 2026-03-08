from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_ollama import ChatOllama
from langchain_openai import ChatOpenAI
from functools import lru_cache
from langchain_community.cache import SQLiteCache
from fastapi import HTTPException
import httpx
from dotenv import load_dotenv
import os
from ....config import settings


load_dotenv()


cache_path = "langchain_cache.db"
sqlite_cache = SQLiteCache(database_path=cache_path)
timeout = httpx.Timeout(10)
client = httpx.AsyncClient(timeout=timeout)


class LLM:

    @staticmethod
    async def ollama():
        try:
            return ChatOllama(
                model=settings.OLLAMA_MODEL,
                cache=sqlite_cache,
                base_url=settings.OLLAMA_URL,
            )
        except Exception as e:
            raise HTTPException(status_code=404, detail=str(e))


async def bert_inference(text: str):
    try:
        response = await client.post(
            url="http://bert:7777/bert_classifier",
            json={"text": text},
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
