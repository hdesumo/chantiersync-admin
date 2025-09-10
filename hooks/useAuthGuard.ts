'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProfile } from '../lib/api';

export default function useAuthGuard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Déconnexion propre (token + redirection)
  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!token) {
      // Pas de token → redirection login immédiate
      router.push('/login');
      setLoading(false);
      return;
    }

    async function fetchUser() {
      try {
        const data = await getProfile();
        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('⚠️ Erreur récupération profil:', error);
        logout(); // Token invalide → supprime et redirige
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [router]);

  return {
    loading,
    user,
    isAuthenticated,
    logout,
  };
}
