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
          {stations.map((station) => (
            <tr key={station.id} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 font-medium text-gray-800">{station.name}</td>
              <td className="p-4">
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                  station.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {station.status.toUpperCase()}
                </span>
              </td>
              <td className="p-4 text-gray-500 text-sm">{station.last_reading}</td>
              <td className="p-4">
                <button 
                  onClick={() => onSelectStation(station.id)}
                  className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors"
                >
                  Ver Mediciones →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StationsList;