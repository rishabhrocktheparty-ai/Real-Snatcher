# Real-Snatcher Deployment Guide

## Local Setup (Docker Compose)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rishabhrocktheparty-ai/Real-Snatcher.git
   cd Real-Snatcher
   ```
2. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```
3. **Access the platform:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)
   - Redis: [localhost:6379](localhost:6379)

## Simulated Cloud Setup (S3/SQS)
- The platform simulates S3 storage and SQS queue using local folders and Redis.
- For real cloud deployment, update `.env` with AWS credentials and endpoints.
- Replace simulated S3/queue logic in `ml_worker.py` and backend with boto3 and AWS SDK calls.

## Real GPU Deployment Guidelines
- Set `USE_FAKE_GPU=False` in `.env` to enable real GPU usage.
- Ensure your cloud VM or server has Nvidia A100/H100 or equivalent GPU.
- Update Dockerfiles to use `nvidia/cuda` base images and enable GPU runtime.
- For production, use Kubernetes or cloud-native orchestration for scaling ML workers.

## Route Validation
- **/jobs**: Submit and poll job status
- **/jobs/{id}**: Get job status
- **/jobs/{id}/result**: Get job result (MP4 URL)
- **/upload**: Drag-and-drop video upload and transformation selector

## CI/CD & Testing
- All code is linted (`flake8`, `eslint`) and auto-formatted (`black`, `prettier`).
- Tests run automatically via GitHub Actions on every push/PR.
- Run tests locally:
  ```bash
  pytest
  ```

## Troubleshooting
- Ensure Docker is running and ports 3000/8000/6379 are free.
- For GPU simulation, set `USE_FAKE_GPU=True` in `.env`.
- For real GPU, install Nvidia drivers and CUDA toolkit.

## Contact & Support
- For issues, open a GitHub issue or contact the maintainer.
