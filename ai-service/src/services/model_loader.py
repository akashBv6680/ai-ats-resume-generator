from .inference_engine import OllamaClient
from ..config.settings import settings
from ..utils.logging import logger


class ModelRegistry:
    def __init__(self) -> None:
        self.ollama = OllamaClient(
            base_url=settings.OLLAMA_BASE_URL
        )
        logger.info("ModelRegistry initialized with Ollama base URL {}", settings.OLLAMA_BASE_URL)

    def get_profession_model(self):
        return self.ollama, settings.PROFESSION_MODEL

    def get_content_model(self):
        return self.ollama, settings.CONTENT_MODEL


model_registry = ModelRegistry()
