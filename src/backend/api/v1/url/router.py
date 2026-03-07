from fastapi import APIRouter, Form, HTTPException
from .script import crawler
from .....genai.executor import get_executor


router = APIRouter()
prefix = "/url"


@router.post("/analyze")
async def url_analyze(url=Form(...)):

    try:
        text = await crawler(str(url))
        executor = await get_executor()
        result = await executor.ainvoke({"text": text})
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
