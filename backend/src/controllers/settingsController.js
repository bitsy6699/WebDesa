import * as settingsService from '../services/settingsService.js';
import { success, validationError } from '../utils/response.js';

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
    const body = req.body;
    const settings = body.settings;

    if (!Array.isArray(settings) || settings.length === 0) {
      return validationError(res, [{ msg: 'settings harus berupa array dan tidak boleh kosong.' }]);
    }

    for (const s of settings) {
      if (!s.key || typeof s.key !== 'string') {
        return validationError(res, [{ msg: 'Setiap item settings wajib memiliki key (string).' }]);
      }
    }

    await settingsService.update(settings, req.ip);
    return success(res, null, 'Pengaturan berhasil diperbarui.');
  } catch (err) {
    next(err);
  }
}
