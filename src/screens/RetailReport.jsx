// src/screens/RetailReport.jsx

import React from 'react';
import {
Box,
Heading,
FormControl,
FormLabel,
Select,
Grid,
GridItem,
Card,
CardHeader,
CardBody,
Text,
Button,
Flex,
Spacer,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

const RetailReport = () => {
  return (
    <Box p={6}>
      {/* Selector de Rango de Fechas */}
      <FormControl mb={6}>
        <FormLabel htmlFor="date-range">Seleccionar Rango de Fechas</FormLabel>
        <Select id="date-range">
          <option value="last-30-days">Últimos 30 días</option>
          <option value="this-quarter">Este trimestre</option>
          <option value="this-year">Año actual</option>
          <option value="custom">Rango personalizado</option>
        </Select>
      </FormControl>

      {/* KPIs del Período */}
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={6} mb={8}>
        <Card>
          <CardHeader>
            <Heading size="sm">Total Matrículas</Heading>
          </CardHeader>
          <CardBody>
            <Text fontSize="xl" fontWeight="bold">
              150
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="sm">Ingresos Totales</Heading>
          </CardHeader>
          <CardBody>
            <Text fontSize="xl" fontWeight="bold">
              $3,500,000
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="sm">Promedio de Venta por Unidad</Heading>
          </CardHeader>
          <CardBody>
            <Text fontSize="xl" fontWeight="bold">
              $23,333
            </Text>
          </CardBody>
        </Card>
      </Grid>

      {/* Visualizaciones de Datos */}
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }} gap={8} mb={8}>
        <Card>
          <CardHeader>
            <Heading size="md">Tendencia de Ventas</Heading>
          </CardHeader>
          <CardBody>
            <Box h="300px" bg="gray.100" borderRadius="md" textAlign="center" lineHeight="300px">
              {/* Aquí irá el Gráfico de Líneas */}
              Gráfico de Tendencia
            </Box>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Mix de Ventas por Modelo</Heading>
          </CardHeader>
          <CardBody>
            <Box h="300px" bg="gray.100" borderRadius="md" textAlign="center" lineHeight="300px">
              {/* Aquí irá el Gráfico de Pastel/Dona */}
              Gráfico de Mix de Modelos
            </Box>
          </CardBody>
        </Card>
      </Grid>

      <Card mb={8}>
        <CardHeader>
          <Heading size="md">Rendimiento del Embudo por Modelo</Heading>
        </CardHeader>
        <CardBody>
          <Box h="400px" bg="gray.100" borderRadius="md" textAlign="center" lineHeight="400px">
            {/* Aquí irá el Gráfico de Barras Comparativo del Embudo */}
            Gráfico de Embudo Comparativo
          </Box>
        </CardBody>
      </Card>

      {/* Tabla de Datos Exportable */}
      <Card>
        <CardHeader>
          <Flex align="center">
            <Heading size="md">Datos Detallados de Ventas</Heading>
            <Spacer />
            <Button leftIcon={<DownloadIcon />} colorScheme="blue">
              Exportar
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <Box overflowX="auto">
            {/* Aquí iría la Tabla de Datos */}
            <Text fontSize="sm" color="gray.600" textAlign="center">
              Tabla de datos detallados de ventas (se implementará en el futuro)
            </Text>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default RetailReport;