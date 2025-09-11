'use client';

import { useState } from 'react';
import { sendResetLink } from '../../lib/api';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await sendResetLink({ email });
      if (response?.success) {
        setMessage('Un email de réinitialisation a été envoyé.');
      } else {
        setError('Impossible d’envoyer l’email.');
      }
    } catch {
      setError('Erreur réseau. Réessayez.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
          Réinitialiser le mot de passe
        </h1>

        {message && <p className="mb-4 text-green-600">{message}</p>}
        {error && <p className="mb-4 text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            required
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            Envoyer le lien
          </button>
        </form>
      </div>
    </div>
  );
}
