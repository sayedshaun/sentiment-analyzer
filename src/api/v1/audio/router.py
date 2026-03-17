from fastapi import APIRouter, File, UploadFile
import httpx
from ....genai.analyzer.executor import get_executor
from ....config import settings

router = APIRouter(prefix="/audio", tags=["Audio"])

@router.post("/audio_analyze")
async def audio_analyze(file: UploadFile = File(...)):
    text = await file.read()
    executor = await get_executor()
    response = httpx.post(
        settings.TTS_URL,
        files={"file": (file.filename, text, file.content_type)},
    )
    response.raise_for_status()
    text = response.json().get("text", "")
    result = await executor.ainvoke({"text": text})
    return result