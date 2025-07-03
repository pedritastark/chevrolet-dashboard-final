// src/App.jsx

import React from 'react';
import { Box } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Dashboard from './screens/Dashboard.jsx';
import MarketingResources from './screens/MarketingResources.jsx';
import PerformanceAnalysis from './screens/PerformanceAnalysis.jsx';
import AiChat from './screens/AiChat.jsx'; // <-- 1. Importa la nueva pantalla de chat

function App() {
  return (
    <BrowserRouter>
      <Box bg='gray.50' minH='100vh'>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recursos" element={<MarketingResources />} />
            <Route path="/analisis" element={<PerformanceAnalysis />} />
            <Route path="/chat" element={<AiChat />} /> {/* <-- 2. Añade la nueva ruta */}
          </Routes>
        </main>
      </Box>
    </BrowserRouter>
  );
}

export default App;