// app/layout.tsx
"use client";

import { ReactNode } from "react";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import theme from "./theme"; // ✅ Import relatif, sûr à 100%
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
