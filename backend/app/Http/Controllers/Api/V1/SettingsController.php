<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\UpdateSettingRequest;
use App\Http\Resources\SettingResource;
use App\Services\SettingsService;
use Illuminate\Http\JsonResponse;

/**
 * SettingsController
 *
 * Coordinates REST API endpoints for site-wide configuration.
 *
 * GET  /api/v1/settings        — Public read (no auth required)
 * PUT  /api/v1/admin/settings  — Admin write (auth:sanctum required)
 *
 * @see docs/engineering/API_SPEC.md §Settings Endpoints
 * @see docs/development/CODING_RULES.md §4.1 Thin Controllers
 */
class SettingsController extends BaseController
{
    /**
     * Create a new SettingsController instance.
     */
    public function __construct(
        protected SettingsService $settingsService
    ) {}

    /**
     * Retrieve all site settings (public).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $settings = $this->settingsService->all();

        return $this->success(SettingResource::collection($settings));
    }

    /**
     * Update one or more site settings (admin protected).
     *
     * @param  \App\Http\Requests\UpdateSettingRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateSettingRequest $request): JsonResponse
    {
        $this->settingsService->update(
            $request->validated('settings'),
            $request->ip() ?? '127.0.0.1'
        );

        return $this->success(null, 'Konfigurasi berhasil diperbarui.');
    }
}
