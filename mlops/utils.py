"""
mlops/utils.py
Utilities for media acquisition and helper functions used by the mlops worker and api endpoints.
NOTE: Scraping social media content may violate terms of service and require authentication or third-party services.
This module includes a simple demonstration using pytube/requests; for production use a licensed scraping service or official APIs.
"""
from typing import Optional
import re
import requests
from urllib.parse import urlparse

def extract_youtube_mp4(url: str) -> Optional[str]:
    # Simple helper using pytube could be placed here. We avoid importing pytube at runtime in this demo.
    return None

def fetch_direct_video_url(social_url: str) -> Optional[str]:
    """
    Attempt to extract a direct MP4 URL from a social media post URL.
    This is a best-effort demo: in production use official APIs (Graph API, oEmbed, or licensed scrapers).
    """
    parsed = urlparse(social_url)
    hostname = parsed.netloc.lower()
    # Very shallow heuristics for demonstration only
    if 'youtube.com' in hostname or 'youtu.be' in hostname:
        # In production, use pytube to retrieve stream URL
        return None
    if 'instagram.com' in hostname or 'facebook.com' in hostname:
        # Public scraping requires care: this is a placeholder.
        # You may need authenticated API access or a third-party extractor for scale.
        try:
            resp = requests.get(social_url, timeout=6, headers={'User-Agent': 'Real-Snatcher/1.0'})
            text = resp.text
            # Very naive: look for .mp4 in HTML
            m = re.search(r'(https?:\\/\\/[^\'"\s]+\\.mp4)', text)
            if m:
                return m.group(1).replace('\\/', '/')
        except Exception:
            return None
    return None
