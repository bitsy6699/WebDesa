import prisma from '../config/database.js';
import { logAction } from './activityLogService.js';

export async function all() {
  const settings = await prisma.setting.findMany({ orderBy: { key: 'asc' } });
  return settings;
}

export async function get(key) {
  const setting = await prisma.setting.findUnique({ where: { key } });
  return setting?.value || null;
}

export async function update(settings, ipAddress) {
  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value || '' },
      create: { key: s.key, value: s.value || '', type: s.type || 'string', group: s.group || 'general' },
    });
  }

  await logAction(null, 'update_settings', null, 'Setting', ipAddress);
}

export async function getGroup(group) {
  return prisma.setting.findMany({ where: { group }, orderBy: { key: 'asc' } });
}
