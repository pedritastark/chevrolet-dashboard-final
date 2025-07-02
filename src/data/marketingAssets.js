// src/data/marketingAssets.js

export const marketingAssets = [
    {
      id: 1,
      name: 'Ficha Técnica Tracker 2025',
      type: 'PDF',
      category: 'Ficha Técnica',
      model: 'Tracker',
      url: '#',
      thumbnail: 'https://www.chevrolet.com.co/content/dam/chevrolet/south-america/colombia/espanol/index/pick-ups-and-trucks/2025-tracker-turbo/color/rojo-chili/2025-chevrolet-tracker-rs-rojo-chili-01.jpg?imwidth=400'
    },
    {
      id: 2,
      name: 'Campaña "Aventura sin Límites"',
      type: 'Video',
      category: 'Promoción',
      model: 'Montana',
      url: '#',
      thumbnail: 'https://www.chevrolet.com.co/content/dam/chevrolet/south-america/colombia/espanol/index/pick-ups-and-trucks/2024-montana/color/plata-switchblade/2024-chevrolet-montana-rs-plata-switchblade-01.jpg?imwidth=400'
    },
    {
      id: 3,
      name: 'Post para Instagram - Onix',
      type: 'Imagen',
      category: 'Redes Sociales',
      model: 'Onix HB',
      url: '#',
      thumbnail: 'https://www.chevrolet.com.co/content/dam/chevrolet/south-america/colombia/espanol/index/cars/2025-onix-turbo/color/blanco-olimpo/2025-chevrolet-onix-blanco-olimpo-01.jpg?imwidth=400'
    },
    {
      id: 4,
      name: 'Lista de Precios Oficial - Julio',
      type: 'Excel',
      category: 'Lista de Precios',
      model: 'Todos',
      url: '#',
      thumbnail: 'https://placehold.co/80x45/E2E8F0/A0AEC0?text=XLSX'
    },
    {
      id: 5,
      name: 'Copy para Campaña de EVs',
      type: 'Copy',
      category: 'Redes Sociales',
      model: 'Equinox EV',
      url: '#',
      thumbnail: 'https://placehold.co/80x45/E2E8F0/A0AEC0?text=TXT'
    },
  ];
  
  // Extraemos las categorías y modelos únicos para los filtros
  export const uniqueCategories = [...new Set(marketingAssets.map(asset => asset.category))];
  export const uniqueModels = [...new Set(marketingAssets.map(asset => asset.model))];