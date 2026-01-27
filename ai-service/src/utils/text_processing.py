import re


def normalize_text(text: str) -> str:
    text = text or ""
    text = text.strip()
    text = re.sub(r"\s+", " ", text)
    return text


def tokenize(text: str) -> list[str]:
    text = normalize_text(text)
    if not text:
        return []
    return text.split(" ")
