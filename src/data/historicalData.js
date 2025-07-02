// src/data/historicalData.js

const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

export const monthlyHistoricalData = Array.from({ length: daysInMonth }, (_, i) => {
  const day = i + 1;
  const date = new Date(currentYear, currentMonth, day);
  // Simulación de datos históricos con alguna tendencia
  const baseViabilizaciones = 20 + Math.sin(day / 5) * 5;
  const baseAplicaciones = 10 + Math.cos(day / 7) * 3;
  const baseMatriculas = 5 + Math.sin(day / 3) * 2;

  return {
    day: day,
    viabilizaciones: Math.max(0, Math.round(baseViabilizaciones + Math.random() * 5)),
    aplicaciones: Math.max(0, Math.round(baseAplicaciones + Math.random() * 3)),
    matriculas: Math.max(0, Math.round(baseMatriculas + Math.random() * 2)),
    // Puedes añadir más etapas si lo deseas
  };
});