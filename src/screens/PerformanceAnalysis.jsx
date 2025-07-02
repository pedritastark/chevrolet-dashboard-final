// src/screens/PerformanceAnalysis.jsx

import React, { useState } from 'react';
import { Box, Heading, HStack, Select, Grid, GridItem, VStack } from '@chakra-ui/react';
import { salesData } from '../data/salesData';
import { monthlyHistoricalData } from '../data/historicalData';
import KPI_Card from '../components/KPI_Card.jsx';
import MonthlyProgressChart from '../components/MonthlyProgressChart.jsx';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const PIE_CHART_COLORS = ['#3182CE', '#38B2AC', '#6B46C1', '#D53F8C', '#D69E2E', '#319795', '#DD6B20'];

const vehicleCategories = ['SUV', 'Sedán', 'Hatchback', 'Pick-Up', 'Van', 'Eléctrico'];

// Función para obtener la categoría de un modelo (fuera del componente para mejor rendimiento)
const getCategory = (modelName) => {
  if (['Tracker', 'Captiva', 'Traverse', 'Tahoe'].includes(modelName)) return 'SUV';
  if (['Equinox EV', 'Blazer EV'].includes(modelName)) return 'Eléctrico';
  if (['Onix SDN', 'N400'].includes(modelName)) return 'Sedán';
  if (['Onix HB'].includes(modelName)) return 'Hatchback';
  if (['Spin'].includes(modelName)) return 'Van';
  if (['Montana', 'Colorado', 'Silverado'].includes(modelName)) return 'Pick-Up';
  return 'Otro';
};

const PerformanceAnalysis = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [modelFilter, setModelFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredSalesData = salesData.filter(item =>
    (modelFilter === 'all' || item.modelo === modelFilter) &&
    (categoryFilter === 'all' || getCategory(item.modelo) === categoryFilter)
  );

  const totalMatriculas = filteredSalesData.reduce((sum, item) => sum + item.progreso.matriculas, 0);
  const totalViabilizaciones = filteredSalesData.reduce((sum, item) => sum + item.progreso.viabilizaciones, 0);
  const conversionRate = totalViabilizaciones > 0 ? (totalMatriculas / totalViabilizaciones) * 100 : 0;

  const salesMixData = filteredSalesData
    .map((model, index) => ({
      name: model.modelo,
      value: model.progreso.matriculas,
    }))
    .sort((a,b) => b.value - a.value)
    .slice(0, 5);

  const viabilizacionesByCategory = vehicleCategories
    .map(category => ({
      name: category,
      value: filteredSalesData
        .filter(item => getCategory(item.modelo) === category)
        .reduce((sum, item) => sum + item.progreso.viabilizaciones, 0),
    }))
    .filter(item => item.value > 0);

  const currentMonthName = new Date().toLocaleString('es-CO', { month: 'long' });
  const capitalizedMonth = currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1);
  
  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={6}>Análisis de Rendimiento</Heading>

      <HStack spacing={4} mb={8}>
        <Select placeholder="Seleccionar rango de fechas" maxW="200px" value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
          <option value="30d">Últimos 30 días</option>
          <option value="90d">Últimos 90 días</option>
          <option value="this_year">Este año</option>
        </Select>
        <Select placeholder="Filtrar por modelo" maxW="250px" value={modelFilter} onChange={(e) => setModelFilter(e.target.value)}>
          <option value="all">Todos los modelos</option>
          {salesData.map(model => <option key={model.id} value={model.modelo}>{model.modelo}</option>)}
        </Select>
        <Select placeholder="Filtrar por categoría" maxW="250px" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">Todas las categorías</option>
          {vehicleCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </Select>
      </HStack>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6} mb={8}>
        <KPI_Card title="Total Matrículas en Período" value={totalMatriculas} />
        <KPI_Card title="Total Viabilizaciones en Período" value={totalViabilizaciones} />
        <KPI_Card title="Tasa de Conversión (Matrículas / Viab.)" value={`${conversionRate.toFixed(1)}%`} />
      </Grid>

      <VStack spacing={8} align="stretch">
        <MonthlyProgressChart data={monthlyHistoricalData} monthName={capitalizedMonth} />
        <Box p={6} bg="white" borderRadius="lg" shadow="md" borderWidth="1px">
          <Heading size="md" mb={6}>Análisis de Modelos y Categorías</Heading>
          {/* Usamos GridItem aquí para que cada gráfico ocupe su espacio */}
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
            <GridItem>
              <Heading size="sm" mb={4} textAlign="center">Mix de Ventas (Top 5)</Heading>
              {/* Contenedor con altura definida */}
              <Box h="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={salesMixData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                      {salesMixData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </GridItem>
            <GridItem>
              <Heading size="sm" mb={4} textAlign="center">Interés por Categoría</Heading>
              {/* Contenedor con altura definida */}
              <Box h="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={viabilizacionesByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                      {viabilizacionesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </VStack>
    </Box>
  );
};

export default PerformanceAnalysis;