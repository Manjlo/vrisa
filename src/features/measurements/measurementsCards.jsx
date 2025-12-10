import React from 'react';

const MeasurementsCards = ({ latestData, status }) => {
  const isOffline = status === 'OFFLINE';


  const findMetric = (possibleNames) => {
    if (!latestData) return null;

    const dataList = latestData.sensors || (Array.isArray(latestData) ? latestData : []);
    const keys = Array.isArray(possibleNames) ? possibleNames : [possibleNames];
    const lowerKeys = keys.map(k => k.toLowerCase());
    const found = dataList.find(item => {
      const varName = item.variable || item.name || item.nombre;
      return varName && lowerKeys.includes(varName.toString().toLowerCase());
    });

    return found ? (found.value !== undefined ? found.value : found.valor) : null;
  };

  const getValue = (val) => (isOffline || val === null || val === undefined) ? '--' : val;

  const getCardStyle = (base, text) => {
    if (isOffline) {
      return { 
        container: "bg-gray-50 border-gray-200", 
        title: "text-gray-400", 
        value: "text-gray-500", 
        unit: "text-gray-300" 
      };
    }
    return { 
      container: `bg-white ${base}`, 
      title: "text-gray-500", 
      value: text, 
      unit: "text-gray-400" 
    };
  };

  const metrics = [
    { label: 'PM2.5', value: findMetric(['PM2.5', 'pm25']), unit: 'µg/m³', color: 'border-green-200', text: 'text-green-600' },
    { label: 'PM10', value: findMetric(['PM10', 'pm10']), unit: 'µg/m³', color: 'border-green-200', text: 'text-green-600' },
    { label: 'Temperatura', value: findMetric(['Temperatura', 'Temperature', 'temp']), unit: '°C', color: 'border-orange-200', text: 'text-orange-600' },
    { label: 'Humedad', value: findMetric(['Humedad', 'Humidity']), unit: '%', color: 'border-blue-200', text: 'text-blue-600' },
    { label: 'CO', value: findMetric(['CO', 'Monoxido']), unit: 'ppm', color: 'border-gray-200', text: 'text-gray-600' },
    { label: 'SO2', value: findMetric(['SO2', 'so2']), unit: 'ppb', color: 'border-yellow-200', text: 'text-yellow-600' },
    { label: 'NO2', value: findMetric(['NO2', 'no2']), unit: 'ppb', color: 'border-red-200', text: 'text-red-600' },
    { label: 'O3', value: findMetric(['O3', 'Ozono']), unit: 'ppb', color: 'border-blue-200', text: 'text-blue-600' },
    { label: 'Viento', value: findMetric(['Velocidad Viento', 'Wind Speed', 'velocidad_viento']), unit: 'm/s', color: 'border-purple-200', text: 'text-purple-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {metrics.map((m, i) => {
        const styles = getCardStyle(m.color, m.text);
        return (
          <div key={i} className={`p-4 rounded-lg border shadow-sm transition-all ${styles.container}`}>
            <h3 className={`text-xs font-bold uppercase mb-1 ${styles.title}`}>{m.label}</h3>
            <div className="flex items-end">
              <span className={`text-2xl font-bold mr-1 ${styles.value}`}>{getValue(m.value)}</span>
              <span className={`text-xs mb-1 ${styles.unit}`}>{isOffline ? '' : m.unit}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MeasurementsCards;