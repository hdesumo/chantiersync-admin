'use client';

import { Button, useToast } from '@chakra-ui/react';
import useAuthGuard from '../hooks/useAuthGuard';

export default function LogoutButton() {
  const toast = useToast();
  const { logout } = useAuthGuard();

  const handleLogout = () => {
    logout(); // ✅ utilise le hook, supprime le token et redirige

    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté.",
      status: "info",
      duration: 2500,
      isClosable: true,
    });
  };

  return (
    <Button colorScheme="red" size="sm" onClick={handleLogout}>
      Déconnexion
    </Button>
  );
}
