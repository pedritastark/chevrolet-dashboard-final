// src/App.jsx

import React from 'react';
import { Box } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Dashboard from './screens/Dashboard.jsx';
import RetailReport from './screens/RetailReport.jsx';


// Placeholders para las otras pantallas (puedes crear estos archivos después)
const Documents = () => <Box p={10}>Pantalla de Documentos</Box>;

function App() {
  return (
    <BrowserRouter>
      <Box bg='gray.50' minH='100vh'>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/retail-report" element={<RetailReport />} />
          </Routes>
        </main>
      </Box>
    </BrowserRouter>
  );
}

export default App;