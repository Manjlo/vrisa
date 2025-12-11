// src/components/vrisa/utils/aqiHelper.js
export const getAqiInfo = (pm25, status) => {
  if (status !== 'online' || pm25 === undefined) {
    return { level: 'Desconocido', color: 'gray', textColor: 'white' };
  }

  if (pm25 <= 12) return { level: 'Buena', color: '#00e400', textColor: 'black' };
  if (pm25 <= 35.4) return { level: 'Moderada', color: '#ffff00', textColor: 'black' };
  if (pm25 <= 55.4) return { level: 'Dañina a Grupos Sensibles', color: '#ff7e00', textColor: 'black' };
  if (pm25 <= 150.4) return { level: 'Dañina', color: '#ff0000', textColor: 'white' };
  if (pm25 <= 250.4) return { level: 'Muy Dañina', color: '#8f3f97', textColor: 'white' };
  return { level: 'Peligrosa', color: '#7e0023', textColor: 'white' };
};
