import React from 'react';
import { Spin, Alert } from 'antd';
import { useStations } from 'src/hooks/useStations';
import MapViewComponent from 'src/components/vrisa/MapView';

const MapView = () => {
  const { stations, loading, error } = useStations();

  const handleStationSelect = (station) => {
    console.log('Estación seleccionada:', station);
    // Aquí se podría abrir un drawer o modal con detalles
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><Spin size="large" /></div>;
  }

  if (error) {
    return <Alert message="Error al cargar el mapa" description={error} type="error" showIcon />;
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapViewComponent stations={stations} onStationSelect={handleStationSelect} />
    </div>
  );
};

export default MapView;
