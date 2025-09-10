import axios from 'axios';

// ✅ Création d'une instance Axios avec l'URL de base
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Intercepteur pour ajouter le token JWT automatiquement (si présent)
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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
  // Côté backend : si tu as une route /auth/logout
  try {
    await api.post('/auth/logout');
  } finally {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
}

// ---------------------------
// 📌 Healthcheck et Ping
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
// 📌 Exemple : protected resource
// ---------------------------

export async function getProfile() {
  const res = await api.get('/user/profile');
  return res.data;
}

export default api;
