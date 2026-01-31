# Template Guidelines

Templates are **JSON-only**, with no UI logic. They define:

- profession
- specialization (optional)
- seniority
- sectionOrder
- keywords
- bulletConstraints
- active flag[file:1]

## File Locations

- `templates/software-engineer/*.json`
- `templates/data-scientist/*.json`
- `templates/marketing/*.json`
- `templates/finance/*.json`
- `templates/template-schema.json` (schema)[file:1]

## Required Fields

Example:

```json
{
  "profession": "software-engineer",
  "specialization": "fullstack",
  "seniority": "mid-level",
  "sectionOrder": ["summary", "experience", "projects", "skills", "education"],
  "keywords": ["react", "nodejs", "api", "docker", "ci-cd"],
  "bulletConstraints": {
    "summaryMaxLines": 5,
    "experienceMaxLines": 12,
    "educationMaxLines": 6,
    "skillsMaxLines": 10,
    "projectsMaxLines": 8
  },
  "active": true
}
