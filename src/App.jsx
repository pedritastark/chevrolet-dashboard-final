// src/App.jsx

import React from 'react';
import { Box } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Dashboard from './screens/Dashboard.jsx';
import MarketingResources from './screens/MarketingResources.jsx';
import PerformanceAnalysis from './screens/PerformanceAnalysis.jsx'; // <-- 1. Importa la nueva pantalla

function App() {
  return (
    <BrowserRouter>
      <Box bg='gray.50' minH='100vh'>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recursos" element={<MarketingResources />} />
            {/* 2. Actualiza la ruta aquí */}
            <Route path="/analisis" element={<PerformanceAnalysis />} />
          </Routes>
        </main>
      </Box>
    </BrowserRouter>
  );
}

export default App;