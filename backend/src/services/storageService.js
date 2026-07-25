import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';
const BUCKET_NAME = process.env.SUPABASE_STORAGE_BUCKET || 'webdesa-media';

function getClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY must be set');
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
}

function getPublicUrl(path) {
  const url = process.env.SUPABASE_URL || '';
  return `${url}/storage/v1/object/public/${BUCKET_NAME}/${path}`;
}

export async function uploadFile(buffer, filename, contentType) {
  const client = getClient();
  const filePath = `media/${filename}`;

  const { error } = await client.storage
    .from(BUCKET_NAME)
    .upload(filePath, buffer, { contentType, upsert: true });

  if (error) throw new Error(`Supabase upload failed: ${error.message}`);

  return { filePath, publicUrl: getPublicUrl(filePath) };
}

export async function deleteFile(filePath) {
  const client = getClient();

  const { error } = await client.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (error && !error.message.includes('not found')) {
    throw new Error(`Supabase delete failed: ${error.message}`);
  }
}

export function getMediaUrl(filePath) {
  if (!filePath) return null;
  if (filePath.startsWith('http')) return filePath;
  return getPublicUrl(filePath);
}
