import * as activityLogService from '../services/activityLogService.js';
import { paginated } from '../utils/response.js';

export async function index(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 12;
    const action = req.query.action || null;

    const result = await activityLogService.list(action, page, perPage);

    const formatted = result.data.map((log) => ({
      id: log.id,
      action: log.action,
      subject_id: log.subjectId,
      subject_type: log.subjectType,
      ip_address: log.ipAddress,
      created_at: log.createdAt,
      user: log.user,
    }));

    return paginated(res, formatted, {
      currentPage: result.currentPage,
      lastPage: result.lastPage,
      perPage: result.perPage,
      total: result.total,
    });
  } catch (err) {
    next(err);
  }
}
