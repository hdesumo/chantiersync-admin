'use client';

import { VStack, Heading, Text, Button, Box } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import AuthLayout from '../../../components/AuthLayout';

export default function ResetPasswordSuccessPage() {
  const router = useRouter();

  return (
    <AuthLayout
      title="Mot de passe réinitialisé"
      subtitle="Votre mot de passe a été mis à jour avec succès."
    >
      <VStack spacing={6}>
        <Box textAlign="center">
          <Text fontSize="md" color="green.600">
            Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
          </Text>
        </Box>

        <Button
          colorScheme="blue"
          w="full"
          onClick={() => router.push('/login')}
        >
          Aller à la connexion
        </Button>
      </VStack>
    </AuthLayout>
  );
}
