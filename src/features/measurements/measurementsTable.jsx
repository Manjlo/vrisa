import React from "react";
import { useMeasurements } from "./hooks/useMeasurements";

const MeasurementsTable = ({ stationId = "ST001" }) => {
  const { data, loading } = useMeasurements(stationId);

  if (loading) return <p>Cargando...</p>;

 const rows = data.flatMap((serie) =>
    serie.values.map((v) => ({
      variable: serie.variable,
      unit: serie.unit,
      value: v.value,
      timestamp: v.timestamp,
    }))
  );

  return (
    <div
      style={{
        background: "#FFF",
        padding: "20px",
        borderRadius: "12px",
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
        Histórico de Mediciones
      </h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
          color: "#111827",
        }}
      >
        <thead>
          <tr style={{ background: "#F9FAFB", textAlign: "left" }}>
            <th style={{ padding: "12px", borderBottom: "1px solid #E5E7EB" }}>
              Variable
            </th>
            <th style={{ padding: "12px", borderBottom: "1px solid #E5E7EB" }}>
              Valor
            </th>
            <th style={{ padding: "12px", borderBottom: "1px solid #E5E7EB" }}>
              Unidad
            </th>
            <th style={{ padding: "12px", borderBottom: "1px solid #E5E7EB" }}>
              Timestamp
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ padding: "12px", borderBottom: "1px solid #F3F4F6" }}>
                {r.variable}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F3F4F6" }}>
                {r.value}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F3F4F6" }}>
                {r.unit}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F3F4F6" }}>
                {new Date(r.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeasurementsTable;
