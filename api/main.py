# main.py
# FastAPI API Gateway Definition
# This file defines the entrypoint for the backend API, including routing and middleware setup.
# All endpoints are strictly asynchronous to decouple user requests from heavy ML compute.
# Future: Add authentication, rate limiting, and monitoring middleware for production.


from fastapi import FastAPI
from api.jobs_router import router as jobs_router
from api.utils_router import router as utils_router
from api.config import Config
from api.logging_middleware import LoggingMiddleware
from api.exception_handler import global_exception_handler
from loguru import logger

app = FastAPI(title="Real-Snatcher API Gateway")

# Add logging middleware for every request/response
app.add_middleware(LoggingMiddleware)

# Register global exception handler
app.add_exception_handler(Exception, global_exception_handler)

# Register jobs router for job submission and status endpoints
app.include_router(jobs_router, prefix="/jobs", tags=["Jobs"])
app.include_router(utils_router, prefix="/utils", tags=["Utils"])

# Health check endpoint for monitoring
@app.get("/health", tags=["Health"])
async def health_check():
    """Simple health check endpoint."""
    try:
        return {"status": "ok"}
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise
