'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { resetPassword } from '../../lib/api';
import AuthLayout from '../../components/AuthLayout';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const token = searchParams.get('token'); // récupère le token depuis l'URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast({
        title: 'Champs requis',
        description: 'Veuillez remplir les deux champs.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!token) {
      toast({
        title: 'Lien invalide',
        description: 'Le lien de réinitialisation est manquant ou incorrect.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      await resetPassword({ token, newPassword: password });

      toast({
        title: 'Mot de passe réinitialisé',
        description: 'Vous allez être redirigé vers la page de confirmation.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      setTimeout(() => {
        router.push('/reset-password/success');
      }, 2000);
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.response?.data?.message || 'Impossible de réinitialiser le mot de passe.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Réinitialiser le mot de passe"
      subtitle="Entrez un nouveau mot de passe pour accéder à votre compte."
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Nouveau mot de passe</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre nouveau mot de passe"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Confirmer le mot de passe</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmez le mot de passe"
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" w="full" isLoading={loading} loadingText="Réinitialisation...">
            Réinitialiser le mot de passe
          </Button>
        </VStack>
      </form>

      <Text fontSize="sm" color="gray.500" textAlign="center" mt={4}>
        <Link href="/login" style={{ color: '#2563eb', textDecoration: 'underline' }}>
          Retour à la connexion
        </Link>
      </Text>
    </AuthLayout>
  );
}
