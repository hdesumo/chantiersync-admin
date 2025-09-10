'use client';

import { useState } from 'react';
import { Button, FormControl, FormLabel, Input, VStack, Text, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '../../lib/api';
import AuthLayout from '../../components/AuthLayout';

export default function LoginPage() {
  const toast = useToast();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: 'Champs requis',
        description: 'Veuillez renseigner votre email et votre mot de passe',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      const response = await login({ email, password });

      // ✅ Stocke le token dans localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.token);
      }

      toast({
        title: 'Connexion réussie',
        description: `Bienvenue ${response.user?.email || ''}`,
        status: 'success',
        duration: 2500,
        isClosable: true,
      });

      // ✅ Redirection vers le tableau de bord après connexion
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error: any) {
      toast({
        title: 'Erreur de connexion',
        description: error.response?.data?.message || 'Identifiants invalides',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Connexion" subtitle="Accédez à votre espace administrateur">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Mot de passe</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
            />
          </FormControl>

          {/* ✅ Apostrophe échappée */}
          <Button type="submit" colorScheme="blue" w="full" isLoading={loading} loadingText="Connexion...">
            Se&nbsp;connecter
          </Button>
        </VStack>
      </form>

      <Text fontSize="sm" color="gray.500" textAlign="center" mt={4}>
        Pas de compte ?{' '}
        <Link href="/register" style={{ color: '#2563eb', textDecoration: 'underline' }}>
          Créez-en un ici
        </Link>
      </Text>
    </AuthLayout>
  );
}
