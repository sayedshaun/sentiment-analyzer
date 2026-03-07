# Use an official Python image with CUDA support (if using GPU)
FROM pytorch/pytorch:2.2.0-cuda12.1-cudnn8-runtime

# Set working directory
WORKDIR /app

# Install system dependencies for audio and FFmpeg
RUN apt-get update && apt-get install -y \
    ffmpeg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose the port the API will run on
EXPOSE 8000

WORKDIR /app/tts

CMD ["python", "main.py"]