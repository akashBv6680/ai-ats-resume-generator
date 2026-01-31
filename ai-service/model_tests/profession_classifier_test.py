import pytest
from src.models.profession_classifier import classify_profession

@pytest.mark.asyncio
async def test_classify_profession_minimum_length():
  result = await classify_profession(
      "I work on backend APIs using Node.js and databases."
  )
  assert "profession" in result
  assert result["profession"] in [
      "software-engineer",
      "data-scientist",
      "marketing",
      "finance",
      "other"
  ]
