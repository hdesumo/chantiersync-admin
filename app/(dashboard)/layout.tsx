"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Moon, Sun, LogOut, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Vérification du token côté client
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/connexion");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("auth_token");
        router.push("/connexion");
      });
  }, [router]);

  // Gérer le thème
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    router.push("/connexion");
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/chantiers", label: "Chantiers" },
    { href: "/rapports", label: "Rapports" },
    { href: "/equipes", label: "Équipes" },
    { href: "/parametres", label: "Paramètres" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-6 text-2xl font-bold text-primary">ChantierSync</div>
        <nav className="flex-1 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-6 py-2 rounded-lg transition-colors ${
                pathname === link.href
                  ? "bg-primary text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-6 space-y-2">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            {theme === "dark" ? "Mode clair" : "Mode sombre"}
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200"
          >
            <LogOut size={18} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* SIDEBAR MOBILE (Drawer) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed inset-0 bg-black/40 z-50 flex"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="bg-white dark:bg-gray-800 w-64 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 text-2xl font-bold text-primary">ChantierSync</div>
              <nav className="flex-1 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-6 py-2 rounded-lg ${
                      pathname === link.href
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="p-6">
                <button
                  onClick={logout}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                >
                  <LogOut size={18} /> Déconnexion
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENU */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} className="text-gray-700 dark:text-gray-200" />
          </button>
          <div className="font-bold text-lg">{user ? user.name : "Chargement..."}</div>
          <button onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
