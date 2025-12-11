import { supabase } from 'src/api/supabaseClient';

/**
 * Fetches all station data by calling the 'get_station_data' RPC function.
 * @returns {Promise<Array<object>>} A list of stations with their latest measurements.
 */
export const getStationsData = async () => {
  const { data, error } = await supabase.rpc('get_station_data');

  if (error) {
    console.error('Error fetching station data:', error);
    throw new Error(error.message);
  }

  return data;
};

/**
 * Fetches the historical measurement data for a specific station.
 * @param {number} stationId The ID of the station.
 * @returns {Promise<Array<object>>} A list of historical measurements.
 */
export const getStationHistory = async (stationId) => {
  if (!stationId) throw new Error('Station ID is required.');

  const { data, error } = await supabase.rpc('get_station_history_full_qa', {
    p_estacion_id: stationId,
  });

  if (error) {
    console.error('Error fetching station history:', error);
    throw new Error(error.message);
  }

  return data;
};