import api from "./api";

export async function login(email, password) {
  const data = await api.post("/auth/login", { email, password });
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
}

export async function register(payload) {
  return api.post("/auth/register", payload);
}

export function logout() {
  localStorage.removeItem("token");
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem("token"));
}
