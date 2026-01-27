from typing import Dict, Any
import httpx
from ..utils.logging import logger


class OllamaClient:
    """
    Simple client for local Ollama server.
    No external AI APIs are used.
    """

    def __init__(self, base_url: str) -> None:
        self.base_url = base_url.rstrip("/")

    async def generate(self, model: str, prompt: str) -> str:
        url = f"{self.base_url}/api/generate"
        payload: Dict[str, Any] = {"model": model, "prompt": prompt, "stream": False}
        logger.info("Calling Ollama model={} prompt_prefix={}", model, prompt[:80])

        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(url, json=payload)
            resp.raise_for_status()
            data = resp.json()
            return data.get("response", "").strip()
