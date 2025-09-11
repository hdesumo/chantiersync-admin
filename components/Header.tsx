'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useAuthGuard from '../hooks/useAuthGuard';
import { useState } from 'react';

export default function Header() {
  useAuthGuard();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo / Titre */}
        <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
          ChantierSync Admin
        </h1>

        {/* Menu utilisateur */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <Image
              src="/avatar.png"
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full border-2 border-indigo-500"
            />
            <span className="hidden md:inline text-gray-700 dark:text-gray-300">Mon compte</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10">
              <button
                onClick={() => router.push('/profile')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
              >
                Profil
              </button>
              <button
                onClick={() => router.push('/settings')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
              >
                Paramètres
              </button>
              <button
                onClick={() => router.push('/logout')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
