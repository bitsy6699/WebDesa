import { body, param, query } from 'express-validator';

export const storePotentialValidation = [
  body('category_id').notEmpty().withMessage('Kategori wajib dipilih.').isUUID().withMessage('ID kategori tidak valid.'),
  body('title').notEmpty().withMessage('Judul wajib diisi.').isLength({ max: 150 }),
  body('description').notEmpty().withMessage('Deskripsi wajib diisi.'),
  body('status')
    .notEmpty().withMessage('Status wajib diisi.')
    .isIn(['draft', 'published', 'archived']).withMessage('Status harus draft, published, atau archived.'),
  body('latitude')
    .notEmpty().withMessage('Latitude wajib diisi.')
    .isFloat({ min: -90, max: 90 }).withMessage('Latitude harus antara -90 dan 90.'),
  body('longitude')
    .notEmpty().withMessage('Longitude wajib diisi.')
    .isFloat({ min: -180, max: 180 }).withMessage('Longitude harus antara -180 dan 180.'),
  body('address').notEmpty().withMessage('Alamat wajib diisi.').isLength({ max: 255 }),
  body('dusun').optional({ nullable: true }).isLength({ max: 100 }),
  body('cover_image_id').optional({ nullable: true }).isUUID(),
  body('is_featured').optional().isBoolean(),
  body('metadata').optional({ nullable: true }).isObject(),
  body('gallery').optional({ nullable: true }).isArray(),
  body('gallery.*').optional().isUUID(),
];

export const updatePotentialValidation = [
  param('id').isUUID().withMessage('ID potensi tidak valid.'),
  body('category_id').optional().isUUID().withMessage('ID kategori tidak valid.'),
  body('title').optional().isLength({ max: 150 }),
  body('description').optional().isString(),
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived']).withMessage('Status harus draft, published, atau archived.'),
  body('latitude')
    .optional({ values: 'null' })
    .isFloat({ min: -90, max: 90 }).withMessage('Latitude harus antara -90 dan 90.'),
  body('longitude')
    .optional({ values: 'null' })
    .isFloat({ min: -180, max: 180 }).withMessage('Longitude harus antara -180 dan 180.'),
  body('address').optional().isLength({ max: 255 }),
  body('dusun').optional({ nullable: true }).isLength({ max: 100 }),
  body('cover_image_id').optional({ nullable: true }).isUUID(),
  body('is_featured').optional().isBoolean(),
  body('metadata').optional({ nullable: true }).isObject(),
  body('gallery').optional({ nullable: true }).isArray(),
  body('gallery.*').optional().isUUID(),
];

export const potentialListValidation = [
  query('search').optional().isLength({ min: 3 }),
  query('category').optional().isString(),
  query('featured').optional().isBoolean(),
  query('status').optional().isIn(['draft', 'published', 'archived']),
  query('sort').optional().isIn(['latest', 'oldest', 'name', 'featured']),
  query('page').optional().isInt({ min: 1 }),
  query('per_page').optional().isInt({ min: 1, max: 50 }),
];
