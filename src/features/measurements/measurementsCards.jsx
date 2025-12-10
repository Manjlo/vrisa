import React from 'react';

const MeasurementsCards = ({ data }) => {
  // 1. Estado de Carga (Skeleton Loader)
  if (!data) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // 2. Renderizado de Datos
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Station Measurements</h2>
          <p className="text-sm text-gray-500">
            Estación: <span className="font-medium text-blue-600">{data.station_name}</span>
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
          data.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {data.status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.sensors.map((sensor, index) => {
          const colorClasses = {
            green: 'bg-green-50 border-green-200 text-green-800',
            yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
            orange: 'bg-orange-50 border-orange-200 text-orange-800',
            red: 'bg-red-50 border-red-200 text-red-800',
            gray: 'bg-gray-100 border-gray-300 text-gray-400',
          };
          
          const theme = colorClasses[sensor.color] || colorClasses.green;

          return (
            <div 
              key={index} 
              className={`p-4 rounded-xl border-2 ${theme} transition-all hover:shadow-md`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold opacity-70 uppercase mb-1">
                    {sensor.variable}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold tracking-tight">
                      {sensor.value}
                    </span>
                    <span className="text-sm font-medium opacity-60">
                      {sensor.unit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MeasurementsCards;