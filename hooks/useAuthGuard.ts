'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '../lib/api';

export default function useAuthGuard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    if (!token) {
      router.push('/login');
      return;
    }

    getCurrentUser()
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        router.push('/login');
      })
      .finally(() => setLoading(false));
  }, [router]);

  return { loading, user };
}
