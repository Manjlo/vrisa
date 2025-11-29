import { useState, useEffect } from "react";
import { getMeasurementsByStation } from "../api/measurements.api";

export function useMeasurements(stationId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const result = getMeasurementsByStation(stationId);
    setData(result);
    setLoading(false);
  }, [stationId]);

  return { data, loading };
}
