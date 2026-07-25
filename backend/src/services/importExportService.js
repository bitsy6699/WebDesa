import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { read, write, utils } from 'xlsx';
import prisma from '../config/database.js';
import { generateSlug } from '../utils/slug.js';
import { logAction } from './activityLogService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function importPotentials(file, userId, ipAddress) {
  const workbook = read(file.buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const rows = utils.sheet_to_json(workbook.Sheets[sheetName]);

  if (rows.length === 0) {
    throw Object.assign(new Error('File kosong atau tidak ada data.'), { statusCode: 422 });
  }

  const errors = [];
  const validRows = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowNum = i + 2;

    if (!row.category_id) errors.push(`Baris ${rowNum}: category_id wajib diisi.`);
    if (!row.title) errors.push(`Baris ${rowNum}: title wajib diisi.`);

    if (errors.length === 0) {
      const category = await prisma.category.findUnique({ where: { id: row.category_id } });
      if (!category) errors.push(`Baris ${rowNum}: kategori dengan id "${row.category_id}" tidak ditemukan.`);
    }

    if (errors.length === 0) {
      validRows.push(row);
    }
  }

  if (errors.length > 0) {
    throw Object.assign(new Error('Validasi import gagal'), { statusCode: 422, details: errors });
  }

  let importedCount = 0;

  await prisma.$transaction(async (tx) => {
    for (const row of validRows) {
      const slug = await generateSlug(row.title);

      const location = await tx.location.create({
        data: {
          latitude: parseFloat(row.latitude) || 0,
          longitude: parseFloat(row.longitude) || 0,
          address: row.address || '',
          dusun: row.dusun || null,
        },
      });

      await tx.potential.create({
        data: {
          categoryId: row.category_id,
          title: row.title,
          slug,
          description: row.description || '',
          status: row.status || 'draft',
          locationId: location.id,
          isFeatured: row.is_featured === true || row.is_featured === 'true',
          metadata: row.metadata_json ? JSON.parse(row.metadata_json) : null,
          createdById: userId,
        },
      });

      importedCount++;
    }
  });

  await logAction(userId, 'import_potentials', null, 'Potential', ipAddress);
  return { imported_count: importedCount };
}

export function generateTemplate() {
  const wb = utils.book_new();

  const headers = ['category_id', 'title', 'description', 'status', 'latitude', 'longitude', 'address', 'dusun', 'is_featured', 'metadata_json'];
  const ws = utils.aoa_to_sheet([headers, ['', '', '', 'draft', '', '', '', '', false, '{}']]);
  utils.book_append_sheet(wb, ws, 'Data Potensi');

  const instructions = [
    ['Petunjuk Import Data Potensi'],
    [''],
    ['Kolom', 'Keterangan', 'Wajib', 'Contoh'],
    ['category_id', 'UUID kategori', 'Ya', 'uuid-kategori'],
    ['title', 'Judul potensi', 'Ya', 'Wisata Alam Gunung'],
    ['description', 'Deskripsi potensi', 'Ya', 'Deskripsi lengkap...'],
    ['status', 'draft/published/archived', 'Ya', 'draft'],
    ['latitude', 'Lintang', 'Ya', '-7.12345678'],
    ['longitude', 'Bujur', 'Ya', '112.12345678'],
    ['address', 'Alamat lengkap', 'Ya', 'Desa Karamatwangi'],
    ['dusun', 'Nama dusun', 'Tidak', 'Dusun Selatan'],
    ['is_featured', 'true/false', 'Tidak', 'false'],
    ['metadata_json', 'JSON metadata ACA', 'Tidak', '{}'],
  ];
  const wsInstructions = utils.aoa_to_sheet(instructions);
  utils.book_append_sheet(wb, wsInstructions, 'Petunjuk');

  return write(wb, { bookType: 'xlsx', type: 'buffer' });
}

export function exportPotentials(potentials) {
  const wb = utils.book_new();

  const data = potentials.map((p) => ({
    id: p.id,
    category_id: p.categoryId,
    title: p.title,
    description: p.description,
    status: p.status,
    latitude: Number(p.location?.latitude || 0),
    longitude: Number(p.location?.longitude || 0),
    address: p.location?.address || '',
    dusun: p.location?.dusun || '',
    is_featured: p.isFeatured,
    metadata_json: p.metadata ? JSON.stringify(p.metadata) : '{}',
    created_at: p.createdAt,
  }));

  const ws = utils.json_to_sheet(data);
  utils.book_append_sheet(wb, ws, 'Data Potensi');

  return write(wb, { bookType: 'xlsx', type: 'buffer' });
}
