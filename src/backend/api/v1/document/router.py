@router.post("/pdf_analyze", response_model=Output)
async def pdf_analyze(file: UploadFile = File(...)):
    text = await file.read()
    result = await executor.ainvoke({"text": text})
    return result
