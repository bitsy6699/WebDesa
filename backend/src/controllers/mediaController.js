import * as mediaService from '../services/mediaService.js';
import { success, noContent, paginated, notFound, error } from '../utils/response.js';
import { PAGINATION_DEFAULT_PER_PAGE } from '../config/constants.js';

export async function index(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || PAGINATION_DEFAULT_PER_PAGE;
    const result = await mediaService.list(page, perPage);
    return paginated(res, result.data, {
      currentPage: result.currentPage,
      lastPage: result.lastPage,
      perPage: result.perPage,
      total: result.total,
    });
  } catch (err) {
    next(err);
  }
}

export async function store(req, res, next) {
  try {
    if (!req.file) {
      return error(res, 'VALIDATION_FAILED', 'File wajib diupload.', 422);
    }
    const media = await mediaService.upload(req.file, req.user.id, req.ip);
    return success(res, media, 'File berhasil diupload.', 201);
  } catch (err) {
    next(err);
  }
}

export async function destroy(req, res, next) {
  try {
    await mediaService.remove(req.params.id, req.user.id, req.ip);
    return noContent(res);
  } catch (err) {
    next(err);
  }
}
