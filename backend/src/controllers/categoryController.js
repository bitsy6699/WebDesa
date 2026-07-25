import { validationResult } from 'express-validator';
import * as categoryService from '../services/categoryService.js';
import { success, created, noContent, validationError, notFound } from '../utils/response.js';
import { logAction } from '../services/activityLogService.js';

export async function index(req, res, next) {
  try {
    const categories = await categoryService.all();
    return success(res, categories);
  } catch (err) {
    next(err);
  }
}

export async function store(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return validationError(res, errors.array());

    const category = await categoryService.create(req.body);
    await logAction(req.user.id, 'create_category', category.id, 'Category', req.ip);
    return created(res, category);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return validationError(res, errors.array());

    const existing = await categoryService.findById(req.params.id);
    if (!existing) return notFound(res);

    const category = await categoryService.update(req.params.id, req.body);
    await logAction(req.user.id, 'update_category', category.id, 'Category', req.ip);
    return success(res, category, 'Kategori berhasil diperbarui.');
  } catch (err) {
    next(err);
  }
}

export async function destroy(req, res, next) {
  try {
    const existing = await categoryService.findById(req.params.id);
    if (!existing) return notFound(res);

    await categoryService.remove(req.params.id);
    await logAction(req.user.id, 'delete_category', req.params.id, 'Category', req.ip);
    return noContent(res);
  } catch (err) {
    next(err);
  }
}
