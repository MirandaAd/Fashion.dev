import api from "../lib/api";

export async function login(payload) {
  // payload: { email, password }
  const { data } = await api.post("/auth/login", payload);
  // espera { token, user } o { accessToken, user }
  const token = data.token || data.accessToken;
  if (token) localStorage.setItem("token", token);
  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

export async function registerUser(payload) {
  // payload: { name, email, password }
  const { data } = await api.post("/auth/register", payload);
  return data;
}

export async function getProfile() {
  const { data } = await api.get("/auth/me"); // o "/users/me" según tu backend
  // actualiza caché local por conveniencia
  localStorage.setItem("user", JSON.stringify(data));
  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}