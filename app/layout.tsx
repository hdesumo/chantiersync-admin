// app/layout.tsx
"use client";

import { ReactNode } from "react";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import theme from "@/app/theme"; // ✅ Import absolu pour éviter les erreurs de chemin
import "./globals.css";

const { ToastContainer } = createStandaloneToast();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>
          {children}
          <ToastContainer />
        </ChakraProvider>
      </body>
    </html>
  );
}
