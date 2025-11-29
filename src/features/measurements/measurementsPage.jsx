import React from "react";
import MeasurementsCards from "./MeasurementsCards";
import MeasurementsChart from "./MeasurementsChart";
import MeasurementsTable from "./MeasurementsTable";

const MeasurementsPage = ({ stationId = "ST001" }) => {
  return (
    <div style={{ padding: "24px", display: "grid", gap: "24px" }}>
      <MeasurementsCards stationId={stationId} />
      <MeasurementsChart stationId={stationId} variable="PM25" />
      <MeasurementsTable stationId={stationId} />
    </div>
  );
};

export default MeasurementsPage;
