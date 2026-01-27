from ..utils.text_processing import normalize_text
from ..utils.logging import logger


def compute_ats_score(profession: str, seniority: str, sections: dict) -> int:
    """
    Very simple deterministic ATS score simulation.
    Later: replace with ML model scoring.
    """
    logger.info("Computing ATS score for profession={} seniority={}", profession, seniority)

    text = " ".join(
        [
            sections.get("summary", ""),
            sections.get("experience", ""),
            sections.get("education", ""),
            sections.get("skills", ""),
        ]
    )
    norm = normalize_text(text)
    length = len(norm.split())

    # Basic scoring: length + simple keyword bonus
    base_score = min(60, max(10, length // 5))

    bonus = 0
    if profession.lower().startswith("data"):
        if any(k in norm.lower() for k in ["python", "sql", "machine learning"]):
            bonus += 15
    if profession.lower().startswith("software"):
        if any(k in norm.lower() for k in ["javascript", "react", "node"]):
            bonus += 15

    seniority_bonus = 5 if seniority.lower().startswith(("mid", "senior")) else 0

    score = base_score + bonus + seniority_bonus
    score = max(0, min(100, score))
    return int(score)
