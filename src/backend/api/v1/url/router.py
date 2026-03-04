from fastapi import APIRouter, Form, File, UploadFile

from backend.schema import Output


router = APIRouter()
prefix = "/url"

@router.post("/analyze", response_model=Output)
async def url_analyze(url: HttpUrl = Form(...)):
    text = await prothomalo_url_parser(str(url))
    result = await executor.ainvoke({"text": text})
    return result
