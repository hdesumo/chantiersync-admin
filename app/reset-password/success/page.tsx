'use client';

import Link from 'next/link';

export default function ResetPasswordSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
          Réinitialisation réussie
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.
        </p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
}
