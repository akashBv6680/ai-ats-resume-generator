from pydantic import BaseModel, Field
from typing import Dict


class Sections(BaseModel):
    summary: str = ""
    experience: str = ""
    education: str = ""
    skills: str = ""


class ResumeDraft(BaseModel):
    profession: str = Field(..., min_length=2)
    seniority: str = Field(..., min_length=2)
    sections: Sections


class ClassificationInput(BaseModel):
    text: str = Field(..., min_length=5)


class TemplateSelectionInput(BaseModel):
    profession: str
    seniority: str
    sections: Sections


class ContentGenerationInput(BaseModel):
    profession: str
    seniority: str
    sections: Sections
    template_key: str | None = None


class KeywordOptimizationInput(BaseModel):
    profession: str
    seniority: str
    sections: Sections


class ATSScoreInput(BaseModel):
    profession: str
    seniority: str
    sections: Sections
    # Optionally you could add "template_key" or keyword stats here
