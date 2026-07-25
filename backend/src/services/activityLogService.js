import prisma from '../config/database.js';

export async function logAction(userId, action, subjectId = null, subjectType = null, ipAddress = '127.0.0.1') {
  return prisma.activityLog.create({
    data: { userId, action, subjectId, subjectType, ipAddress },
  });
}

export async function list(action = null, page = 1, perPage = 12) {
  const where = action ? { action } : {};

  const [data, total] = await Promise.all([
    prisma.activityLog.findMany({
      where,
      include: { user: { select: { id: true, username: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.activityLog.count({ where }),
  ]);

  return { data, total, currentPage: page, perPage, lastPage: Math.ceil(total / perPage) };
}
