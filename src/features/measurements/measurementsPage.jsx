import { useEffect, useState } from 'react';
import StationsList from './StationList'; 
import MeasurementsCards from './measurementsCards';
import MeasurementsChart from './measurementsChart';
import MeasurementsTable from './measurementsTable';
import { getAllStations, getLatestMeasurements, getHistory } from './api/measurements.api';

const MeasurementsPage = () => {
  const [selectedStationId, setSelectedStationId] = useState(null);
  const [stationsList, setStationsList] = useState([]);
  const [latestData, setLatestData] = useState(null);
  const [historyData, setHistoryData] = useState([]);

  // 1. Cargar lista de estaciones
  useEffect(() => {
    const loadStations = async () => {
      try {
        const list = await getAllStations();
        console.log("Lista Estaciones (BD):", list); 
        setStationsList(list);
      } catch (error) {
        console.error("Error cargando estaciones:", error);
      }
    };
    loadStations();
  }, []);

  // 2. Cargar datos de la estación seleccionada
  useEffect(() => {
    if (selectedStationId) {
      const loadDetails = async () => {
        try {
          // Limpiamos datos anteriores para evitar confusión visual
          setLatestData(null); 
          setHistoryData([]);

          const [latest, history] = await Promise.all([
            getLatestMeasurements(selectedStationId),
            getHistory(selectedStationId)
          ]);

          console.log("Datos Recientes (API):", latest); // Para depurar
          setLatestData(latest);
          setHistoryData(history);
        } catch (error) {
          console.error("Error cargando detalles:", error);
        }
      };
      loadDetails();
    }
  }, [selectedStationId]);

  
  const currentStation = stationsList.find(s => 
    String(s.estacion_id || s.id) === String(selectedStationId)
  );

  // Normalizamos el estado a mayúsculas
  const rawStatus = currentStation?.estado || currentStation?.status || 'ONLINE';
  const finalStatus = rawStatus.toUpperCase();
  const stationName = currentStation?.nombre_estacion || currentStation?.name || 'Estación Desconocida';

  // --- VISTA LISTA ---
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

  // --- VISTA DETALLE ---
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-screen">
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
          <h1 className="text-2xl font-bold text-gray-800">{stationName}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className={`w-3 h-3 rounded-full ${finalStatus === 'ONLINE' ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <p className="text-gray-500 text-sm font-medium">Estado: {finalStatus}</p>
          </div>
        </div>
      </div>

      {/* Pasamos los datos y el estado corregido */}
      <MeasurementsCards latestData={latestData} status={finalStatus} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MeasurementsChart data={historyData} />
        <MeasurementsTable data={historyData} />
      </div>
    </div>
  );
};

export default MeasurementsPage;