import { useEffect, useState } from 'react';
import StationsList from './StationList'; 
import MeasurementsCards from './measurementsCards';
import MeasurementsChart from './measurementsChart';
import MeasurementsTable from './measurementsTable';
import { getAllStations, getLatestMeasurements, getHistory } from './api/measurements.api';

const MeasurementsPage = () => {
  // Estado para controlar la navegación
  const [selectedStationId, setSelectedStationId] = useState(null); // null = Vista General
  const [stationsList, setStationsList] = useState([]);
  
  // Estados de datos
  const [latestData, setLatestData] = useState(null);
  const [historyData, setHistoryData] = useState([]);

  // 1. Cargar la lista de estaciones al inicio
  useEffect(() => {
    const loadStations = async () => {
      const list = await getAllStations();
      setStationsList(list);
    };
    loadStations();
  }, []);

  // 2. Cargar datos detallados cuando se selecciona una estación
  useEffect(() => {
    if (selectedStationId) {
      const loadDetails = async () => {
        // Aquí podrías usar selectedStationId para pedir datos específicos
        // Por ahora usamos el mock ID 1 para que siempre muestre datos
        const [latest, history] = await Promise.all([
          getLatestMeasurements(selectedStationId),
          getHistory(selectedStationId)
        ]);
        setLatestData(latest);
        setHistoryData(history);
      };
      loadDetails();
    }
  }, [selectedStationId]);

  // --- RENDERIZADO CONDICIONAL ---

  // VISTA A: LISTA GENERAL (Si no hay ID seleccionado)
  if (!selectedStationId) {
    return (
      <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Panel VRISA</h1>
        <StationsList 
          stations={stationsList} 
          onSelectStation={(id) => setSelectedStationId(id)} 
        />
      </div>
    );
  }

  // VISTA B: DASHBOARD DETALLADO (Si hay ID seleccionado)
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-screen">
      
      {/* Botón Volver */}
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={() => setSelectedStationId(null)}
          className="text-gray-500 hover:text-blue-600 font-medium flex items-center gap-1"
        >
          ← Volver a la lista
        </button>
      </div>

      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Detalle de Estación</h1>
          <p className="text-gray-500">Visualizando datos de la estación ID: {selectedStationId}</p>
        </div>
      </div>

      <MeasurementsCards data={latestData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MeasurementsChart data={historyData} />
        <MeasurementsTable data={historyData} />
      </div>
    </div>
  );
};

export default MeasurementsPage;