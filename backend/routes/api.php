<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\ImportExportController;
use App\Http\Controllers\Api\V1\MediaController;
use App\Http\Controllers\Api\V1\PotentialController;
use App\Http\Controllers\Api\V1\SettingsController;
use App\Http\Controllers\Api\V1\StatisticsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider or bootstrap/app.php
| and are automatically prefixed with "/api/v1" via the application configuration.
|
| @see docs/engineering/API_SPEC.md
| @see docs/engineering/BACKEND_ARCHITECTURE.md §9.2 Route Protection
*/

// =========================================================================
// 1. PUBLIC ENDPOINTS (No Authentication Required)
// =========================================================================
Route::group([], function (): void {
    // Village Potentials Directory listings & filters
    Route::get('/potentials', [PotentialController::class, 'index'])->name('potentials.index');
    Route::get('/potentials/{category_slug}/{slug}', [PotentialController::class, 'show'])->name('potentials.show');

    // Categories list (Adaptive Content Architecture schemas)
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');

    // Aggregate statistics
    Route::get('/statistics/summary', [StatisticsController::class, 'getSummary'])->name('statistics.summary');

    // Site-wide settings (Public read — BR-CON-01 fallback contact, map defaults, etc.)
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
});

// =========================================================================
// 2. AUTHENTICATION ENDPOINTS
// =========================================================================
// Public Auth: Login throttled to max 5 attempts/minute (BR-SEC-01)
Route::group([
    'prefix' => 'auth',
    'middleware' => ['throttle:5,1'],
], function (): void {
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
});

// Protected Auth: Session query & logout throttled to max 60 attempts/minute
Route::group([
    'prefix' => 'auth',
    'middleware' => ['auth:sanctum', 'throttle:60,1'],
], function (): void {
    Route::get('/me', [AuthController::class, 'me'])->name('auth.me');
    Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
});

// =========================================================================
// 3. ADMIN ENDPOINTS (Protected by Sanctum)
// =========================================================================
Route::group([
    'prefix' => 'admin',
    'middleware' => ['auth:sanctum', 'throttle:60,1'],
], function (): void {
    // Current Authenticated Admin Profile
    Route::get('/me', [AuthController::class, 'me'])->name('admin.me');

    // CRUD Management for Village Potentials
    Route::group(['prefix' => 'potentials'], function (): void {
        Route::post('/', [PotentialController::class, 'store'])->name('admin.potentials.store');
        Route::put('/{id}', [PotentialController::class, 'update'])->name('admin.potentials.update');
        Route::delete('/{id}', [PotentialController::class, 'destroy'])->name('admin.potentials.destroy');
        Route::patch('/{id}/toggle-featured', [PotentialController::class, 'toggleFeatured'])->name('admin.potentials.toggle-featured');
    });

    // Media Manager Upload & Delete
    Route::group(['prefix' => 'media'], function (): void {
        Route::post('/upload', [MediaController::class, 'store'])->name('admin.media.upload');
        Route::delete('/{id}', [MediaController::class, 'destroy'])->name('admin.media.destroy');
    });

    // Site Settings (Admin Write)
    Route::put('/settings', [SettingsController::class, 'update'])->name('admin.settings.update');

    // Bulk Excel Import & Export
    Route::group(['prefix' => 'potentials'], function (): void {
        Route::post('/import', [ImportExportController::class, 'import'])->name('admin.potentials.import');
        Route::get('/import/template', [ImportExportController::class, 'template'])->name('admin.potentials.import.template');
        Route::get('/export', [ImportExportController::class, 'export'])->name('admin.potentials.export');
    });

    // Administrator Activity/Audit Logs (Placeholder)
    Route::get('/activity-logs', function () {
        return response()->json(['message' => 'Activity logs index placeholder']);
    })->name('admin.activity-logs.index');
});
