import { Prisma } from '@prisma/client';

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: `Route ${req.method} ${req.originalUrl} tidak ditemukan.` },
  });
}

export function errorHandler(err, req, res, _next) {
  if (err.name === 'MulterError') {
    const message = err.code === 'LIMIT_FILE_SIZE'
      ? 'Ukuran file melebihi batas maksimal 5 MB.'
      : 'Gagal mengunggah file.';
    return res.status(400).json({
      success: false,
      error: { code: 'UPLOAD_FAILED', message },
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const mapping = {
      P2002: { status: 409, code: 'DUPLICATE_ENTRY', message: 'Data dengan nilai unik sudah ada.' },
      P2003: { status: 409, code: 'RELATION_CONSTRAINT', message: 'Data masih digunakan oleh data lain.' },
      P2014: { status: 409, code: 'RELATION_CONSTRAINT', message: 'Perubahan akan memutus relasi data yang ada.' },
      P2025: { status: 404, code: 'NOT_FOUND', message: 'Data tidak ditemukan.' },
    };
    const mapped = mapping[err.code];
    if (mapped) {
      return res.status(mapped.status).json({
        success: false,
        error: { code: mapped.code, message: mapped.message },
      });
    }
  }

  if (err.name === 'ValidationError') {
    return res.status(422).json({
      success: false,
      error: { code: 'VALIDATION_FAILED', message: err.message, details: err.details },
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHENTICATED', message: 'Token tidak valid.' },
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHENTICATED', message: 'Token sudah expired.' },
    });
  }

  const statusCode = err.statusCode || 500;
  const message = statusCode >= 500 ? 'Terjadi kesalahan pada server.' : (err.message || 'Terjadi kesalahan pada server.');

  if (statusCode >= 500) {
    console.error('Error:', err);
  }

  res.status(statusCode).json({
    success: false,
    error: { code: err.errorCode || (statusCode >= 500 ? 'SERVER_ERROR' : 'REQUEST_FAILED'), message },
  });
}
