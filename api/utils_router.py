from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, HttpUrl
from mlops.utils import fetch_direct_video_url
from loguru import logger

router = APIRouter()

class FetchRequest(BaseModel):
    source_url: HttpUrl


@router.post('/fetch_video_url')
async def fetch_video_url(req: FetchRequest):
    """
    Attempt to fetch a direct MP4 URL from a social media post URL.
    Note: scraping social platforms can require auth and may violate TOS; use official APIs for production.
    """
    try:
        url = fetch_direct_video_url(str(req.source_url))
        if not url:
            raise HTTPException(status_code=404, detail='Direct video URL could not be extracted')
        return {'direct_url': url}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"fetch_video_url error: {e}")
        raise HTTPException(status_code=500, detail='Failed to fetch video URL')
