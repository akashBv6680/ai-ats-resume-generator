from fastapi import APIRouter
from ..utils.validation import (
    ClassificationInput,
    TemplateSelectionInput,
    ContentGenerationInput,
    KeywordOptimizationInput,
    ATSScoreInput,
)
from ..models.profession_classifier import classify_profession
from ..models.template_selector import select_template
from ..models.content_generator import generate_resume_content
from ..models.keyword_optimizer import optimize_keywords
from ..models.ats_scorer import compute_ats_score

router = APIRouter()


@router.post("/classify-profession")
async def classify_profession_route(payload: ClassificationInput):
    profession_code = classify_profession(payload.text)
    return {"profession": profession_code}


@router.post("/select-template")
async def select_template_route(payload: TemplateSelectionInput):
    template_key = select_template(payload.profession, payload.seniority)
    return {"template_key": template_key}


@router.post("/generate-content")
async def generate_content_route(payload: ContentGenerationInput):
    sections_dict = payload.sections.model_dump()
    generated = await generate_resume_content(
        payload.profession,
        payload.seniority,
        sections_dict,
    )
    return {"sections": generated}


@router.post("/optimize-keywords")
async def optimize_keywords_route(payload: KeywordOptimizationInput):
    sections_dict = payload.sections.model_dump()
    result = optimize_keywords(payload.profession, sections_dict)
    return result


@router.post("/score-ats")
async def score_ats_route(payload: ATSScoreInput):
    sections_dict = payload.sections.model_dump()
    score = compute_ats_score(payload.profession, payload.seniority, sections_dict)
    return {"score": score}
