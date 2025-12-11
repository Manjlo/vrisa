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