'use client';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-center py-20 space-y-6">
      <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
        Bienvenue sur ChantierSync Admin
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
        Gérez vos projets de construction efficacement, suivez vos rapports et centralisez toutes vos données sur une seule plateforme.
      </p>
      <div className="space-x-4">
        <a
          href="/dashboard"
          className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Accéder au Dashboard
        </a>
        <a
          href="/about"
          className="inline-block px-6 py-3 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 font-medium rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          En savoir plus
        </a>
      </div>
    </main>
  );
}
