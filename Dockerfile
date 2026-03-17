FROM python:3.10-slim AS builder

WORKDIR /app

RUN apt update && apt install ffmpeg tesseract-ocr -y

COPY pyproject.toml .

RUN pip install --upgrade pip

RUN pip install .

FROM python:3.10-slim

RUN apt update && apt install ffmpeg tesseract-ocr -y && rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages

COPY --from=builder /usr/local/bin /usr/local/bin

COPY . /app

WORKDIR /app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

