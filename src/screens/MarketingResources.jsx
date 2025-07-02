// src/screens/MarketingResources.jsx

import React, { useState, useMemo } from 'react';
import {
  Box, Heading, Input, InputGroup, InputLeftElement, HStack, Select, Button,
  Table, Thead, Tbody, Tr, Th, Td, Image, IconButton, Tooltip
} from '@chakra-ui/react';
import { SearchIcon, DownloadIcon, ViewIcon } from '@chakra-ui/icons';
// --- LÍNEA CORREGIDA ---
// Asegúrate de que el nombre del archivo coincida exactamente (con 'm' minúscula)
import { marketingAssets, uniqueCategories, uniqueModels } from '../data/marketingAssets.js';
import { FiUpload } from 'react-icons/fi';

const MarketingResources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [modelFilter, setModelFilter] = useState('all');

  const filteredAssets = useMemo(() => {
    return marketingAssets.filter(asset => {
      const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || asset.category === categoryFilter;
      const matchesModel = modelFilter === 'all' || asset.model === modelFilter;
      return matchesSearch && matchesCategory && matchesModel;
    });
  }, [searchTerm, categoryFilter, modelFilter]);

  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={6}>Recursos de Marketing</Heading>

      <HStack spacing={4} mb={6}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input 
            placeholder="Buscar por nombre..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">Todas las categorías</option>
          {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </Select>
        <Select value={modelFilter} onChange={(e) => setModelFilter(e.target.value)}>
          <option value="all">Todos los modelos</option>
          {uniqueModels.map(mod => <option key={mod} value={mod}>{mod}</option>)}
        </Select>
        <Tooltip label="Subir Activo" hasArrow>
          <IconButton icon={<FiUpload />} colorScheme="green" aria-label="Subir Activo" />
        </Tooltip>
      </HStack>
      
      <Box bg="white" borderRadius="lg" shadow="md" borderWidth="1px">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Previsualización</Th>
              <Th>Nombre</Th>
              <Th>Modelo</Th>
              <Th>Categoría</Th>
              <Th>Tipo</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredAssets.map(asset => (
              <Tr key={asset.id}>
                <Td><Image src={asset.thumbnail} alt={asset.name} boxSize="40px" objectFit="cover" borderRadius="md" /></Td>
                <Td fontWeight="medium">{asset.name}</Td>
                <Td>{asset.model}</Td>
                <Td>{asset.category}</Td>
                <Td>{asset.type}</Td>
                <Td>
                  <HStack>
                    <Tooltip label="Ver" hasArrow>
                      <IconButton icon={<ViewIcon />} size="sm" variant="ghost" />
                    </Tooltip>
                    <Tooltip label="Descargar" hasArrow>
                      <IconButton icon={<DownloadIcon />} size="sm" variant="ghost" />
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default MarketingResources;