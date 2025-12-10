import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MeasurementsChart = ({ data }) => {
  // 1. Si no hay datos, mostramos mensaje vacío
  if (!data || data.length === 0) {
    return (
      <div className="h-80 bg-white rounded-lg border border-gray-100 p-6 flex items-center justify-center">
        <p className="text-gray-400">No hay datos históricos disponibles</p>
      </div>
    );
  }

  // 2. PREPARACIÓN DE DATOS
  // Tus datos vienen mezclados (PM2.5, PM10, etc.). 
  // Para esta gráfica inicial, filtraremos solo "PM2.5" para que se vea limpia.
  const chartData = data.filter(d => d.variable === 'PM2.5');

  // Función para que la hora en el eje X se vea bonita (ej: "14:00")
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Tendencia Histórica</h2>
        
        {/* Selector simple (visual por ahora) */}
        <select className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
          <option value="PM2.5">PM2.5</option>
          <option value="PM10">PM10</option>
          <option value="O3">O3</option>
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
            
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              cursor={{ stroke: '#3B82F6', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            
            <Line 
              type="monotone" // Esto hace la curva suave
              dataKey="value" 
              stroke="#3B82F6" // Color Azul VRISA
              strokeWidth={3} 
              dot={{ r: 4, fill: '#3B82F6', strokeWidth: 0 }} 
              activeDot={{ r: 7 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MeasurementsChart;