import api from "./api";

export function createResume(payload) {
  return api.post("/resumes", payload);
}

export function getResume(id) {
  return api.get(`/resumes/${id}`);
}

export function listResumes() {
  return api.get("/resumes");
}

export function getLiveATSScore(draft) {
  return api.post("/resumes/ats-score", draft);
}
