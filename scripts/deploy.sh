#!/usr/bin/env bash
set -euo pipefail

# Simple deployment helper; adapt to your infra.

REGISTRY="${DOCKER_REGISTRY:-your-registry}"
TAG="${1:-latest}"

echo "[deploy] Building images with tag: $TAG"

cd "$(dirname "$0")/.."

docker build -f devops/docker/frontend.Dockerfile -t "$REGISTRY/ats-frontend:$TAG" .
docker build -f devops/docker/backend.Dockerfile -t "$REGISTRY/ats-backend:$TAG" .
docker build -f devops/docker/ai-service.Dockerfile -t "$REGISTRY/ats-ai-service:$TAG" .

echo "[deploy] Pushing images to $REGISTRY"
docker push "$REGISTRY/ats-frontend:$TAG"
docker push "$REGISTRY/ats-backend:$TAG"
docker push "$REGISTRY/ats-ai-service:$TAG"

echo "[deploy] Applying Kubernetes manifests (if kubectl configured)..."
if command -v kubectl >/dev/null 2>&1; then
  kubectl apply -f devops/kubernetes/frontend-deployment.yaml
  kubectl apply -f devops/kubernetes/backend-deployment.yaml
  kubectl apply -f devops/kubernetes/ai-service-deployment.yaml
else
  echo "[deploy] kubectl not found, skipping k8s apply."
fi

echo "[deploy] Deployment script finished."
