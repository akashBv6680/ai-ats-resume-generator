from loguru import logger

logger.add("logs/ai-service.log", rotation="10 MB", retention="7 days", enqueue=True)

__all__ = ["logger"]
