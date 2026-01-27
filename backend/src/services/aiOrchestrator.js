import fetch from "node-fetch";
import { ENV } from "../config/environment.js";

async function callAI(path, payload) {
  const response = await fetch(`${ENV.AI_SERVICE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`AI service error: ${response.status}`);
  }

  return response.json();
}

export async function classifyProfession(userInput) {
  return callAI("/classify-profession", { text: userInput });
}

export async function selectTemplate(context) {
  return callAI("/select-template", context);
}

export async function generateContent(context) {
  return callAI("/generate-content", context);
}

export async function optimizeKeywords(context) {
  return callAI("/optimize-keywords", context);
}

export async function scoreATS(context) {
  return callAI("/score-ats", context);
}
