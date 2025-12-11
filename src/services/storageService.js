import { supabase } from 'src/api/supabaseClient';

/**
 * Uploads a file to a Supabase storage bucket.
 * @param {string} bucketName The name of the bucket.
 * @param {string} filePath The path and filename for the file.
 * @param {File} file The file to upload.
 * @returns {Promise<string>} The public URL of the uploaded file.
 */
export const uploadFile = async (bucketName, filePath, file) => {
  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, { upsert: true }); // upsert: true overwrites the file if it exists

  if (uploadError) {
    throw new Error(`Storage upload error: ${uploadError.message}`);
  }

  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  if (!data || !data.publicUrl) {
    throw new Error('Could not get public URL for the uploaded file.');
  }

  return data.publicUrl;
};
