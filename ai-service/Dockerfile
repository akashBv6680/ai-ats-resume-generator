FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src ./src
COPY src/config/model_config.yaml ./src/config/model_config.yaml

EXPOSE 5000

CMD ["python", "-m", "src.api.app"]
