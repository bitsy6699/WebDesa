export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: `Route ${req.method} ${req.originalUrl} tidak ditemukan.` },
  });
}

export function errorHandler(err, req, res, _next) {
  console.error('Error:', err);

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
  const message = err.message || 'Terjadi kesalahan pada server.';

  res.status(statusCode).json({
    success: false,
    error: { code: err.errorCode || 'SERVER_ERROR', message },
  });
}
