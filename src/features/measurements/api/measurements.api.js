import { supabase } from '../../../api/supabaseClient';

// 1. OBTENER LISTA DE ESTACIONES
export const getAllStations = async () => {
  try {
    const { data, error } = await supabase
      .from('estacion')
      .select('*')
      .order('estacion_id');

    if (error) throw error;
    
    // Mapeamos los datos de SQL a formato React
    return data.map(s => ({
      id: s.estacion_id,
      name: s.nombre_estacion,
      status: s.estado, 
      last_reading: new Date().toLocaleTimeString() 
    }));
  } catch (error) {
    console.error("Error cargando estaciones:", error);
    return [];
  }
};

// 2. OBTENER ÚLTIMA MEDICIÓN (KPIs)
export const getLatestMeasurements = async (stationId) => {
  try {
    // A. Traer info de la estación
    const { data: station } = await supabase
      .from('estacion')
      .select('*')
      .eq('estacion_id', stationId)
      .single();

    // B. Traer la última lectura con sus sensores
    const { data: report } = await supabase
      .from('reporte_estacion')
      .select(`
        fecha_medicion,
        reporte_sensor (
          valor,
          variable ( nombre, unidad )
        )
      `)
      .eq('estacion_id', stationId)
      .order('fecha_medicion', { ascending: false })
      .limit(1)
      .single();

    // Si no hay datos, devolvemos estructura vacía
    if (!station) return null;
    if (!report) return { 
        station_name: station.nombre_estacion, 
        status: station.estado, 
        sensors: [] 
    };

    // C. Formatear para las tarjetas
    return {
      station_name: station.nombre_estacion,
      status: station.estado,
      timestamp: report.fecha_medicion,
      sensors: report.reporte_sensor.map(r => ({
        variable: r.variable.nombre,
        value: station.estado === 'offline' ? '--' : r.valor, // lógica offline
        unit: r.variable.unidad,
        color: station.estado === 'offline' ? 'gray' : (r.valor > 50 ? 'orange' : 'green')
      }))
    };

  } catch (error) {
    console.error("Error cargando última medición:", error);
    return null;
  }
};

// 3. OBTENER HISTORIAL (Gráfica y Tabla)
export const getHistory = async (stationId) => {
  try {
    const { data: reports } = await supabase
      .from('reporte_estacion')
      .select(`
        fecha_medicion,
        reporte_sensor (
          valor,
          variable ( nombre, unidad )
        )
      `)
      .eq('estacion_id', stationId)
      .order('fecha_medicion', { ascending: false })
      .limit(20);

    if (!reports) return [];

    let history = [];
    
    reports.forEach(rep => {
      rep.reporte_sensor.forEach(sensor => {
        history.push({
          timestamp: rep.fecha_medicion,
          variable: sensor.variable.nombre,
          value: sensor.valor,
          unit: sensor.variable.unidad
        });
      });
    });

    return history.reverse(); // Ordenar cronológicamente

  } catch (error) {
    console.error("Error cargando historial:", error);
    return [];
  }
};