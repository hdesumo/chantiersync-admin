'use client';

import ProtectedRoute from '../../components/ProtectedRoute';
import { VStack, Heading, Text, Box } from '@chakra-ui/react';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Box minH="100vh" bg="gray.50" p={6}>
        <VStack spacing={6} align="stretch" maxW="lg" mx="auto">
          <Heading size="lg" color="brand.500">
            Tableau de bord
          </Heading>
          <Text fontSize="lg">
            Bienvenue dans votre espace sécurisé !
          </Text>
          <Text fontSize="sm" color="gray.500">
            Ici s’afficheront vos rapports, photos et vidéos de chantier.
          </Text>
        </VStack>
      </Box>
    </ProtectedRoute>
  );
}
