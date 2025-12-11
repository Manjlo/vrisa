import { supabase } from 'src/api/supabaseClient';

/**
 * Fetches the user profile from the 'usuario' table.
 * @param {string} userId The UUID of the user.
 * @returns {Promise<object>} The user profile data.
 */
export const getProfile = async (userId) => {
  if (!userId) throw new Error('User ID is required.');

  const { data, error } = await supabase
    .from('usuario')
    .select('*')
    .eq('usuario_id', userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Updates the user profile in the 'usuario' table.
 * @param {string} userId The UUID of the user.
 * @param {object} updates An object with the fields to update.
 * @returns {Promise<object>} The updated user profile data.
 */
export const updateProfile = async (userId, updates) => {
  if (!userId) throw new Error('User ID is required.');

  const { data, error } = await supabase
    .from('usuario')
    .update(updates)
    .eq('usuario_id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
