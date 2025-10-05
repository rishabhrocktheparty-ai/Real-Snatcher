# Dockerfile.ml
# GPU-ready Dockerfile for ML Worker
# This container simulates a production ML environment with CUDA, PyTorch, and all dependencies.
# In production, use nvidia/cuda base image and provision GPU resources (A100/H100).
# WARNING: Running proprietary DiT models requires high VRAM GPUs and incurs significant cost.

FROM python:3.10-slim
LABEL maintainer="Real-Snatcher MLOps"

# Install system dependencies
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY ../../requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy worker code
WORKDIR /app
COPY . .

CMD ["python", "mlops/ml_worker.py"]
