#!/bin/bash

set -a
source .env
set +a

sudo docker compose -f docker-compose.yaml down --remove-orphans
sudo docker compose -f docker-compose.yaml up --build -d

CONTAINER_NAME="content-analysis-llm"
MODEL_NAME=${OLLAMA_MODEL}

echo "Pulling Ollama model '$MODEL_NAME' in container '$CONTAINER_NAME'..."
sudo docker exec -it "$CONTAINER_NAME" ollama pull "$MODEL_NAME" 

sudo docker compose -f docker-compose.yaml down --remove-orphans
sudo docker compose -f docker-compose.yaml up --build -d

echo "Deployment Done."