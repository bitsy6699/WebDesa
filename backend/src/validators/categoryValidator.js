import { body, param } from 'express-validator';

export const storeCategoryValidation = [
  body('label').notEmpty().withMessage('Label wajib diisi.').isLength({ max: 50 }),
  body('slug')
    .notEmpty().withMessage('Slug wajib diisi.')
    .isLength({ max: 50 })
    .matches(/^[a-z0-9-]+$/).withMessage('Slug hanya boleh huruf kecil, angka, dan strip.'),
  body('icon_key').optional({ nullable: true }).isLength({ max: 50 }),
  body('color_code').optional({ nullable: true }).matches(/^#[0-9A-Fa-f]{6}$/).withMessage('Format color code tidak valid.'),
];

export const updateCategoryValidation = [
  param('id').isUUID().withMessage('ID kategori tidak valid.'),
  body('label').optional().isLength({ max: 50 }),
  body('slug')
    .optional()
    .isLength({ max: 50 })
    .matches(/^[a-z0-9-]+$/).withMessage('Slug hanya boleh huruf kecil, angka, dan strip.'),
  body('icon_key').optional({ nullable: true }).isLength({ max: 50 }),
  body('color_code').optional({ nullable: true }).matches(/^#[0-9A-Fa-f]{6}$/).withMessage('Format color code tidak valid.'),
];
