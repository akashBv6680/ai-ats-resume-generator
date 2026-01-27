from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import router as api_router
from ..config.settings import settings

app = FastAPI(
    title="AI ATS Resume Generator - AI Service",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="")

@app.get("/health")
async def health():
    return {"status": "ok"}


def run():
    import uvicorn
    uvicorn.run(
        "src.api.app:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.ENV == "development",
    )


if __name__ == "__main__":
    run()
