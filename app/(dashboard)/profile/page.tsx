'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Avatar,
  Spinner,
  Center,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { getCurrentUser, api } from '../../lib/api';

export default function ProfilePage() {
  const toast = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setUser(res.data);
        setName(res.data.name || '');
        setPhone(res.data.phone || '');
      })
      .catch(() => {
        toast({
          title: 'Erreur',
          description: 'Impossible de charger le profil',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => setLoading(false));
  }, [toast]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      if (avatarFile) formData.append('avatar', avatarFile);

      const response = await api.put('/users/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUser(response.data);
      toast({
        title: 'Profil mis à jour',
        description: 'Vos informations ont été sauvegardées',
        status: 'success',
        duration: 2500,
        isClosable: true,
      });

      // Mettre à jour le localStorage pour refléter le changement global
      localStorage.setItem('authUser', JSON.stringify(response.data));
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.response?.data?.message || "Impossible de mettre à jour le profil",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <Center minH="100vh">
          <Spinner size="xl" color="blue.500" />
        </Center>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Box minH="100vh" bg="gray.50" p={6}>
        <VStack spacing={6} align="center" maxW="lg" mx="auto" bg="white" p={6} rounded="lg" shadow="md">
          <Avatar
            size="xl"
            name={name || 'Utilisateur'}
            src={user?.avatar || undefined}
            mb={2}
          />
          <FormControl>
            <FormLabel>Télécharger une photo</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Nom complet</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Téléphone</FormLabel>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </FormControl>

          <Button
            colorScheme="blue"
            w="full"
            onClick={handleSave}
            isLoading={saving}
            loadingText="Enregistrement..."
          >
            Enregistrer les modifications
          </Button>

          <Text fontSize="sm" color="gray.500">
            Membre depuis le {new Date(user?.createdAt).toLocaleDateString('fr-FR')}
          </Text>
        </VStack>
      </Box>
    </ProtectedRoute>
  );
}
