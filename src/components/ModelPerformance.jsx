// src/components/ModelPerformance.jsx

import React from 'react';
import { Box, Heading, Flex, Spacer, IconButton, ButtonGroup, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { BsListUl, BsFunnel } from 'react-icons/bs'; // Usamos un icono de embudo
import ModelProgressTable from './ModelProgressTable.jsx';
import FunnelMeter from './FunnelMeter.jsx';

const ModelPerformance = (props) => {
  const {
    view,
    onViewChange,
    salesData,
    funnelDataGeneral, // Necesitamos los datos generales para la opción "Todos"
    chartModel,
    onChartModelChange,
  } = props;

  // Determina qué datos y título usar para el FunnelMeter
  const isAllModels = chartModel.id === 'all';
  const funnelDataForMeter = isAllModels ? funnelDataGeneral : chartModel.progreso;
  const funnelTitle = isAllModels ? 'Embudo General de Ventas' : `Embudo de ${chartModel.modelo}`;

  return (
    <Box p={5} shadow='md' borderWidth='1px' borderRadius='lg' bg='white'>
      <Flex align="center" mb={4}>
        <Heading size='md'>Progreso por Modelo</Heading>
        <Spacer />
        <ButtonGroup isAttached variant="outline" size="sm">
          <IconButton
            icon={<BsListUl />}
            aria-label="Vista de lista"
            isActive={view === 'list'}
            onClick={() => onViewChange('list')}
          />
          <IconButton
            icon={<BsFunnel />} // <-- Icono de embudo
            aria-label="Vista de embudo"
            isActive={view === 'funnel'}
            onClick={() => onViewChange('funnel')}
          />
        </ButtonGroup>
      </Flex>

      {/* Renderizado condicional: o la tabla, o el selector + embudo */}
      {view === 'list' ? (
        <ModelProgressTable data={salesData} />
      ) : (
        <Box>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mb={4}>
              {chartModel.modelo}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => onChartModelChange({ id: 'all', modelo: 'Todos los modelos' })}>
                Todos los modelos
              </MenuItem>
              {salesData.map(model => (
                <MenuItem key={model.id} onClick={() => onChartModelChange(model)}>
                  {model.modelo}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <FunnelMeter data={funnelDataForMeter} title={funnelTitle} />
        </Box>
      )}
    </Box>
  );
};

export default ModelPerformance;