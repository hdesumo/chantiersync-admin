'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VStack, Input, Button, useToast, Heading } from '@chakra-ui/react';
import { login } from '../../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login({ email, password });

      // Vérifie la structure de la réponse API
      if (!res.data?.token) {
        throw new Error('Réponse API invalide');
      }

      // Stocke le token et les infos utilisateur
      localStorage.setItem('authToken', res.data.token);
      localStorage.setItem('authUser', JSON.stringify(res.data.user));

      toast({
        title: 'Connexion réussie',
        description: `Bienvenue, ${res.data.user?.name || 'Utilisateur'}`,
        status: 'success',
        duration: 2500,
        isClosable: true,
      });

      router.push('/dashboard');
    } catch (err: any) {
      toast({
        title: 'Erreur de connexion',
        description: err.response?.data?.message || 'Identifiants invalides',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit}
      spacing={4}
      p={6}
      maxW="sm"
      mx="auto"
      mt={20}
      bg="white"
      rounded="lg"
      shadow="md"
    >
      <Heading size="md" color="brand.500">
        Connexion
      </Heading>
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        placeholder="Mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button
        type="submit"
        colorScheme="blue"
        w="full"
        isLoading={loading}
      >
        Se connecter
      </Button>
    </VStack>
  );
}
