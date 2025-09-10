'use client';

import { VStack, Heading, Text, Box, Spinner, Flex, Button } from '@chakra-ui/react';
import useAuthGuard from '../../hooks/useAuthGuard';

export default function DashboardPage() {
  const { loading, user, isAuthenticated, logout } = useAuthGuard();

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!isAuthenticated) {
    // Si non connecté, on ne rend rien (redirection automatique dans le hook)
    return null;
  }

  return (
    <Box minH="100vh" bg="gray.50" p={6}>
      <VStack spacing={6} align="stretch" maxW="lg" mx="auto">
        <Heading size="lg" color="brand.500">
          Tableau de bord
        </Heading>

        <Text fontSize="lg">
          Bienvenue {user?.email || ''} dans votre espace sécurisé !
        </Text>

        <Text fontSize="sm" color="gray.500">
          Ici s’afficheront vos rapports, photos et vidéos de chantier.
        </Text>

        {/* ✅ Bouton de déconnexion */}
        <Button colorScheme="red" onClick={logout}>
          Déconnexion
        </Button>
      </VStack>
    </Box>
  );
}
