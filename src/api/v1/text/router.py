from fastapi import APIRouter, Form, HTTPException, status
from ....genai.analyzer.executor import get_executor
from src.logging import configure_logger

router = APIRouter(prefix="/text", tags=["Text"])

logger = configure_logger(__name__)


@router.post("/analyze")
async def text_analyze(text=Form(...)):

    try:
        executor = await get_executor()
        result = await executor.ainvoke({"text": text})
        return result
    except Exception as e:
        logger.exception("text_analyze failed")
        # Log full exception server-side; return generic error to client
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )
