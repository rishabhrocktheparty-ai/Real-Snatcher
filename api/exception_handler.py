# exception_handler.py
# Global exception handler for FastAPI

from fastapi import Request
from fastapi.responses import JSONResponse
from loguru import logger

async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "error": str(exc)}
    )
