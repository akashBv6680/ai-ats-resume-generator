from ..utils.logging import logger


def select_template(profession: str, seniority: str) -> str:
  """
  Return a template key, e.g., 'software-engineer.junior'.
  In a real system, you might read from JSON templates or DB.
  """
  profession_key = profession.lower().replace(" ", "-")
  seniority_key = seniority.lower().replace(" ", "-")
  template_key = f"{profession_key}.{seniority_key}"
  logger.info("Selected template_key={} for profession={} seniority={}",
              template_key, profession, seniority)
  return template_key
