// src/components/FunnelMeter.jsx

import React from 'react';
import { Box, VStack, Heading, Text, Flex, Badge } from '@chakra-ui/react';

// 1. Actualizamos la configuración del embudo
const STAGES_CONFIG = [
  { key: 'matriculas', label: 'Matrículas', color: 'green.500' },
  { key: 'garrapatas', label: 'Garrapatas', color: 'yellow.500' }, // <-- Añadido
  { key: 'reservas', label: 'Reservas', color: 'teal.500' },
  { key: 'desembolso', label: 'Desembolso', color: 'cyan.500' },
  { key: 'aplicaciones', label: 'Aplicaciones', color: 'blue.500' },
  { key: 'viabilizaciones', label: 'Viabilizaciones', color: 'purple.500' }, // <-- Corregido
];

const FunnelMeter = ({ data, title = "Progreso del Mes" }) => {
  // 2. Corregimos la llave para el valor máximo
  const maxValue = data.viabilizaciones || 1;

  return (
    <Box p={4} bg="white" borderRadius="lg" shadow="md" borderWidth="1px" h="100%">
      <Heading size="md" mb={3}>
        {title}
      </Heading>

      <VStack spacing={1} align="stretch">
        {STAGES_CONFIG.map((stage, index) => {
          const value = data[stage.key] || 0;
          const percentageOfMax = (value / maxValue) * 100;
          let conversionRate = null;
          if (index < STAGES_CONFIG.length - 1) {
            const previousStageKey = STAGES_CONFIG[index + 1].key;
            const previousStageValue = data[previousStageKey] || 1;
            conversionRate = (value / previousStageValue) * 100;
          }
          return (
            <Box key={stage.key}>
              <Flex justify="space-between" align="center" mb={1}>
                <Flex align="center">
                  <Text fontSize="sm" fontWeight="bold" color="gray.600">
                    {stage.label}
                  </Text>
                  {conversionRate !== null && (
                    <Badge ml={2} colorScheme="gray" variant="subtle" fontSize="0.7em">
                      {conversionRate.toFixed(1)}%
                    </Badge>
                  )}
                </Flex>
                <Text fontSize="sm" fontWeight="bold" color={stage.color}>
                  {value}
                </Text>
              </Flex>
              <Box w="100%" bg="gray.200" borderRadius="md" h="14px" overflow="hidden">
                <Box bg={stage.color} h="100%" w={`${percentageOfMax}%`} transition="width 0.5s ease-in-out" />
              </Box>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default FunnelMeter;