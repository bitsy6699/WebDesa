import prisma from '../config/database.js';

export async function logAction(userId, action, subjectId = null, subjectType = null, ipAddress = '127.0.0.1') {
  return prisma.activityLog.create({
    data: { userId, action, subjectId, subjectType, ipAddress },
  });
}

const SUBJECT_TITLES = {
  Potential: (ids) => prisma.potential.findMany({ where: { id: { in: ids } }, select: { id: true, title: true } }),
  Media: (ids) => prisma.media.findMany({ where: { id: { in: ids } }, select: { id: true, filename: true } }),
  Category: (ids) => prisma.category.findMany({ where: { id: { in: ids } }, select: { id: true, label: true } }),
  User: (ids) => prisma.user.findMany({ where: { id: { in: ids } }, select: { id: true, username: true } }),
};

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

  const subjectMap = new Map();
  const byType = new Map();
  for (const log of data) {
    if (!log.subjectId || !log.subjectType) continue;
    if (!byType.has(log.subjectType)) byType.set(log.subjectType, []);
    byType.get(log.subjectType).push(log.subjectId);
  }
  await Promise.all([...byType.entries()].map(async ([type, ids]) => {
    const resolver = SUBJECT_TITLES[type];
    if (!resolver) return;
    const rows = await resolver(ids);
    for (const row of rows) subjectMap.set(`${type}:${row.id}`, row.title ?? row.filename ?? row.label ?? row.username);
  }));

  return {
    data: data.map((log) => ({
      ...log,
      subjectTitle: log.subjectId && log.subjectType ? subjectMap.get(`${log.subjectType}:${log.subjectId}`) ?? null : null,
    })),
    total,
    currentPage: page,
    perPage,
    lastPage: Math.ceil(total / perPage),
  };
}
