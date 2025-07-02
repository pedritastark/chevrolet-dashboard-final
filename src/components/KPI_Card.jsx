// src/components/KPI_Card.jsx

import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const KPI_Card = ({ title, value, suffix }) => {
  return (
    <Box p={5} shadow='md' borderWidth='1px' borderRadius='lg' bg='white'>
      <VStack align='start'>
        <Text fontSize='sm' color='gray.500'>
          {title}
        </Text>
        <Heading size='lg' fontWeight='semibold'>
          {value}
          {suffix && (
            <Text as='span' fontSize='md' color='gray.600' ml={1}>
              {suffix}
            </Text>
          )}
        </Heading>
      </VStack>
    </Box>
  );
};

export default KPI_Card;