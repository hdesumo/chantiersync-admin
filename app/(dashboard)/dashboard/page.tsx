'use client';

import useAuthGuard from '../../../hooks/useAuthGuard';

export default function DashboardPage() {
  useAuthGuard(); // garde la logique d'authentification

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
        Tableau de bord
      </h1>

      {/* Exemple de cartes / sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Rapports récents</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Consultez les derniers rapports envoyés par vos équipes sur les chantiers.
          </p>
          <a
            href="/reports"
            className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Voir les rapports
          </a>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Statistiques</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Suivez en temps réel l’avancement de vos chantiers et la progression des livrables.
          </p>
          <a
            href="/stats"
            className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Voir les stats
          </a>
        </div>
      </div>
    </div>
  );
}
