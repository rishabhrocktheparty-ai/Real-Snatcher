"""
text_overlay.py
Apply a stylized neon text overlay (burn-in) to a video using ffmpeg-python.
Parameters: text_content, position, font_family, neon_color
"""
from ffmpeg import input as ff_input, filter as ff_filter, output as ff_output
from typing import Tuple

POSITION_MAP = {
    'bottom-center': ('center', 'h-40'),
    'top-center': ('center', '40'),
    'bottom-left': ('10', 'h-40'),
    'bottom-right': ('w-tw-10', 'h-40')
}

def apply_text_overlay(in_video: str, out_video: str, text_content: str, position: str = 'bottom-center', font_family: str = 'DejaVu-Sans', neon_color: str = '#00ffa3') -> str:
    """
    Apply a static neon-styled text overlay (burn-in). For dynamic moving subtitles, layer additional filters.
    This implementation uses simple drawtext filters; ensure the font is installed in the container.
    """
    # map position -> x,y; for demo use center/bottom offsets
    x = '(w-text_w)/2' if 'center' in position else '10'
    y = 'h-text_h-40' if 'bottom' in position else '40'
    draw = f"drawtext=text='{text_content}':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:fontcolor={neon_color}:fontsize=36:x={x}:y={y}:box=1:boxcolor=black@0.2"
    inp = ff_input(in_video)
    out = ff_output(inp.video.filter_('drawtext', text=f"{text_content}", fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', fontcolor=neon_color, fontsize=36, x=x, y=y, box=1, boxcolor='black@0.2'), out_video, vcodec='libx264', acodec='copy')
    out.run(overwrite_output=True)
    return out_video
