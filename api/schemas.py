from pydantic import BaseModel, HttpUrl, Field
from typing import Optional


class JobPayload(BaseModel):
    video_url: Optional[HttpUrl] = Field(None, description="Direct URL to source video or S3 presigned URL")
    file_name: Optional[str] = Field(None, description="Uploaded filename placeholder used by client simulation")
    task_type: str = Field(..., description="Transformation type")
    face_image_url: Optional[HttpUrl] = Field(None, description="Optional face target image URL")
    audio_url: Optional[HttpUrl] = Field(None, description="Optional audio file URL for audio swap")
    target_action_prompt: Optional[str] = Field(None, description="Prompt for action swap model")
    text_overlay: Optional[dict] = Field(None, description="Text overlay params: {text_content, position, font_family, neon_color}")
