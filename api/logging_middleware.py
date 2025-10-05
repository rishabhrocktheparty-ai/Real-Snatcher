# logging_middleware.py
# Middleware for logging every request and response in FastAPI

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from loguru import logger
import time

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        logger.info(f"Request: {request.method} {request.url}")
        response = await call_next(request)
        process_time = (time.time() - start_time) * 1000
        logger.info(f"Response: {response.status_code} ({process_time:.2f}ms)")
        return response
