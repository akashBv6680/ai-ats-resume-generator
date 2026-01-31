#!/usr/bin/env bash
set -euo pipefail

echo "[setup] Installing frontend dependencies..."
cd "$(dirname "$0")/.."

if [ -d "frontend" ]; then
  cd frontend
  npm install
  cd ..
fi

echo "[setup] Installing backend dependencies..."
if [ -d "backend" ]; then
  cd backend
  npm install
  cd ..
fi

echo "[setup] Creating local .env files if missing..."
if [ ! -f "./backend/.env" ]; then
  cat > ./backend/.env <<EOF
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://localhost:27017/ai_ats_resume
JWT_SECRET=change-this-secret
AI_SERVICE_URL=http://localhost:5000
EOF
  echo "[setup] Created backend/.env"
fi

if [ ! -f "./ai-service/.env" ]; then
  cat > ./ai-service/.env <<EOF
AI_SERVICE_HOST=0.0.0.0
AI_SERVICE_PORT=5000
AI_SERVICE_OLLAMA_BASE_URL=http://localhost:11434
EOF
  echo "[setup] Created ai-service/.env"
fi

echo "[setup] Setup complete."
