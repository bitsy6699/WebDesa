import * as importExportService from '../services/importExportService.js';
import * as potentialService from '../services/potentialService.js';
import { success, error } from '../utils/response.js';

export async function importPotentials(req, res, next) {
  try {
    if (!req.file) {
      return error(res, 'VALIDATION_FAILED', 'File wajib diupload.', 422);
    }
    const result = await importExportService.importPotentials(req.file, req.user.id, req.ip);
    return success(res, result, `${result.imported_count} data berhasil diimport.`);
  } catch (err) {
    next(err);
  }
}

export async function template(req, res, next) {
  try {
    const buffer = importExportService.generateTemplate();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=template-import-potensi.xlsx');
    return res.send(Buffer.from(buffer));
  } catch (err) {
    next(err);
  }
}

export async function exportPotentials(req, res, next) {
  try {
    const potentials = await potentialService.listForExport();
    const buffer = importExportService.exportPotentials(potentials);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=export-potensi.xlsx');
    return res.send(Buffer.from(buffer));
  } catch (err) {
    next(err);
  }
}
