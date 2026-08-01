import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required.');
}
const JWT_SECRET = process.env.JWT_SECRET;

export async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHENTICATED', message: 'Token autentikasi tidak ditemukan.' },
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHENTICATED', message: 'User tidak ditemukan.' },
      });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHENTICATED', message: 'Token tidak valid atau sudah expired.' },
    });
  }
}
