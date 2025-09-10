'use client';

import { useState } from 'react';
import { Button, FormControl, FormLabel, Input, VStack, Text, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { forgotPassword } from '../../lib/api';
import AuthLayout from '../../components/AuthLayout';

export default function ForgotPasswordPage() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Email requis",
        description: "Veuillez entrer votre adresse email",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      const response = await forgotPassword({ email });

      toast({
        title: "Lien envoyé",
        description: response.data?.message || `Vérifiez votre boîte mail (${email}) pour réinitialiser votre mot de passe`,
        status: "info",
        duration: 4000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.response?.data?.message || "Impossible d'envoyer le lien",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Mot de passe oublié" subtitle="Entrez votre email pour recevoir un lien de réinitialisation">
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

          <Button type="submit" colorScheme="blue" w="full" isLoading={loading} loadingText="Envoi...">
            Envoyer le lien
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
