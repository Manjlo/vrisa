// src/types/vrisa.ts

export interface Measurements {
    pm25: number;
    pm10: number;
    no2: number;
    o3: number;
    co: number;
    temperature: number;
    humidity: number;
    wind_speed: number;
}

export interface Station {
    id: string;
    name: string;
    lat: number;
    lng: number;
    address: string;
    sensorType: string;
    status: 'online' | 'offline' | 'maintenance';
    lastUpdate: string;
    measurements: Measurements;
}

export interface HistoricalData {
    date: string;
    pm25: number;
    pm10: number;
    no2: number;
}
