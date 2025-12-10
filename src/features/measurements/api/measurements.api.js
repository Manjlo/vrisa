import mockData from '../mocks/mock_measurements.json';

// Simular retraso de red (para que parezca real)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Obtiene el estado actual de la estación 
 
 */
export const getLatestMeasurements = async (stationId) => {
  // Simulamos una espera de medio segundo
  await delay(500);

  // A. Creamos una COPIA de los datos base del JSON.
  // Usamos {...} para no modificar el archivo original, sino trabajar sobre una copia temporal.
  let responseData = { ...mockData.latest };

  // B. Buscamos en la lista de estaciones cuál fue la que seleccionó el usuario.
  // "Number(stationId)" asegura que comparemos número con número (ej: 3 === 3).
  const stationInfo = mockData.stations_list.find(s => s.id === Number(stationId));

  // C. Si encontramos la estación en la lista, actualizamos la copia de los datos.
  if (stationInfo) {
    // Sobrescribimos el nombre y el estado para que coincidan con los que se ve en la lista.
    responseData.station_name = stationInfo.name;
    responseData.status = stationInfo.status; // 
    
    // D. Lógica Extra: Si la estación está "Offline", hacemos que los sensores se vean apagados.
    if (stationInfo.status === 'offline') {
       // Recorremos los sensores y les ponemos valor 0 y color gris.
       responseData.sensors = responseData.sensors.map(s => ({
         ...s, 
         value: "--",
         color: 'gray' // Esto hará que la tarjeta se vea gris en pantalla
       }));
    }
  }
  // Devolvemos los datos ya modificados y corregidos
  return responseData;
}
/**
 * Obtiene el historial de mediciones (Para la Tabla y Gráfica)
 */
export const getHistory = async (stationId) => {
  await delay(800); 
  return mockData.history;
};

  /**
 * Obtiene la lista de todas las estaciones (Para la vista general)
 */
export const getAllStations = async () => {
  await delay(300);
  return mockData.stations_list;
};
