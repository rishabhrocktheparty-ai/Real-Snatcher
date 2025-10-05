# crud.py
# Simulated Database/Persistence Layer
# In production, this would interface with a real database (e.g., PostgreSQL, DynamoDB).
# For local simulation, we use an in-memory dict to store job metadata and status.

from typing import Dict, Any
from threading import Lock

# Thread-safe in-memory job store
_job_store: Dict[str, Dict[str, Any]] = {}
_job_store_lock = Lock()

# Simulated job status values
JOB_STATUS = ["QUEUED", "PROCESSING", "COMPLETE", "FAILED"]

# Add a new job to the store
def create_job(job_id: str, payload: Dict[str, Any]):
    with _job_store_lock:
        _job_store[job_id] = {
            "payload": payload,
            "status": "QUEUED",
            "result_url": None
        }

# Update job status
def update_job_status(job_id: str, status: str):
    assert status in JOB_STATUS, f"Invalid status: {status}"
    with _job_store_lock:
        if job_id in _job_store:
            _job_store[job_id]["status"] = status

# Set job result URL
def set_job_result(job_id: str, result_url: str):
    with _job_store_lock:
        if job_id in _job_store:
            _job_store[job_id]["result_url"] = result_url

# Retrieve job info
def get_job(job_id: str) -> Dict[str, Any]:
    with _job_store_lock:
        return _job_store.get(job_id)
