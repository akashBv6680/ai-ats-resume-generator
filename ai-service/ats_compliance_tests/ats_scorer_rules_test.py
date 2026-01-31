from src.models.ats_scorer import score_ats

def test_ats_scorer_penalizes_missing_sections():
  sections = {
      "summary": "",
      "experience": "",
      "education": "",
      "skills": ""
  }
  result = score_ats("software-engineer", "junior", sections)
  assert result["score"] < 50
  assert any("Missing required section" in issue for issue in result["issues"])
