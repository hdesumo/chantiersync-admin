'use client';

import { VStack, Heading, Text, Box, Spinner, Flex, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getProfile } from '../../../lib/api';
import useAuthGuard from '../../../hooks/useAuthGuard';

export default function ProfilePage() {
  const { loading, isAuthenticated, logout } = useAuthGuard();
  const [profile, setProfile] = useState<any>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Erreur chargement profil:', error);
      } finally {
        setFetching(false);
      }
    }

    fetchUser();
  }, []);

  if (loading || fetching) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <Box minH="100vh" bg="gray.50" p={6}>
      <VStack spacing={6} align="stretch" maxW="lg" mx="auto">
        <Heading size="lg" color="brand.500">
          Mon profil
        </Heading>

        {profile ? (
          <>
            <Text>Email : {profile.email}</Text>
            <Text>ID utilisateur : {profile.id}</Text>
          </>
        ) : (
          <Text color="gray.500">Impossible de charger les informations du profil.</Text>
        )}

        <Button colorScheme="red" onClick={logout}>
          Déconnexion
        </Button>
      </VStack>
    </Box>
  );
}
