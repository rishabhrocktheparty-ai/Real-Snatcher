# jobs_router.py
# Asynchronous Job Handling Endpoints
# Implements job submission, status polling, and result retrieval.
# All endpoints are non-blocking and decouple user requests from ML compute.


from fastapi import APIRouter, BackgroundTasks, HTTPException
from api.schemas import JobPayload
import uuid
from api.crud import create_job, update_job_status, set_job_result, get_job
from loguru import logger

# Simulated message queue (in production, use Redis/SQS)
job_queue = []

router = APIRouter()

@router.post("/", status_code=202)
async def submit_job(request: JobPayload, background_tasks: BackgroundTasks):
    """
    Submit a new transformation job. Accepts flexible inputs: video_url, audio_url, face_image_url, text_overlay, etc.
    """
    try:
        job_id = str(uuid.uuid4())
        payload = request.dict()
        create_job(job_id, payload)
        job_queue.append(job_id)  # Simulate SQS/Redis push
        logger.info(f"Job submitted: {job_id} {payload}")
        return {"job_id": job_id, "status": "QUEUED"}
    except Exception as e:
        logger.error(f"Error submitting job: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit job")



@router.get("/{job_id}")
async def get_job_status(job_id: str):
    """
    Poll job status. Returns current status (QUEUED, PROCESSING, COMPLETE, FAILED).
    """
    try:
        job = get_job(job_id)
        if not job:
            logger.warning(f"Job not found: {job_id}")
            raise HTTPException(status_code=404, detail="Job not found")
        return {"job_id": job_id, "status": job["status"]}
    except Exception as e:
        logger.error(f"Error getting job status: {e}")
        raise HTTPException(status_code=500, detail="Failed to get job status")

@router.get("/{job_id}/result")
async def get_job_result(job_id: str):
    """
    Retrieve job result (MP4 download URL) if status is COMPLETE.
    """
    try:
        job = get_job(job_id)
        if not job:
            logger.warning(f"Job not found: {job_id}")
            raise HTTPException(status_code=404, detail="Job not found")
        if job["status"] != "COMPLETE":
            logger.info(f"Job not complete: {job_id} status={job['status']}")
            raise HTTPException(status_code=202, detail="Job not complete yet")
        return {"job_id": job_id, "result_url": job["result_url"]}
    except Exception as e:
        logger.error(f"Error getting job result: {e}")
        raise HTTPException(status_code=500, detail="Failed to get job result")
