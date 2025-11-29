import React from "react";
import { useMeasurements } from "./hooks/useMeasurements";

export default function MeasurementsCards({ stationId = "ST001" }) {
  const { data, loading } = useMeasurements(stationId);

  if (loading) return <p>Cargando...</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "16px",
      }}
    >
      {data.map((serie) => {
        const last = serie.values[serie.values.length - 1];

        return (
          <div
            key={serie.variable}
            style={{
              background: "#FFF",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #E5E7EB",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <h4
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: "600",
                color: "#111827",
              }}
            >
              {serie.variable}
            </h4>

            <p
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#3B82F6",
                margin: "8px 0 0 0",
              }}
            >
              {last.value} {serie.unit}
            </p>

            <small style={{ color: "#6B7280" }}>
              {new Date(last.timestamp).toLocaleString()}
            </small>
          </div>
        );
      })}
    </div>
  );
}
