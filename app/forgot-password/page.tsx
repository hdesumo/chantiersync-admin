'use client';

import { useState } from 'react';
import { sendResetLink } from '../../lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await sendResetLink({ email });
      if (response?.success) {
        setSuccess('Un lien de réinitialisation vous a été envoyé.');
      } else {
        setError(response?.message || 'Erreur. Réessayez.');
      }
    } catch (err) {
      setError('Erreur réseau.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
          Mot de passe oublié
        </h1>

        {success && (
          <div className="mb-4 text-sm text-green-600 bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

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
