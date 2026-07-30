import { validationResult } from 'express-validator';
import * as potentialService from '../services/potentialService.js';
import { success, created, noContent, paginated, validationError, notFound } from '../utils/response.js';
import { PAGINATION_DEFAULT_PER_PAGE } from '../config/constants.js';

export async function index(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return validationError(res, errors.array());

    const result = await potentialService.list({
      search: req.query.search,
      category: req.query.category,
      featured: req.query.featured === 'true' ? true : undefined,
      status: req.query.status || 'published',
      sort: req.query.sort || 'latest',
      page: parseInt(req.query.page) || 1,
      perPage: parseInt(req.query.per_page) || PAGINATION_DEFAULT_PER_PAGE,
    });
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

export async function adminIndex(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return validationError(res, errors.array());

    const result = await potentialService.list({
      search: req.query.search,
      category: req.query.category,
      featured: req.query.featured === 'true' ? true : undefined,
      sort: req.query.sort || 'latest',
      page: parseInt(req.query.page) || 1,
      perPage: parseInt(req.query.per_page) || PAGINATION_DEFAULT_PER_PAGE,
    });
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

export async function show(req, res, next) {
  try {
    const potential = await potentialService.findBySlug(req.params.category, req.params.slug);
    if (!potential) return notFound(res);
    if (potential.status !== 'published') return notFound(res);
    return success(res, potential);
  } catch (err) {
    next(err);
  }
}

export async function showAdmin(req, res, next) {
  try {
    const potential = await potentialService.findById(req.params.id);
    if (!potential) return notFound(res);
    return success(res, potential);
  } catch (err) {
    next(err);
  }
}

export async function store(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return validationError(res, errors.array());

    const potential = await potentialService.create(req.body, req.user.id, req.ip);
    return created(res, potential);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return validationError(res, errors.array());

    const potential = await potentialService.update(req.params.id, req.body, req.user.id, req.ip);
    return success(res, potential, 'Potensi berhasil diperbarui.');
  } catch (err) {
    next(err);
  }
}

export async function destroy(req, res, next) {
  try {
    await potentialService.remove(req.params.id, req.user.id, req.ip);
    return noContent(res);
  } catch (err) {
    next(err);
  }
}

export async function toggleFeatured(req, res, next) {
  try {
    const potential = await potentialService.toggleFeatured(req.params.id, req.user.id, req.ip);
    return success(res, potential, 'Status featured berhasil diubah.');
  } catch (err) {
    next(err);
  }
}
