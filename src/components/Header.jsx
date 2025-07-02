// src/components/Header.jsx

import React from 'react';
import { Box, Flex, Heading, HStack, Button, IconButton, Avatar } from '@chakra-ui/react';
import { BellIcon, SunIcon } from '@chakra-ui/icons';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Recursos', path: '/recursos' },
  { label: 'Análisis', path: '/analisis' },
];

const Header = () => {
  const location = useLocation(); // Hook para obtener la ruta actual

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      py={2}
      px={4}
      bg="white"
      borderBottomWidth="1px"
      shadow="sm"
    >
      {/* Sección Izquierda */}
      <HStack as={Link} to="/" spacing={3} _hover={{ textDecoration: 'none' }}>
        <SunIcon w={6} h={6} color="green.500" />
        <Heading as="h1" size="md" color="green.500" fontWeight="bold">
        <span style={{ color: 'black' }}>Ana-</span>
          <span style={{ color: '#38A169' }}>lytics</span>

        </Heading>
      </HStack>

      {/* Sección Central: Navegación Dinámica */}
      <HStack spacing={2}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.label}
              as={Link}
              to={item.path}
              variant="ghost"
              bg={isActive ? 'gray.100' : 'transparent'}
              fontWeight={isActive ? 'bold' : 'normal'}
              transition="transform 0.2s"
              _hover={{
                bg: isActive ? 'gray.100' : 'gray.50',
                transform: isActive ? 'none' : 'scale(1.1)', // Agranda el texto si no está activo
              }}
            >
              {item.label}
            </Button>
          );
        })}
      </HStack>
      
      {/* Sección Derecha */}
      <HStack spacing={4}>
        <IconButton
          variant="ghost"
          aria-label="Notificaciones"
          icon={<BellIcon w={6} h={6} />}
        />
        <Avatar name="Ana Cediel" size="sm" />
      </HStack>
    </Flex>
  );
};

export default Header;