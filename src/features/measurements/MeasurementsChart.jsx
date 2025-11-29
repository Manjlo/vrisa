import React from 'react';
import ChartWrapper from 'src/components/shared/ChartWrapper';
import { useMeasurements } from './hooks/useMeasurements';

const MeasurementsChart = ({ stationId = "ST001", variable = "PM25" }) => {
  const { data, loading } = useMeasurements(stationId);

   if (loading) return <p>Cargando...</p>;

  const serie = data.find(m => m.variable === variable);

  if (!serie) return <p>No hay mediciones para {variable}</p>;

   const chartData = serie.values.map(v => ({
    name: new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    value: v.value
  }));

  return (
    <div
      style={{
        background: "#FFF",
        borderRadius: "12px",
        padding: "20px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      <h3
        style={{
          marginBottom: "16px",
          fontSize: "18px",
          fontWeight: "600",
          color: "#111827",
        }}
      >
        {variable} – Serie Temporal
      </h3>

      <ChartWrapper
        data={chartData}
        dataKey="value"
        nameKey="name"
        stroke="#3B82F6"
        strokeWidth={2}
        dot={{ r: 4, fill: "#3B82F6" }}
        tooltipBg="#f9fafb"
      />
    </div>
  );
};

export default MeasurementsChart;
