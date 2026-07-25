import { validationResult } from 'express-validator';
import * as authService from '../services/authService.js';
import { success, error, validationError } from '../utils/response.js';

export async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return validationError(res, errors.array());

    const { username, password } = req.body;
    const result = await authService.login(username, password, req.ip);
    return success(res, result, 'Login berhasil.');
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    await authService.logout(req.user, req.ip);
    return success(res, null, 'Logout berhasil.');
  } catch (err) {
    next(err);
  }
}

export async function me(req, res, next) {
  try {
    const profile = await authService.getProfile(req.user.id);
    return success(res, profile);
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return validationError(res, errors.array());

    const user = await authService.updateProfile(req.user.id, req.body.username);
    return success(res, user, 'Profil berhasil diperbarui.');
  } catch (err) {
    next(err);
  }
}

export async function updatePassword(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return validationError(res, errors.array());

    if (req.body.password !== req.body.password_confirmation) {
      return validationError(res, [{ msg: 'Konfirmasi password tidak cocok.' }]);
    }

    await authService.updatePassword(req.user.id, req.body.current_password, req.body.password);
    return success(res, null, 'Password berhasil diperbarui.');
  } catch (err) {
    next(err);
  }
}
