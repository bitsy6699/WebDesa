import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/database.js';
import { logAction } from './activityLogService.js';
import { uploadFile, deleteFile } from './storageService.js';
import { MEDIA_MAX_IMAGE_WIDTH, MEDIA_WEBP_QUALITY } from '../config/constants.js';

export async function list(page = 1, perPage = 12) {
  const [data, total] = await Promise.all([
    prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.media.count(),
  ]);

  const formatted = data.map((m) => ({
    ...m,
    filepath: resolveMediaUrl(m.filepath),
    filesize: Number(m.filesize),
  }));

  return { data: formatted, total, currentPage: page, perPage, lastPage: Math.ceil(total / perPage) };
}

export async function upload(file, userId, ipAddress) {
  const filename = `media_${uuidv4()}.webp`;

  const buffer = await sharp(file.buffer)
    .resize(MEDIA_MAX_IMAGE_WIDTH, null, { withoutEnlargement: true })
    .webp({ quality: MEDIA_WEBP_QUALITY })
    .toBuffer();

  const { filePath } = await uploadFile(buffer, filename, 'image/webp');

  const media = await prisma.media.create({
    data: {
      filename: file.originalname,
      filepath: filePath,
      filetype: 'image/webp',
      filesize: file.size,
    },
  });

  await logAction(userId, 'upload_media', media.id, 'Media', ipAddress);
  return media;
}

export async function remove(id, userId, ipAddress) {
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) throw Object.assign(new Error('Media tidak ditemukan.'), { statusCode: 404 });

  const inUse = await prisma.potential.findFirst({
    where: { OR: [{ coverImageId: id }, { gallery: { some: { mediaId: id } } }] },
  });
  if (inUse) {
    throw Object.assign(new Error('Media masih digunakan oleh data potensi.'), { statusCode: 422 });
  }

  await deleteFile(media.filepath);
  await prisma.media.delete({ where: { id } });

  await logAction(userId, 'delete_media', id, 'Media', ipAddress);
}

export function resolveMediaUrl(filepath) {
  if (!filepath) return null;
  if (filepath.startsWith('http')) return filepath;

  const supabaseUrl = process.env.SUPABASE_URL;
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'webdesa-media';
  if (supabaseUrl) {
    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${filepath}`;
  }

  return `/uploads/${filepath}`;
}
