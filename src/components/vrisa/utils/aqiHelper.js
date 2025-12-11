// src/components/vrisa/utils/aqiHelper.js
export const getAqiInfo = (pm25) => {
  // Si no hay un valor numérico, el estado es desconocido.
  if (typeof pm25 !== 'number' || pm25 < 0) {
    return { level: 'Desconocido', color: '#a8a8a8', textColor: 'white' };
  }

  if (pm25 <= 12) return { level: 'Buena', color: '#45e50d', textColor: 'black' };
  if (pm25 <= 35.4) return { level: 'Moderada', color: '#f0e100', textColor: 'black' };
  if (pm25 <= 55.4) return { level: 'Dañina (GS)', color: '#ff8c00', textColor: 'black' };
  if (pm25 <= 150.4) return { level: 'Dañina', color: '#ff0000', textColor: 'white' };
  if (pm25 <= 250.4) return { level: 'Muy Dañina', color: '#99004c', textColor: 'white' };
  return { level: 'Peligrosa', color: '#7e0023', textColor: 'white' };
};
