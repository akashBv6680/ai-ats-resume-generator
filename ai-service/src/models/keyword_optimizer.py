from ..utils.text_processing import tokenize
from ..utils.logging import logger


def optimize_keywords(profession: str, current_sections: dict) -> dict:
    """
    Basic keyword coverage estimator. Later can be upgraded to use a model.
    """
    logger.info("Optimizing keywords for profession={}", profession)

    base_keywords = {
        "data-scientist": ["python", "pandas", "numpy", "machine learning", "sql"],
        "software-engineer": ["javascript", "react", "node.js", "api", "testing"],
        "marketing": ["campaign", "seo", "analytics", "brand"],
        "finance": ["ledger", "reconciliation", "forecasting", "excel"],
    }

    profession_key = profession.lower()
    target_keywords = base_keywords.get(profession_key, [])

    combined_text = " ".join(
        [
            current_sections.get("summary", ""),
            current_sections.get("experience", ""),
            current_sections.get("education", ""),
            current_sections.get("skills", ""),
        ]
    ).lower()

    tokens = set(tokenize(combined_text))

    missing = [kw for kw in target_keywords if kw not in combined_text]
    present = [kw for kw in target_keywords if kw in combined_text]

    suggestion = current_sections.get("skills", "")
    if missing:
        extra = ", ".join(missing)
        if suggestion:
            suggestion = suggestion.rstrip(", ") + ", " + extra
        else:
            suggestion = extra

    return {
        "present_keywords": present,
        "missing_keywords": missing,
        "suggested_skills": suggestion,
    }
