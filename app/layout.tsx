// app/layout.tsx
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Mon App",
  description: "Application migrée vers Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-sans min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
        {/* HEADER / NAVBAR */}
        <header className="bg-white shadow-sm dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            {/* LOGO */}
            <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              MonLogo
            </Link>
            {/* NAV LINKS */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Accueil
              </Link>
              <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                À propos
              </Link>
              <Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Contact
              </Link>
            </nav>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-gray-100 dark:bg-gray-800 text-center py-4 text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Mon App. Tous droits réservés.
        </footer>
      </body>
    </html>
  );
}
