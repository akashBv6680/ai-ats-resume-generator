from ..utils.text_processing import normalize_text
from ..utils.logging import logger


def classify_profession(text: str) -> str:
    """
    Phase 1: simple heuristic classifier.
    Later: replace with ML model via model_loader/inference_engine.
    """
    text_norm = normalize_text(text).lower()
    logger.info("Classifying profession from text_prefix={}", text_norm[:80])

    if any(k in text_norm for k in ["python", "machine learning", "pandas", "data"]):
        return "data-scientist"
    if any(k in text_norm for k in ["react", "frontend", "javascript", "node"]):
        return "software-engineer"
    if any(k in text_norm for k in ["marketing", "seo", "campaign"]):
        return "marketing"
    if any(k in text_norm for k in ["finance", "accounting", "ledger"]):
        return "finance"

    return "general"
