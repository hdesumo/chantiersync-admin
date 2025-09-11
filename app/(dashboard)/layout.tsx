// app/(dashboard)/layout.tsx
"use client";

import { ReactNode } from "react";
import Header from "../../components/Header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ Header visible sur toutes les pages du dashboard */}
      <Header />

      {/* ✅ Contenu de la page */}
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
