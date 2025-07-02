// src/components/ModelProgressTable.jsx
import React from 'react';
import {
  Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Progress
} from '@chakra-ui/react';

// Se eliminan las props onRowClick y selectedModelId
const ModelProgressTable = ({ data }) => (
  // Se elimina el Box exterior y el Heading
  <TableContainer>
    <Table variant='simple' size='sm'>
      <Thead>
        <Tr>
          <Th>Modelo</Th>
          <Th isNumeric>Viabilizaciones</Th>
          <Th isNumeric>Aplicaciones</Th>
          <Th isNumeric>Matrículas</Th>
          <Th>Progreso vs. Objetivo</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((model) => (
          // Se elimina toda la lógica de onClick y estilos dinámicos de la fila
          <Tr key={model.id}>
            <Td fontWeight='medium'>{model.modelo}</Td>
            <Td isNumeric>{model.progreso.viabilizaciones}</Td>
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
);

export default ModelProgressTable;