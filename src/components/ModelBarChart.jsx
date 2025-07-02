// src/components/ModelBarChart.jsx

import React from 'react';
import { Box, Flex, Button, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const STAGE_COLORS = {
  matriculas: '#48BB78',
  garrapatas: '#ECC94B',
  reservas: '#38B2AC',
  desembolso: '#319795',
  aplicaciones: '#4299E1',
  viabilizaciones: '#805AD5',
};

const ModelBarChart = ({ allData, selectedModel, onModelChange }) => {
  // Prepara los datos para el gráfico según el modelo seleccionado
  const getChartData = () => {
    let dataToProcess;
    if (selectedModel.id === 'all') {
      // Agrega los datos de todos los modelos si "Todos" está seleccionado
      dataToProcess = allData.reduce((acc, model) => {
        Object.keys(model.progreso).forEach(key => {
          acc[key] = (acc[key] || 0) + model.progreso[key];
        });
        return acc;
      }, {});
    } else {
      dataToProcess = selectedModel.progreso;
    }
    
    // Formatea los datos para Recharts
    return Object.keys(dataToProcess).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: dataToProcess[key],
      color: STAGE_COLORS[key] || '#8884d8'
    })).reverse();
  };

  const chartData = getChartData();

  return (
    <Box>
      {/* Menú para seleccionar el modelo */}
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mb={4}>
          {selectedModel.modelo}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => onModelChange({ id: 'all', modelo: 'Todos los modelos' })}>
            Todos los modelos
          </MenuItem>
          {allData.map(model => (
            <MenuItem key={model.id} onClick={() => onModelChange(model)}>
              {model.modelo}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {/* Gráfico de Barras */}
      <Box h="350px">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 30 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: '#f5f5f5' }} />
            <Bar dataKey="value" barSize={20}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default ModelBarChart;