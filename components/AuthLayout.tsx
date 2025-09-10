'use client';

import { Box, Heading, Text } from '@chakra-ui/react';

export default function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      px={4}
    >
      <Box w="full" maxW="sm" bg="white" p={6} rounded="lg" shadow="md">
        <Heading as="h1" size="lg" textAlign="center" color="brand.500" mb={2}>
          {title}
        </Heading>
        {subtitle && (
          <Text fontSize="sm" textAlign="center" color="gray.600" mb={4}>
            {subtitle}
          </Text>
        )}
        {children}
      </Box>
    </Box>
  );
}
