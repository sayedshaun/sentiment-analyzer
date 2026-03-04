@router.post("/text_analyze", response_model=Output)
async def text_analyze(text: str = Form(...)):
    text = preprocess_text(text)
    result = await executor.ainvoke({"text": text})
    return result
