import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.chantiersync.com/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

// ✅ On ajoute bien le préfixe /auth ici
export const login = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const getCurrentUser = () => api.get("/auth/me");

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authUser");
};
