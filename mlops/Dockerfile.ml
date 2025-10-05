# Dockerfile.ml
# GPU-ready Dockerfile for ML Worker
# This container simulates a production ML environment with CUDA, PyTorch, and all dependencies.
# In production, use nvidia/cuda base image and provision GPU resources (A100/H100).
# WARNING: Running proprietary DiT models requires high VRAM GPUs and incurs significant cost.

FROM nvidia/cuda:12.2.0-cudnn8-runtime-ubuntu24.04
LABEL maintainer="Real-Snatcher MLOps"

# Install Python and dependencies
RUN apt-get update && apt-get install -y python3.10 python3-pip ffmpeg && rm -rf /var/lib/apt/lists/*

# Install PyTorch (CUDA 12.2)
RUN pip3 install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu122

# Install additional dependencies
RUN pip3 install segmentation-models-pytorch fastapi redis

# Copy worker code
WORKDIR /app
COPY ml_worker.py ./
COPY processing ./processing

CMD ["python3", "ml_worker.py"]
