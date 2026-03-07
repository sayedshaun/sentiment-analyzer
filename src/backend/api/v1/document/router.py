import os
import tempfile
from fastapi import APIRouter, File, UploadFile
from fastapi.concurrency import run_in_threadpool
from .....genai.executor import get_executor
from .script import parser

router = APIRouter(prefix="/document")


@router.post("/analyze")
async def document_analyze(file: UploadFile = File(...)):

    with tempfile.NamedTemporaryFile(delete=False, suffix=file.filename) as tmp:
        tmp.write(await file.read())
        file_path = tmp.name

    try:
        markdown_text = await run_in_threadpool(parser.extract_to_markdown, file_path)

        executor = await get_executor()
        result = await executor.ainvoke({"text": markdown_text})

        return result

    finally:
        os.remove(file_path)
