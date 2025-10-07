"""
api package marker
Allows importing `api` from other packages (e.g. mlops worker) when running inside containers.
"""

__all__ = ["crud", "config"]
