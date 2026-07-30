import { createClient } from '@supabase/supabase-js';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';
const BUCKET_NAME = process.env.SUPABASE_STORAGE_BUCKET || 'webdesa-media';

function hasSupabase() {
  return !!(SUPABASE_URL && SUPABASE_SERVICE_KEY);
}

function getClient() {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
}

function getPublicUrl(path) {
  const url = process.env.SUPABASE_URL || '';
  return `${url}/storage/v1/object/public/${BUCKET_NAME}/${path}`;
}

export async function uploadFile(buffer, filename, contentType) {
  if (hasSupabase()) {
    const client = getClient();
    const filePath = `media/${filename}`;

    const { error } = await client.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, { contentType, upsert: true });

    if (error) throw new Error(`Supabase upload failed: ${error.message}`);

    return { filePath, publicUrl: getPublicUrl(filePath) };
  }

  const uploadsDir = join(__dirname, '..', '..', 'uploads', 'media');
  await mkdir(uploadsDir, { recursive: true });
  const filePath = join(uploadsDir, filename);
  await writeFile(filePath, buffer);

  return { filePath: `media/${filename}`, publicUrl: null };
}

export async function deleteFile(filePath) {
  if (hasSupabase()) {
    const client = getClient();

    const { error } = await client.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error && !error.message.includes('not found')) {
      throw new Error(`Supabase delete failed: ${error.message}`);
    }
    return;
  }

  const fullPath = join(__dirname, '..', '..', 'uploads', filePath);
  try {
    await unlink(fullPath);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
}

export function getMediaUrl(filePath) {
  if (!filePath) return null;
  if (filePath.startsWith('http')) return filePath;
  if (hasSupabase()) {
    return getPublicUrl(filePath);
  }
  return `/uploads/${filePath}`;
}
