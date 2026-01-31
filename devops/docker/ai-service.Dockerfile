FROM python:3.11-slim

WORKDIR /app
COPY ../../ai-service/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ../../ai-service/src ./src
ENV PYTHONUNBUFFERED=1
EXPOSE 5000
CMD ["uvicorn", "src.api.app:app", "--host", "0.0.0.0", "--port", "5000"]
