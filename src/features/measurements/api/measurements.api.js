import mockData from "../mocks/mock_measurements.json";

export function getMeasurementsByStation(stationId) {
  const station = mockData.stations.find(s => s.station_id === stationId);
  return station ? station.measurements : [];
}
