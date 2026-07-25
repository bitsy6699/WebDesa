import * as statisticsService from '../services/statisticsService.js';
import { success } from '../utils/response.js';

export async function getSummary(req, res, next) {
  try {
    const summary = await statisticsService.getSummary();
    return success(res, summary);
  } catch (err) {
    next(err);
  }
}
