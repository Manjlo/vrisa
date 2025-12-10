import React, { useState, useMemo } from 'react'; 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const VARIABLE_OPTIONS = [
  // Contaminantes  ---
 
  { value: 'PM2.5', label: 'PM2.5 (Finas)', unit: 'µg/m³', color: '#10B981' }, 
  { value: 'PM10', label: 'PM10 (Gruesas)', unit: 'µg/m³', color: '#F59E0B' },
  { value: 'CO', label: 'CO (Monóxido)', unit: 'ppm', color: '#6B7280' },
  { value: 'SO2', label: 'SO₂ (Azufre)', unit: 'ppb', color: '#EAB308' },
  { value: 'NO2', label: 'NO₂ (Nitrógeno)', unit: 'ppb', color: '#EF4444' },
  { value: 'O3', label: 'O₃ (Ozono)', unit: 'ppb', color: '#3B82F6' },
  
  // Clima 

  { value: 'Temperatura', label: 'Temperatura', unit: '°C', color: '#F97316' }, 
  { value: 'Humedad', label: 'Humedad', unit: '%', color: '#06B6D4' },
  { value: 'Velocidad Viento', label: 'Velocidad Viento', unit: 'm/s', color: '#8B5CF6' }
];

const MeasurementsChart = ({ data = [] }) => {
  
  const [selectedVar, setSelectedVar] = useState('PM2.5');
  const currentConfig = VARIABLE_OPTIONS.find(opt => opt.value === selectedVar) || VARIABLE_OPTIONS[0];
  const chartData = useMemo(() => {
    // Protección para que no falle si data es null
    if (!data) return [];
    return data.filter(d => d.variable === selectedVar);
  }, [data, selectedVar]);

  //  CONDICIÓN DE SALIDA
  if (!data || data.length === 0) {
    return (
      <div className="h-80 bg-white rounded-lg border border-gray-100 p-6 flex items-center justify-center">
        <p className="text-gray-400">No hay datos históricos disponibles</p>
      </div>
    );
  }

  // Formato de hora eje X
  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) { return isoString; }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg">
          <p className="text-xs text-gray-500 mb-1">{new Date(label).toLocaleString()}</p>
          <p className="text-sm font-bold" style={{ color: currentConfig.color }}>
            {`${currentConfig.label}: ${payload[0].value} ${currentConfig.unit}`}
          </p>
        </div>
      );
    }
    return null;
  };

  console.log("VARIABLES DISPONIBLES:", [...new Set(data.map(d => d.variable))]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Tendencia Histórica</h2>
        
        <select 
          value={selectedVar}
          onChange={(e) => setSelectedVar(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer"
        >
          {VARIABLE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={formatTime} 
              tick={{ fontSize: 12, fill: '#9CA3AF' }} 
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            
            <YAxis 
              tick={{ fontSize: 12, fill: '#9CA3AF' }} 
              axisLine={false}
              tickLine={false}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: currentConfig.color, strokeWidth: 1, strokeDasharray: '4 4' }} />
            
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={currentConfig.color} 
              strokeWidth={3} 
              dot={{ r: 4, fill: currentConfig.color, strokeWidth: 0 }} 
              activeDot={{ r: 6 }} 
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {chartData.length === 0 && (
        <p className="text-center text-xs text-red-400 mt-2">
          No hay datos para "{selectedVar}".
        </p>
      )}
    </div>
  );
};

export default MeasurementsChart;