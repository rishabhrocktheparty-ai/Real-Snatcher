# Dockerfile.ml
# GPU-ready Dockerfile for ML Worker
# This container simulates a production ML environment with CUDA, PyTorch, and all dependencies.
# In production, use nvidia/cuda base image and provision GPU resources (A100/H100).
# WARNING: Running proprietary DiT models requires high VRAM GPUs and incurs significant cost.

FROM python:3.10-slim
LABEL maintainer="Real-Snatcher MLOps"

# Install system dependencies
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
	ffmpeg \
	&& rm -rf /var/lib/apt/lists/*

# Install Python dependencies
# Copy requirements from repository root into build context
COPY requirements.txt /tmp/requirements.txt
# Install Python dependencies from the copied requirements file
RUN pip install --no-cache-dir -r /tmp/requirements.txt

# Copy entire repository into /app so mlops can import api and other packages
WORKDIR /app
COPY . /app

# Ensure python can import top-level packages
ENV PYTHONPATH=/app

# Run the worker as a module to keep imports consistent
CMD ["python", "-m", "mlops.ml_worker"]
