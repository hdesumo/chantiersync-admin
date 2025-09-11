'use client';

import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    // Exemple : récupérer le profil via l'API
    setUser({ email: 'utilisateur@example.com' });
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="animate-pulse text-gray-600 dark:text-gray-300">
          Chargement...
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
        Mon profil
      </h1>
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
        <p className="mb-4">
          <strong>Email :</strong> {user.email}
        </p>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Modifier le profil
        </button>
      </div>
    </div>
  );
}
