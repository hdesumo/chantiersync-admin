import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

// 🔐 Authentification
export async function login(credentials: { email: string; password: string }) {
  const response = await api.post("/login", credentials);
  return response.data;
}

export async function register(data: { email: string; password: string }) {
  const response = await api.post("/register", data);
  return response.data;
}

export async function logout() {
  try {
    await api.post("/logout");
    localStorage.removeItem("token");
    return { success: true };
  } catch (error: any) {
    console.error("Erreur logout:", error.response?.data || error.message);
    return { success: false };
  }
}

// 🔑 Réinitialisation de mot de passe
export async function sendResetLink(data: { email: string }) {
  try {
    const response = await api.post("/auth/forgot-password", data);
    return response.data;
  } catch (error: any) {
    console.error("Erreur sendResetLink:", error.response?.data || error.message);
    return { success: false, message: "Erreur lors de l'envoi du lien." };
  }
}

// 👤 Profil utilisateur
export async function getProfile() {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (error: any) {
    console.error("Erreur getProfile:", error.response?.data || error.message);
    return null;
  }
}

export default api;
