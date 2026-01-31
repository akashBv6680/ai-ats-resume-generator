# Deployment Guide

## Environments

- Local development
- Staging
- Production

All deployments use Docker images for:

- frontend
- backend
- ai-service
- mongo (managed or self-hosted)[file:1]

## Local (Docker Compose)

From repo root:

```bash
docker compose -f devops/docker/docker-compose.yml up --build
