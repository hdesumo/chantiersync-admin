'use client';

import { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';
import Header from '../../components/Header';
import useAuthGuard from '../../hooks/useAuthGuard';
import { Spinner, Flex } from '@chakra-ui/react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { loading, isAuthenticated } = useAuthGuard();

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!isAuthenticated) return null; // redirection automatique gérée par le hook

  return (
    <Box minH="100vh" bg="gray.50">
      {/* ✅ Header global */}
      <Header />

      {/* ✅ Conteneur principal */}
      <Container maxW="6xl" py={6}>
        <main>{children}</main>
      </Container>
    </Box>
  );
}
