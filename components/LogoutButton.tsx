'use client';

import { Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { logout } from '../lib/api';

export default function LogoutButton() {
  const toast = useToast();
  const router = useRouter();

  const handleLogout = () => {
    logout();

    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté.",
      status: "info",
      duration: 2500,
      isClosable: true,
    });

    router.push('/login');
  };

  return (
    <Button colorScheme="red" size="sm" onClick={handleLogout}>
      Déconnexion
    </Button>
  );
}
