# Dockerfile for FastAPI backend
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY api ./api
COPY mlops ./mlops
COPY models ./models
ENV PYTHONUNBUFFERED=1
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
