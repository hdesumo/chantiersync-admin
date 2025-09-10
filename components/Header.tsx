'use client';

import { Flex, Heading, Spacer, Avatar, Menu, MenuButton, MenuList, MenuItem, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import useAuthGuard from '../hooks/useAuthGuard';

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuthGuard();

  return (
    <Flex
      as="header"
      align="center"
      bg="white"
      px={6}
      py={3}
      shadow="sm"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      {/* Logo ou titre de l'application */}
      <Heading
        as="h1"
        size="md"
        color="brand.500"
        cursor="pointer"
        onClick={() => router.push('/dashboard')}
      >
        ChantierSync
      </Heading>

      <Spacer />

      {/* Menu Avatar */}
      <Menu>
        <MenuButton>
          <HStack spacing={2}>
            <Avatar size="sm" name={user?.name || user?.email || 'Utilisateur'} />
          </HStack>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => router.push('/profile')}>Mon Profil</MenuItem>
          <MenuItem onClick={logout} color="red">
            Déconnexion
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
