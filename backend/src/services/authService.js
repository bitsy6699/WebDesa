import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';
import { logAction } from './activityLogService.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export async function login(username, password, ipAddress) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    throw Object.assign(new Error('Username atau password salah.'), { statusCode: 401 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw Object.assign(new Error('Username atau password salah.'), { statusCode: 401 });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  await logAction(user.id, 'login', user.id, 'User', ipAddress);

  return { token, user: { id: user.id, username: user.username } };
}

export async function logout(user, ipAddress) {
  await logAction(user.id, 'logout', user.id, 'User', ipAddress);
}

export async function getProfile(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true, createdAt: true },
  });
  return user;
}

export async function updateProfile(userId, username) {
  const existing = await prisma.user.findFirst({ where: { username, NOT: { id: userId } } });
  if (existing) {
    throw Object.assign(new Error('Username sudah digunakan.'), { statusCode: 422 });
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { username },
    select: { id: true, username: true },
  });
  return user;
}

export async function updatePassword(userId, currentPassword, newPassword) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) {
    throw Object.assign(new Error('Password saat ini salah.'), { statusCode: 422 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({ where: { id: userId }, data: { password: hashedPassword } });
}
