'use client';

import { ReactNode } from 'react';
import { Center, Spinner } from '@chakra-ui/react';
import useAuthGuard from '../hooks/useAuthGuard';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loading } = useAuthGuard();

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return <>{children}</>;
}
