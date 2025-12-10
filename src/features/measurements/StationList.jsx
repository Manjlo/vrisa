import React from 'react';

const StationsList = ({ stations, onSelectStation }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800">Red de Monitoreo - Vista General</h2>
        <p className="text-gray-500 text-sm">Seleccione una estación para ver sus mediciones detalladas</p>
      </div>
      
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-xs font-bold text-gray-500 uppercase">Estación</th>
            <th className="p-4 text-xs font-bold text-gray-500 uppercase">Estado</th>
            <th className="p-4 text-xs font-bold text-gray-500 uppercase">Última Actividad</th>
            <th className="p-4 text-xs font-bold text-gray-500 uppercase">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {stations.map((station) => {
            // 1. DETECTAR DATOS REALES DE LA ESTACIÓN
            const stationName = station.name || station.nombre || station.nombre_estacion || 'Estación sin nombre';
            const stationId = station.id || station.estacion_id;
            const rawStatus = station.status || station.estado || 'OFFLINE';
            const statusUpper = rawStatus.toUpperCase(); 
            const isOnline = statusUpper === 'ONLINE';

            return (
              <tr key={stationId} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-800">
                  {stationName}
                  <div className="text-xs text-gray-400 font-normal">ID: {stationId}</div>
                </td>
                
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {statusUpper}
                  </span>
                </td>
                
                <td className="p-4 text-gray-500 text-sm">
                  {/* Si no hay fecha, mostramos guiones */}
                  {station.last_reading || station.ultima_lectura || '--'}
                </td>
                
                <td className="p-4">
                  <button 
                    onClick={() => onSelectStation(stationId)}
                    className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors"
                  >
                    Ver Mediciones →
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StationsList;