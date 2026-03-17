from fastapi import FastAPI
from src.api.v1.audio.router import router as audio_router
from src.api.v1.text.router import router as text_router
from src.api.v1.document.router import router as document_router
from src.api.v1.url.router import router as url_router


app = FastAPI(title="Bangla Content Analysis API")


@app.get("/")
async def root():
    return {"message": "Welcome to the Sentiment Analyzer API!"}


@app.get("/health")
async def health_check():
    return {"status": "ok"}


app.include_router(audio_router)
app.include_router(text_router)
app.include_router(document_router)
app.include_router(url_router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001, reload=True)
