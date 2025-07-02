// src/components/ProgressCircleIndicator.jsx

import React from 'react';
import { Box, Text, CircularProgress, CircularProgressLabel, VStack } from '@chakra-ui/react';

const ProgressCircleIndicator = ({ value, maxValue }) => {
  const progressPercentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

  return (
    // 1. Usamos VStack para centrar todo y manejar el texto inferior
    <VStack spacing={1}>
      <CircularProgress
        value={progressPercentage}
        color='green.400'       // 2. Color de progreso verde
        trackColor='gray.200'  // Color de fondo de la barra
        size='160'
        thickness='12px'
        capIsRound             // 3. Bordes de la barra redondeados
      >
        <CircularProgressLabel fontSize="2xl" fontWeight="bold" color="gray.700">
          {`${Math.round(progressPercentage)}%`}
        </CircularProgressLabel>
      </CircularProgress>

      <Text fontSize="sm" color="gray.600" fontWeight="medium">
        {value} / {maxValue}
      </Text>
    </VStack>
  );
};

export default ProgressCircleIndicator;