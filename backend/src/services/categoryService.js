import prisma from '../config/database.js';

export async function all() {
  return prisma.category.findMany({
    include: { schema: true },
    orderBy: { label: 'asc' },
  });
}

export async function create(data) {
  return prisma.category.create({ data });
}

export async function update(id, data) {
  return prisma.category.update({ where: { id }, data });
}

export async function remove(id) {
  const potentialCount = await prisma.potential.count({ where: { categoryId: id } });
  if (potentialCount > 0) {
    throw Object.assign(new Error('Tidak bisa menghapus kategori yang masih memiliki data potensi.'), { statusCode: 422 });
  }
  return prisma.category.delete({ where: { id } });
}

export async function findById(id) {
  return prisma.category.findUnique({ where: { id }, include: { schema: true } });
}
