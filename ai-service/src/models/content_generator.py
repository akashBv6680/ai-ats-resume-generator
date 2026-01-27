from ..utils.logging import logger
from ..services.model_loader import model_registry


async def generate_resume_content(profession: str, seniority: str, sections: dict) -> dict:
    """
    Phase 1: simple deterministic stubs.
    Later: call local LLM via Ollama for more natural language while
    strictly controlling ATS safety and formatting.
    """
    logger.info("Generating content for profession={} seniority={}", profession, seniority)

    summary = sections.get("summary") or f"{profession.title()} professional with {seniority} experience."
    experience = sections.get("experience") or "Describe your recent roles, responsibilities, and measurable impact."
    education = sections.get("education") or "List your degrees, institutions, and graduation years."
    skills = sections.get("skills") or "List relevant skills separated by commas."

    # Example future extension: call local LLM for each section:
    # client, model = model_registry.get_content_model()
    # summary = await client.generate(model, prompt_for_summary)

    return {
        "summary": summary,
        "experience": experience,
        "education": education,
        "skills": skills,
    }
