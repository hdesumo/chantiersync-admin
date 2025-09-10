'use client';

import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';

export default function Home() {
  return (
    <Container maxW="container.lg" py={20}>
      <VStack spacing={6} align="center" textAlign="center">
        <Heading as="h1" size="2xl" color="brand.500">
          ChantierSync Partners
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="lg">
          Une plateforme dédiée à la diaspora pour suivre vos chantiers en temps réel,
          au-delà des simples photos et vidéos WhatsApp.
        </Text>
        <Button colorScheme="blue" size="lg" rounded="md" shadow="md">
          Se connecter →
        </Button>
      </VStack>
    </Container>
  );
}
