// src/components/PerformanceHighlights.jsx

import React from 'react';
import { Box, Heading, VStack, HStack, Text, Icon, Grid, GridItem, Divider } from '@chakra-ui/react';
import { FaTrophy, FaBullhorn } from 'react-icons/fa';

const PerformanceHighlights = ({ data }) => {
  // --- LÓGICA DE CÁLCULO (sin cambios) ---
  const topPerformers = [...data]
    .sort((a, b) => b.progreso.matriculas - a.progreso.matriculas)
    .slice(0, 3);

  const modelsToPush = [...data]
    .sort((a, b) => {
      const progressA = a.objetivoMatriculas > 0 ? (a.progreso.matriculas / a.objetivoMatriculas) : 0;
      const progressB = b.objetivoMatriculas > 0 ? (b.progreso.matriculas / b.objetivoMatriculas) : 0;
      return progressA - progressB;
    })
    .slice(0, 3);

  return (
    // Usamos VStack para centrar el título principal
    <VStack p={6} bg="white" borderRadius="lg" shadow="md" borderWidth="1px" align="stretch">
      <Heading size="md" mb={4} textAlign="center">
       Información Estratégica
      </Heading>
      
      {/* Usamos Grid para crear las dos columnas con el divisor en medio */}
      <Grid templateColumns={{ base: '1fr', md: '1fr auto 1fr' }} gap={6} alignItems="start">
        
        {/* Columna de Top Performers */}
        <GridItem>
          <VStack align="start" spacing={3}>
            <HStack>
              <Icon as={FaTrophy} color="yellow.500" />
              <Heading size="sm">Top 3 Modelos</Heading>
            </HStack>
            {topPerformers.map(model => (
              <HStack key={model.id} w="100%" justify="space-between">
                <Text fontSize="sm">{model.modelo}</Text>
                <Text fontSize="sm" fontWeight="bold">{model.progreso.matriculas} un.</Text>
              </HStack>
            ))}
          </VStack>
        </GridItem>
        
        {/* Divisor Vertical */}
        <Divider orientation="vertical" />

        {/* Columna de Modelos a Impulsar */}
        <GridItem>
          <VStack align="start" spacing={3}>
            <HStack>
              <Icon as={FaBullhorn} color="orange.500" />
              <Heading size="sm">Modelos a Impulsar</Heading>
            </HStack>
            {modelsToPush.map(model => (
              <HStack key={model.id} w="100%" justify="space-between">
                <Text fontSize="sm">{model.modelo}</Text>
                <Text fontSize="sm" fontWeight="bold" color="red.500">
                  {Math.round((model.progreso.matriculas / model.objetivoMatriculas) * 100)}%
                </Text>
              </HStack>
            ))}
          </VStack>
        </GridItem>

      </Grid>
    </VStack>
  );
};

export default PerformanceHighlights;