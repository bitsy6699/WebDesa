import { body } from 'express-validator';

export const loginValidation = [
  body('username').notEmpty().withMessage('Username wajib diisi.').isLength({ max: 50 }),
  body('password').notEmpty().withMessage('Password wajib diisi.').isLength({ max: 255 }),
];

export const updateProfileValidation = [
  body('username')
    .notEmpty().withMessage('Username wajib diisi.')
    .isLength({ min: 3, max: 50 }).withMessage('Username harus 3-50 karakter.')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username hanya boleh huruf, angka, dan underscore.'),
];

export const updatePasswordValidation = [
  body('current_password').notEmpty().withMessage('Password saat ini wajib diisi.'),
  body('password')
    .notEmpty().withMessage('Password baru wajib diisi.')
    .isLength({ min: 8 }).withMessage('Password minimal 8 karakter.'),
  body('password_confirmation').notEmpty().withMessage('Konfirmasi password wajib diisi.'),
];

export function validatePasswordConfirmation(body, { req }) {
  if (body !== req.body.password) {
    throw new Error('Konfirmasi password tidak cocok.');
  }
  return true;
}
