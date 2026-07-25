import { query } from 'express-validator';

export const mediaListValidation = [
  query('page').optional().isInt({ min: 1 }),
  query('per_page').optional().isInt({ min: 1, max: 50 }),
];
