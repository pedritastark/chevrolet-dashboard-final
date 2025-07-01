// src/screens/Dashboard.jsx

import React, { useState } from 'react';
import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { salesData } from '../data/salesData';
import { monthlyHistoricalData } from '../data/historicalData';
import WelcomeCard from '../components/WelcomeCard.jsx';
import FunnelMeter from '../components/FunnelMeter.jsx';
import ModelProgressTable from '../components/ModelProgressTable.jsx';
import MonthlyProgressChart from '../components/MonthlyProgressChart.jsx';

const Dashboard = () => {
  const [selectedModel, setSelectedModel] = useState(null);

  const handleRowClick = (model) => {
    if (selectedModel && selectedModel.id === model.id) {
      setSelectedModel(null);
    } else {
      setSelectedModel(model);
    }
  };

  const totalMatriculas = salesData.reduce((s, i) => s + i.progreso.matriculas, 0);
  const totalObjetivo = salesData.reduce((s, i) => s + i.objetivoMatriculas, 0);
  const funnelDataGeneral = salesData.reduce((acc, item) => {
    Object.keys(item.progreso).forEach(key => {
      acc[key] = (acc[key] || 0) + item.progreso[key];
    });
    return acc;
  }, {});

  // --- NUEVA LÓGICA PARA PREPARAR LOS DATOS DEL GRÁFICO ---
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Crea un array con todos los días del mes
  const fullMonthData = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dataForDay = monthlyHistoricalData.find(d => d.day === day);

    // Si hay datos para ese día, los usamos. Si no, creamos un placeholder.
    if (dataForDay) {
      return dataForDay;
    } else {
      return {
        day: day,
        viabilizaciones: null,
        aplicaciones: null,
        desembolso: null,
        reservas: null,
        garrapatas: null,
        matriculas: null,
      };
    }
  });

  const currentMonthName = today.toLocaleString('es-CO', { month: 'long' });
  const capitalizedMonth = currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1);

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
          <FunnelMeter data={funnelDataGeneral} />
        </VStack>
      </GridItem>

      {/* --- COLUMNA DERECHA --- */}
      <GridItem>
        <VStack spacing={6} align="stretch">
          <ModelProgressTable
            data={salesData}
            onRowClick={handleRowClick}
            selectedModelId={selectedModel?.id}
          />
          {selectedModel && (
            <FunnelMeter
              key={selectedModel.id}
              data={selectedModel.progreso}
              title={`Progreso ${selectedModel.modelo}`}
            />
          )}

          {/* Pasamos el nuevo array completo al gráfico */}
          <MonthlyProgressChart data={fullMonthData} monthName={capitalizedMonth} />

        </VStack>
      </GridItem>
    </Grid>
  );
};

export default Dashboard;