import * as settingsService from '../services/settingsService.js';
import { success } from '../utils/response.js';

export async function index(req, res, next) {
  try {
    const settings = await settingsService.all();
    return success(res, settings);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    await settingsService.update(req.body.settings, req.ip);
    return success(res, null, 'Pengaturan berhasil diperbarui.');
  } catch (err) {
    next(err);
  }
}
