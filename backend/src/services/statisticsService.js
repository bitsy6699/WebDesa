import prisma from '../config/database.js';

export async function getSummary() {
  const where = { status: 'published', deletedAt: null };

  const [
    totalPotentials,
    totalDraftPotentials,
    totalAllPotentials,
    totalArchivedPotentials,
    totalFeatured,
    totalCategories,
  ] = await Promise.all([
    prisma.potential.count({ where }),
    prisma.potential.count({ where: { status: 'draft', deletedAt: null } }),
    prisma.potential.count({ where: { deletedAt: null } }),
    prisma.potential.count({ where: { status: 'archived', deletedAt: null } }),
    prisma.potential.count({ where: { ...where, isFeatured: true } }),
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

  const categories = await prisma.category.findMany({
    select: {
      label: true,
      _count: {
        select: { potentials: { where: { status: 'published', deletedAt: null } } },
      },
    },
  });

  const categoryDistribution = categories
    .map((c) => ({ label: c.label, count: c._count.potentials }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const dusunDistributionResult = await prisma.$queryRaw`
    SELECT l.dusun as dusun, COUNT(p.id)::int as count
    FROM potentials p
    JOIN locations l ON p.location_id = l.id
    WHERE p.status = 'published' AND p.deleted_at IS NULL AND l.dusun IS NOT NULL
    GROUP BY l.dusun
    ORDER BY count DESC
    LIMIT 6
  `;

  const dusunDistribution = dusunDistributionResult.map((row) => ({
    dusun: row.dusun,
    count: Number(row.count),
  }));

  return {
    total_potentials: totalPotentials,
    total_draft: totalDraftPotentials,
    total_all: totalAllPotentials,
    total_archived: totalArchivedPotentials,
    total_featured: totalFeatured,
    total_umkm: totalUmkm,
    total_categories: totalCategories,
    total_dusun: totalDusun,
    category_distribution: categoryDistribution,
    dusun_distribution: dusunDistribution,
  };
}
