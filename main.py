from fastapi import FastAPI
from src.backend.api.v1.audio.router import router as audio_router


app = FastAPI(title="Bangla Content Analysis API")
app.include_router(audio_router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0", port=8001)