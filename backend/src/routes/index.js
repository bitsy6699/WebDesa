import { Router } from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/auth.js';
import { loginValidation, updateProfileValidation, updatePasswordValidation } from '../validators/authValidator.js';
import { storeCategoryValidation, updateCategoryValidation } from '../validators/categoryValidator.js';
import { storePotentialValidation, updatePotentialValidation } from '../validators/potentialValidator.js';
import * as authController from '../controllers/authController.js';
import * as categoryController from '../controllers/categoryController.js';
import * as potentialController from '../controllers/potentialController.js';
import * as mediaController from '../controllers/mediaController.js';
import * as settingsController from '../controllers/settingsController.js';
import * as statisticsController from '../controllers/statisticsController.js';
import * as importExportController from '../controllers/importExportController.js';
import * as activityLogController from '../controllers/activityLogController.js';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Format file tidak didukung. Hanya JPEG, PNG, dan WebP.'));
    }
  },
});

router.get('/potentials', potentialController.index);
router.get('/potentials/:category/:slug', potentialController.show);
router.get('/categories', categoryController.index);
router.get('/statistics/summary', statisticsController.getSummary);
router.get('/settings', settingsController.index);

router.post('/auth/login', loginValidation, authController.login);
router.get('/auth/me', authenticate, authController.me);
router.post('/auth/logout', authenticate, authController.logout);
router.put('/auth/profile', authenticate, updateProfileValidation, authController.updateProfile);
router.put('/auth/password', authenticate, updatePasswordValidation, authController.updatePassword);

router.get('/admin/me', authenticate, authController.me);
router.post('/admin/categories', authenticate, storeCategoryValidation, categoryController.store);
router.put('/admin/categories/:id', authenticate, updateCategoryValidation, categoryController.update);
router.delete('/admin/categories/:id', authenticate, categoryController.destroy);

router.post('/admin/potentials', authenticate, storePotentialValidation, potentialController.store);
router.put('/admin/potentials/:id', authenticate, updatePotentialValidation, potentialController.update);
router.delete('/admin/potentials/:id', authenticate, potentialController.destroy);
router.patch('/admin/potentials/:id/toggle-featured', authenticate, potentialController.toggleFeatured);

router.get('/admin/media', authenticate, mediaController.index);
router.post('/admin/media/upload', authenticate, upload.single('file'), mediaController.store);
router.delete('/admin/media/:id', authenticate, mediaController.destroy);

router.put('/admin/settings', authenticate, settingsController.update);

router.post('/admin/potentials/import', authenticate, upload.single('file'), importExportController.importPotentials);
router.get('/admin/potentials/import/template', authenticate, importExportController.template);
router.get('/admin/potentials/export', authenticate, importExportController.exportPotentials);

router.get('/admin/activity-logs', authenticate, activityLogController.index);

export default router;
