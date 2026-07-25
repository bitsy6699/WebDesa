import prisma from '../config/database.js';
import { generateSlug } from '../utils/slug.js';
import { logAction } from './activityLogService.js';
import { resolveMediaUrl } from './mediaService.js';

export async function list({ search, category, featured, status, sort, page, perPage }) {
  const where = { deletedAt: null };

  if (search && search.length >= 3) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (category) {
    where.category = { slug: category };
  }
  if (featured === true || featured === 'true') {
    where.isFeatured = true;
  }
  if (status) {
    where.status = status;
  }

  const orderBy = {};
  switch (sort) {
    case 'oldest': orderBy.createdAt = 'asc'; break;
    case 'name': orderBy.title = 'asc'; break;
    case 'featured': orderBy.isFeatured = 'desc'; break;
    default: orderBy.createdAt = 'desc';
  }

  const [data, total] = await Promise.all([
    prisma.potential.findMany({
      where,
      include: {
        category: { select: { id: true, label: true, slug: true, iconKey: true, colorCode: true } },
        coverImage: { select: { id: true, filepath: true } },
        location: true,
      },
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.potential.count({ where }),
  ]);

  const formatted = data.map(formatPotentialSummary);

  return {
    data: formatted,
    total,
    currentPage: page,
    perPage,
    lastPage: Math.ceil(total / perPage),
  };
}

export async function findBySlug(categorySlug, slug) {
  const potential = await prisma.potential.findFirst({
    where: { slug, deletedAt: null, category: { slug: categorySlug } },
    include: {
      category: { select: { id: true, label: true, slug: true, iconKey: true, colorCode: true } },
      coverImage: { select: { id: true, filepath: true } },
      location: true,
      gallery: {
        include: { media: { select: { id: true, filepath: true } } },
        orderBy: { sortOrder: 'asc' },
      },
      creator: { select: { id: true, username: true } },
    },
  });

  if (!potential) return null;
  return formatPotentialDetail(potential);
}

export async function findById(id) {
  return prisma.potential.findUnique({
    where: { id },
    include: {
      category: true,
      coverImage: true,
      location: true,
      gallery: { include: { media: true }, orderBy: { sortOrder: 'asc' } },
      creator: { select: { id: true, username: true } },
    },
  });
}

export async function create(data, userId, ipAddress) {
  const slug = await generateSlug(data.title);

  const potential = await prisma.$transaction(async (tx) => {
    const location = await tx.location.create({
      data: {
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
        dusun: data.dusun || null,
      },
    });

    const potential = await tx.potential.create({
      data: {
        categoryId: data.category_id,
        title: data.title,
        slug,
        description: data.description,
        status: data.status || 'draft',
        coverImageId: data.cover_image_id || null,
        locationId: location.id,
        metadata: data.metadata || null,
        isFeatured: data.is_featured || false,
        createdById: userId,
      },
    });

    if (data.gallery && data.gallery.length > 0) {
      const galleryData = data.gallery.map((mediaId, index) => ({
        potentialId: potential.id,
        mediaId,
        sortOrder: index,
      }));
      await tx.potentialMedia.createMany({ data: galleryData });
    }

    return potential;
  });

  await logAction(userId, 'create_potential', potential.id, 'Potential', ipAddress);
  return potential;
}

export async function update(id, data, userId, ipAddress) {
  const existing = await prisma.potential.findUnique({ where: { id } });
  if (!existing) throw Object.assign(new Error('Potensi tidak ditemukan.'), { statusCode: 404 });

  const slug = data.title !== existing.title
    ? await generateSlug(data.title, id)
    : existing.slug;

  await prisma.$transaction(async (tx) => {
    await tx.location.update({
      where: { id: existing.locationId },
      data: {
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
        dusun: data.dusun || null,
      },
    });

    await tx.potential.update({
      where: { id },
      data: {
        categoryId: data.category_id,
        title: data.title,
        slug,
        description: data.description,
        status: data.status,
        coverImageId: data.cover_image_id || null,
        metadata: data.metadata || null,
        isFeatured: data.is_featured ?? existing.isFeatured,
      },
    });

    if (data.gallery) {
      await tx.potentialMedia.deleteMany({ where: { potentialId: id } });
      if (data.gallery.length > 0) {
        const galleryData = data.gallery.map((mediaId, index) => ({
          potentialId: id,
          mediaId,
          sortOrder: index,
        }));
        await tx.potentialMedia.createMany({ data: galleryData });
      }
    }
  });

  await logAction(userId, 'update_potential', id, 'Potential', ipAddress);
  return prisma.potential.findUnique({ where: { id } });
}

export async function remove(id, userId, ipAddress) {
  const existing = await prisma.potential.findUnique({ where: { id } });
  if (!existing) throw Object.assign(new Error('Potensi tidak ditemukan.'), { statusCode: 404 });

  await prisma.potential.update({ where: { id }, data: { deletedAt: new Date() } });
  await logAction(userId, 'delete_potential', id, 'Potential', ipAddress);
}

export async function toggleFeatured(id, userId, ipAddress) {
  const existing = await prisma.potential.findUnique({ where: { id } });
  if (!existing) throw Object.assign(new Error('Potensi tidak ditemukan.'), { statusCode: 404 });

  const updated = await prisma.potential.update({
    where: { id },
    data: { isFeatured: !existing.isFeatured },
  });

  await logAction(userId, 'toggle_featured', id, 'Potential', ipAddress);
  return updated;
}

function formatPotentialSummary(p) {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    short_description: p.description?.substring(0, 120) + (p.description?.length > 120 ? '...' : ''),
    cover_image_url: p.coverImage ? resolveMediaUrl(p.coverImage.filepath) : null,
    location: {
      latitude: Number(p.location.latitude),
      longitude: Number(p.location.longitude),
      address: p.location.address,
      dusun: p.location.dusun,
    },
    is_featured: p.isFeatured,
    status: p.status,
    created_at: p.createdAt,
  };
}

function formatPotentialDetail(p) {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    category: p.category,
    cover_image_url: p.coverImage ? resolveMediaUrl(p.coverImage.filepath) : null,
    gallery: p.gallery?.map((g) => resolveMediaUrl(g.media.filepath)) || [],
    location: {
      latitude: Number(p.location.latitude),
      longitude: Number(p.location.longitude),
      address: p.location.address,
      dusun: p.location.dusun,
    },
    metadata: p.metadata,
    is_featured: p.isFeatured,
    status: p.status,
    created_at: p.createdAt,
  };
}
