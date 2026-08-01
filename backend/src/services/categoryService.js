import prisma from '../config/database.js';

export async function all() {
  return prisma.category.findMany({
    include: { schema: true },
    orderBy: { label: 'asc' },
  });
}

export async function create(data) {
  return prisma.category.create({
    data: {
      label: data.label,
      slug: data.slug,
      description: data.description ?? null,
      iconKey: data.iconKey ?? data.icon_key ?? null,
      colorCode: data.colorCode ?? data.color_code ?? null,
    },
  });
}

export async function update(id, data) {
  const iconKey = data.iconKey ?? data.icon_key;
  const colorCode = data.colorCode ?? data.color_code;

  return prisma.category.update({
    where: { id },
    data: {
      ...(data.label !== undefined && { label: data.label }),
      ...(data.slug !== undefined && { slug: data.slug }),
      ...(data.description !== undefined && { description: data.description }),
      ...(iconKey !== undefined && { iconKey }),
      ...(colorCode !== undefined && { colorCode }),
    },
  });
}

export async function remove(id) {
  const [potentialCount, schemaCount] = await Promise.all([
    prisma.potential.count({ where: { categoryId: id } }),
    prisma.categorySchema.count({ where: { categoryId: id } }),
  ]);

  if (potentialCount > 0 && schemaCount > 0) {
    throw Object.assign(new Error(`Tidak bisa menghapus kategori karena masih dipakai ${potentialCount} potensi dan ${schemaCount} skema.`), { statusCode: 409 });
  }
  if (potentialCount > 0) {
    throw Object.assign(new Error(`Tidak bisa menghapus kategori yang masih memiliki ${potentialCount} data potensi.`), { statusCode: 409 });
  }
  if (schemaCount > 0) {
    throw Object.assign(new Error(`Tidak bisa menghapus kategori yang masih memiliki ${schemaCount} skema.`), { statusCode: 409 });
  }
  return prisma.category.delete({ where: { id } });
}

export async function findById(id) {
  return prisma.category.findUnique({ where: { id }, include: { schema: true } });
}
