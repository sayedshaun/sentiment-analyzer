from src.backend.apis import router
from fastapi import FastAPI

app = FastAPI(title="Bangla Content Analysis API")
app.include_router(router)