import axios from 'axios';

// ✅ Instance Axios avec URL de base dynamique
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Ajout automatique du token si présent
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ---------------------------
// 📌 Authentification
// ---------------------------

export async function login(credentials: { email: string; password: string }) {
  const res = await api.post('/auth/login', credentials);
  return res.data;
}

export async function loginWithPin(credentials: { full_mobile: string; pin: string }) {
  const res = await api.post('/auth/login', credentials);
  return res.data;
}

export async function register(data: { email: string; password: string }) {
  const res = await api.post('/auth/register', data);
  return res.data;
}

export async function logout() {
  try {
    await api.post('/auth/logout'); // optionnel si backend gère /auth/logout
  } finally {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
}

// ---------------------------
// 📌 Mot de passe oublié / réinitialisation
// ---------------------------

export async function forgotPassword(data: { email: string }) {
  const res = await api.post('/auth/forgot-password', data);
  return res.data;
}

export async function resetPassword(data: { token: string; newPassword: string }) {
  const res = await api.post('/auth/reset-password', data);
  return res.data;
}

// ---------------------------
// 📌 Healthcheck & Ping
// ---------------------------

export async function healthz() {
  const res = await api.get('/healthz');
  return res.data;
}

export async function ping() {
  const res = await api.get('/ping');
  return res.data;
}

// ---------------------------
// 📌 Récupération profil
// ---------------------------

export async function getProfile() {
  const res = await api.get('/user/profile');
  return res.data;
}

export default api;
