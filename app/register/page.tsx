'use client';

import { useState } from 'react';
import { Button, FormControl, FormLabel, Input, VStack, Text, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { register } from '../../lib/api';
import AuthLayout from '../../components/AuthLayout';

export default function RegisterPage() {
  const toast = useToast();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast({
        title: "Champs requis",
        description: "Tous les champs doivent être remplis",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      const response = await register({ name, email, password });

      toast({
        title: "Inscription réussie",
        description: `Bienvenue ${name}, vous pouvez maintenant vous connecter`,
        status: "success",
        duration: 2500,
        isClosable: true,
      });

      // Redirige vers la page de connexion après 2 secondes
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Erreur d'inscription",
        description: error.response?.data?.message || "Impossible de créer le compte",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Inscription" subtitle="Créez votre compte pour suivre vos chantiers">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Nom complet</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom"
            />
          </FormControl>

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

          <Button type="submit" colorScheme="blue" w="full" isLoading={loading} loadingText="Création...">
            S'inscrire
          </Button>
        </VStack>
      </form>

      <Text fontSize="sm" color="gray.500" textAlign="center" mt={4}>
        Déjà un compte ?{' '}
        <Link href="/login" style={{ color: '#2563eb', textDecoration: 'underline' }}>
          Connectez-vous ici
        </Link>
      </Text>
    </AuthLayout>
  );
}
