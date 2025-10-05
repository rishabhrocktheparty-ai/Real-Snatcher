# config.py
# Environment-based configuration loader for Real-Snatcher
# Reads settings from .env file for backend services

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    S3_SIM_PATH = os.getenv("S3_SIM_PATH", "/tmp/results")
    USE_FAKE_GPU = os.getenv("USE_FAKE_GPU", "True") == "True"
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
    API_HOST = os.getenv("API_HOST", "0.0.0.0")
    API_PORT = int(os.getenv("API_PORT", "8000"))
