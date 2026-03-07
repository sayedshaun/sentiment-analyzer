from fastapi import APIRouter, Form, HTTPException, status
from .....genai.executor import get_executor

router = APIRouter()
prefix = "/text"


@router.post("/analyze")
async def text_analyze(text=Form(...)):

    try:
        executor = await get_executor()
        result = await executor.ainvoke({"text": text})
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
