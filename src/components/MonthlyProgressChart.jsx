// src/components/MonthlyProgressChart.jsx

import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Usamos los mismos colores que en el FunnelMeter para consistencia
const STAGE_COLORS = {
  matriculas: '#48BB78', // green.500
  garrapatas: '#ECC94B', // yellow.500
  reservas: '#38B2AC',   // teal.500
  desembolso: '#319795', // cyan.500
  aplicaciones: '#4299E1',// blue.500
  viabilizaciones: '#805AD5', // purple.500
};

const MonthlyProgressChart = ({ data, monthName }) => {
  return (
    <Box p={6} bg="white" borderRadius="lg" shadow="md" borderWidth="1px" h="450px">
      <Heading size="md" mb={6}>
        Progreso Histórico - {monthName}
      </Heading>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tickFormatter={(day) => `${day}`} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line connectNulls type="monotone" dataKey="viabilizaciones" stroke={STAGE_COLORS.viabilizaciones} strokeWidth={2} activeDot={{ r: 8 }} />
          <Line connectNulls type="monotone" dataKey="aplicaciones" stroke={STAGE_COLORS.aplicaciones} strokeWidth={2} />
          <Line connectNulls type="monotone" dataKey="desembolso" stroke={STAGE_COLORS.desembolso} strokeWidth={2} />
          <Line connectNulls type="monotone" dataKey="reservas" stroke={STAGE_COLORS.reservas} strokeWidth={2} />
          <Line connectNulls type="monotone" dataKey="garrapatas" stroke={STAGE_COLORS.garrapatas} strokeWidth={2} />
          <Line connectNulls type="monotone" dataKey="matriculas" stroke={STAGE_COLORS.matriculas} strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MonthlyProgressChart;