"""
audio_swap.py
Replace or overlay the audio track of a video using ffmpeg-python.
This module expects ffmpeg to be available in the container (installed in mlops Dockerfile).
"""
from ffmpeg import input as ff_input, output as ff_output, concat
import os
from typing import Optional

def replace_audio(video_path: str, audio_path: str, out_path: str) -> str:
    """
    Replace the audio track of `video_path` with `audio_path` and write to `out_path`.
    Returns the path to the output file.
    """
    # ffmpeg-python wrapper usage: map video from original and audio from new file
    v = ff_input(video_path)
    a = ff_input(audio_path)
    ff_output(v.video, a.audio, out_path, vcodec='copy', acodec='aac', strict='experimental').run(overwrite_output=True)
    return out_path
