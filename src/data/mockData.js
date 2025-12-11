// src/data/mockData.js
export const stationsData = [
  {
    id: "st-001",
    name: "Estación Norte",
    lat: 3.4516,
    lng: -76.5320,
    address: "Calle 1 #1-23",
    sensorType: "Barrido PM",
    status: "online",
    lastUpdate: "2025-12-09T14:30:00Z",
    measurements: {
      pm25: 35.2,
      pm10: 58.1,
      no2: 18.5,
      o3: 12.1,
      co: 0.4,
      temperature: 27.8,
      humidity: 71,
      wind_speed: 2.4
    }
  },
  {
    id: "st-002",
    name: "Estación Centro",
    lat: 3.4372,
    lng: -76.5225,
    address: "Av. 3 #45-67",
    sensorType: "Referencia",
    status: "offline",
    lastUpdate: "2025-12-09T08:10:00Z",
    measurements: {
      pm25: 82.6,
      pm10: 120.5,
      no2: 45.3,
      o3: 30.4,
      co: 0.9,
      temperature: 28.1,
      humidity: 65,
      wind_speed: 1.9
    }
  },
  {
    id: "st-003",
    name: "Estación Pance",
    lat: 3.3418,
    lng: -76.5482,
    address: "Cerca del Río Pance",
    sensorType: "Barrido PM",
    status: "online",
    lastUpdate: "2025-12-10T14:25:00Z",
    measurements: {
      pm25: 12.5,
      pm10: 20.3,
      no2: 9.1,
      o3: 35.6,
      co: 0.2,
      temperature: 26.5,
      humidity: 75,
      wind_speed: 3.1,
    },
  },
  {
    id: "st-004",
    name: "Estación Menga",
    lat: 3.5001,
    lng: -76.5119,
    address: "Zona Industrial Yumbo",
    sensorType: "Referencia",
    status: "online",
    lastUpdate: "2025-12-10T14:32:00Z",
    measurements: {
      pm25: 155.6,
      pm10: 210.5,
      no2: 65.3,
      o3: 15.4,
      co: 1.9,
      temperature: 30.1,
      humidity: 65,
      wind_speed: 1.9,
    },
  },
];

// Simula datos históricos para los gráficos
export const getHistoricalData = (stationId) => {
  const data = [];
  const now = new Date();
  for (let i = 7; i >= 0; i--) {
    data.push({
      date: new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }),
      pm25: Math.random() * 100 + (stationId === 'st-004' ? 50 : 10),
      pm10: Math.random() * 150 + (stationId === 'st-004' ? 70 : 20),
    });
  }
  return data;
};
