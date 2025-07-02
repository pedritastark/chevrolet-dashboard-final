// src/screens/Dashboard.jsx

import React, { useState } from 'react';
import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { salesData } from '../data/salesData';
import WelcomeCard from '../components/WelcomeCard.jsx';
import ModelPerformance from '../components/ModelPerformance.jsx';
import PerformanceHighlights from '../components/PerformanceHighlights.jsx'; // <-- 1. Importa el nuevo componente

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('list');
  const [chartModel, setChartModel] = useState({ id: 'all', modelo: 'Todos los modelos' });

  const totalMatriculas = salesData.reduce((s, i) => s + i.progreso.matriculas, 0);
  const totalObjetivo = salesData.reduce((s, i) => s + i.objetivoMatriculas, 0);
  const funnelDataGeneral = salesData.reduce((acc, item) => {
    Object.keys(item.progreso).forEach(key => acc[key] = (acc[key] || 0) + item.progreso[key]);
    return acc;
  }, {});

  return (
    <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={6} p={6}>
      {/* --- COLUMNA IZQUIERDA --- */}
      <GridItem>
        <VStack spacing={6} align="stretch">
          <WelcomeCard
            userName="Ana"
            totalSales={totalMatriculas}
            totalObjective={totalObjetivo}
          />
          {/* 2. Añade el nuevo componente aquí, pasándole los datos */}
          <PerformanceHighlights data={salesData} />
        </VStack>
      </GridItem>

      {/* --- COLUMNA DERECHA --- */}
      <GridItem>
        <VStack spacing={6} align="stretch">
          <ModelPerformance
            view={viewMode}
            onViewChange={setViewMode}
            salesData={salesData}
            funnelDataGeneral={funnelDataGeneral}
            chartModel={chartModel}
            onChartModelChange={setChartModel}
          />
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default Dashboard;