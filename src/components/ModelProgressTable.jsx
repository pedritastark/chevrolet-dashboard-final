// src/components/ModelProgressTable.jsx
import React from 'react';

import {
  Box, Heading, Progress, Table, TableContainer, Tbody, Td, Th, Thead, Tr
} from '@chakra-ui/react';

const ModelProgressTable = ({ data, onRowClick, selectedModelId }) => (
  <Box p={5} shadow='md' borderWidth='1px' borderRadius='lg' bg='white'>
    <Heading size='md' mb={4}>Progreso por Modelo</Heading>
    <TableContainer>
      <Table variant='simple' size='sm'>
        <Thead>
          <Tr>
            <Th>Modelo</Th>
            <Th isNumeric>Visibilizaciones</Th>
            <Th isNumeric>Aplicaciones</Th>
            <Th isNumeric>Matrículas</Th>
            <Th>Progreso vs. Objetivo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((model) => (
            <Tr
              key={model.id}
              onClick={() => onRowClick(model)} // <-- Llama a la función al hacer clic
              bg={model.id === selectedModelId ? 'blue.50' : 'transparent'} // <-- Resalta la fila seleccionada
              _hover={{ bg: 'gray.50', cursor: 'pointer' }} // <-- Cambia el cursor y el fondo al pasar el mouse
              transition="background-color 0.2s"
            >
              <Td fontWeight='medium'>{model.modelo}</Td>
              <Td isNumeric>{model.progreso.visibilizaciones}</Td>
              <Td isNumeric>{model.progreso.aplicaciones}</Td>
              <Td isNumeric>{model.progreso.matriculas}</Td>
              <Td>
                <Box>
                  <Progress value={(model.progreso.matriculas / model.objetivoMatriculas) * 100} size='sm' colorScheme='green' borderRadius='md' />
                  <small>{model.progreso.matriculas} de {model.objetivoMatriculas}</small>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  </Box>
);

export default ModelProgressTable;