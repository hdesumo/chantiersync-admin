'use client';

import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import './globals.css';
import Header from '../components/Header';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicPage = ['/login', '/register', '/forgot-password'].includes(pathname);

  return (
    <html lang="fr">
      <body>
        <ChakraProvider theme={theme}>
          {!isPublicPage && <Header />}
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
