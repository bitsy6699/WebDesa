<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ActivityLogCollection;
use App\Services\ActivityLogService;
use Illuminate\Http\Request;

/**
 * ActivityLogController
 *
 * Coordinates administrative audit activity log requests.
 *
 * @see docs/engineering/API_SPEC.md §11 Activity Log Endpoints
 */
class ActivityLogController extends BaseController
{
    /**
     * Create a new ActivityLogController instance.
     */
    public function __construct(
        protected ActivityLogService $activityLogService
    ) {}

    /**
     * Retrieve paginated administrator activity logs.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Http\Resources\ActivityLogCollection
     */
    public function index(Request $request): ActivityLogCollection
    {
        $validated = $request->validate([
            'per_page' => 'nullable|integer|min:1|max:50',
            'page' => 'nullable|integer|min:1',
            'action' => 'nullable|string|max:100',
        ]);

        $perPage = (int) ($validated['per_page'] ?? 15);
        $page = (int) ($validated['page'] ?? 1);
        $action = $validated['action'] ?? null;

        $logs = $this->activityLogService->list($action, $perPage, $page);

        return new ActivityLogCollection($logs);
    }
}
