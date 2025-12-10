import React from 'react';

const MeasurementsTable = ({ data }) => {
  // 1. Si no hay datos, mostramos mensaje
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-80 flex items-center justify-center">
        <p className="text-gray-400">No hay registros históricos</p>
      </div>
    );
  }

  // Función para formatear la fecha
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('es-CO', { 
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Historial Detallado</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Descargar CSV
        </button>
      </div>
      
      <div className="overflow-x-auto max-h-80">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Variable</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Valor</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Unidad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                  {formatDate(row.timestamp)}
                </td>
                <td className="p-4 text-sm font-medium text-gray-800">
                  {row.variable}
                </td>
                <td className="p-4 text-sm font-bold text-gray-900">
                  {row.value}
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {row.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeasurementsTable;