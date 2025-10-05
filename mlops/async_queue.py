# async_queue.py
# Async job queue using Redis or asyncio.Queue fallback
# Handles job enqueue, dequeue, retries, and dead-letter logic

import os
import asyncio
try:
    import redis.asyncio as redis
except ImportError:
    redis = None

class AsyncJobQueue:
    def __init__(self, redis_url=None):
        self.redis_url = redis_url or os.getenv("REDIS_URL", "redis://localhost:6379/0")
        self.use_redis = redis is not None
        if self.use_redis:
            self.client = redis.from_url(self.redis_url)
        else:
            self.queue = asyncio.Queue()
        self.dead_letter = []

    async def enqueue(self, job_id):
        if self.use_redis:
            await self.client.rpush("job_queue", job_id)
        else:
            await self.queue.put(job_id)

    async def dequeue(self):
        if self.use_redis:
            job_id = await self.client.lpop("job_queue")
            return job_id.decode() if job_id else None
        else:
            if self.queue.empty():
                return None
            return await self.queue.get()

    async def add_to_dead_letter(self, job_id):
        self.dead_letter.append(job_id)

    async def get_dead_letter(self):
        return self.dead_letter
