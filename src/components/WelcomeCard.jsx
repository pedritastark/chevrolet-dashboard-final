// src/components/WelcomeCard.jsx

import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Flex,
  Spacer
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import ProgressCircleIndicator from './ProgressCircleIndicator.jsx'; // 1. Importa el nuevo componente

// 2. Añadimos 'totalObjective' a las props
const WelcomeCard = ({ userName, totalSales, totalObjective }) => {
  const lastUpdated = new Date().toLocaleString('es-CO', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  return (
    <Flex
      direction="column"
      p={4}
      bg="white"
      borderRadius="lg"
      shadow="md"
      borderWidth="1px"
      h="100%"
    >
      {/* Saludo */}
      <VStack align="start" spacing={0}>
        <Heading as="h2" size="lg" fontWeight="semibold">
          Hola, {userName} 👋
        </Heading>
        <Text fontSize="md" color="gray.500">
          Aquí tienes un resumen de tus ventas del mes.
        </Text>
      </VStack>

      {/* Métrica Principal - Reemplazada por el indicador circular */}
      <Box my={4}>
        <ProgressCircleIndicator value={totalSales} maxValue={totalObjective} />
      </Box>
      
      <Spacer />

      {/* Botón de Acción y Timestamp */}
      <VStack align="stretch" spacing={1}>
         <Text fontSize="sm" color="gray.500" textAlign="center">
          Lo estás haciendo muy bien, continúa así!
        </Text>
        <Button
          colorScheme="gray"
          bg="gray.800"
          color="white"
          _hover={{ bg: 'gray.700' }}
          rightIcon={<ArrowForwardIcon />}
        >
          Actualizar progreso
        </Button>
        
        <Text fontSize="xs" color="gray.500" textAlign="center">
          Última actualización: {lastUpdated}
        </Text>
      </VStack>
    </Flex>
  );
};

export default WelcomeCard;