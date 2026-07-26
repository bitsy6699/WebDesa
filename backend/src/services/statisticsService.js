import prisma from '../config/database.js';

export async function getSummary() {
  const where = { status: 'published', deletedAt: null };

  const [totalPotentials, totalDraftPotentials, totalAllPotentials, totalCategories] = await Promise.all([
    prisma.potential.count({ where }),
    prisma.potential.count({ where: { status: 'draft', deletedAt: null } }),
    prisma.potential.count({ where: { deletedAt: null } }),
    prisma.category.count(),
  ]);

  const dusunResult = await prisma.$queryRaw`
    SELECT COUNT(DISTINCT l.dusun) as count
    FROM potentials p
    JOIN locations l ON p.location_id = l.id
    WHERE p.status = 'published' AND p.deleted_at IS NULL AND l.dusun IS NOT NULL
  `;
  const totalDusun = Number(dusunResult[0]?.count || 0);

  const umkmWhere = { ...where, category: { slug: 'umkm' } };
  const totalUmkm = await prisma.potential.count({ where: umkmWhere });

  return {
    total_potentials: totalPotentials,
    total_draft: totalDraftPotentials,
    total_all: totalAllPotentials,
    total_umkm: totalUmkm,
    total_categories: totalCategories,
    total_dusun: totalDusun,
  };
}
