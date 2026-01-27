from pydantic import BaseSettings


class Settings(BaseSettings):
    ENV: str = "development"
    HOST: str = "0.0.0.0"
    PORT: int = 5000

    # For future: local LLM endpoints, model names, etc.
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    PROFESSION_MODEL: str = "mistral"
    CONTENT_MODEL: str = "mistral"

    class Config:
        env_prefix = "AI_SERVICE_"
        env_file = ".env"


settings = Settings()
