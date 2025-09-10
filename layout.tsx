'use client';

import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import theme from './theme';
import './globals.css';

const { ToastContainer } = createStandaloneToast();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ChakraProvider theme={theme}>
          <ToastContainer />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
