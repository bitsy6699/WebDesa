export function success(res, data, message = 'Berhasil', statusCode = 200) {
  return res.status(statusCode).json({ success: true, message, data });
}

export function created(res, data, message = 'Berhasil dibuat') {
  return success(res, data, message, 201);
}

export function noContent(res) {
  return res.status(204).send();
}

export function paginated(res, data, meta) {
  return res.json({
    success: true,
    data,
    meta: {
      current_page: meta.currentPage,
      last_page: meta.lastPage,
      per_page: meta.perPage,
      total: meta.total,
    },
    links: {
      prev: meta.currentPage > 1 ? `?page=${meta.currentPage - 1}&per_page=${meta.perPage}` : null,
      next: meta.currentPage < meta.lastPage ? `?page=${meta.currentPage + 1}&per_page=${meta.perPage}` : null,
    },
  });
}

export function error(res, code = 'SERVER_ERROR', message = 'Terjadi kesalahan', statusCode = 500, details = null) {
  const body = { success: false, error: { code, message } };
  if (details) body.error.details = details;
  return res.status(statusCode).json(body);
}

export function validationError(res, errors, message = 'Validasi gagal') {
  return error(res, 'VALIDATION_FAILED', message, 422, errors);
}

export function notFound(res, message = 'Data tidak ditemukan') {
  return error(res, 'NOT_FOUND', message, 404);
}

export function unauthorized(res, message = 'Tidak terautentikasi') {
  return error(res, 'UNAUTHENTICATED', message, 401);
}

export function forbidden(res, message = 'Akses ditolak') {
  return error(res, 'FORBIDDEN', message, 403);
}
