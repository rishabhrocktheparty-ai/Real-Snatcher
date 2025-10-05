# test_jobs.py
# Pytest tests for FastAPI job endpoints and simulated S3 result

import pytest
from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)

@pytest.fixture(scope="module")
def job_payload():
    return {
        "video_url": "https://s3.simulated/real-snatcher/test.mp4",
        "task_type": "face_swap",
        "face_image_url": "https://s3.simulated/real-snatcher/face.jpg"
    }

def test_submit_job(job_payload):
    response = client.post("/jobs/", json=job_payload)
    assert response.status_code == 202
    data = response.json()
    assert "job_id" in data
    assert data["status"] == "QUEUED"
    return data["job_id"]

def test_job_status(job_payload):
    job_id = test_submit_job(job_payload)
    response = client.get(f"/jobs/{job_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] in ["QUEUED", "PROCESSING", "COMPLETE", "FAILED"]

def test_job_result(job_payload):
    job_id = test_submit_job(job_payload)
    # Simulate job completion
    from api.crud import update_job_status, set_job_result
    update_job_status(job_id, "COMPLETE")
    set_job_result(job_id, f"https://s3.simulated/real-snatcher/results/{job_id}.mp4")
    response = client.get(f"/jobs/{job_id}/result")
    assert response.status_code == 200
    data = response.json()
    assert "result_url" in data
