<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\ImportPotentialRequest;
use App\Services\ImportExportService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

/**
 * ImportExportController
 *
 * Coordinates REST API endpoints for bulk Excel import and export operations.
 * All business logic is delegated to ImportExportService.
 *
 * @see docs/engineering/API_SPEC.md §8 Excel Import/Export Endpoints
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §6.3 ImportExportService
 */
class ImportExportController extends BaseController
{
    /**
     * Create a new ImportExportController instance.
     */
    public function __construct(
        protected ImportExportService $importExportService
    ) {}

    /**
     * Import potentials from an uploaded Excel file.
     *
     * Validates the uploaded file, delegates row-level parsing and ACA schema
     * validation to the service layer, and returns the import result.
     *
     * @param  \App\Http\Requests\ImportPotentialRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function import(ImportPotentialRequest $request): JsonResponse
    {
        $result = $this->importExportService->import(
            $request->file('file'),
            $request->user()->id,
            $request->ip() ?? '127.0.0.1'
        );

        return $this->success(
            $result,
            "Impor data berhasil. {$result['imported_count']} potensi ditambahkan."
        );
    }

    /**
     * Download the import template Excel file.
     *
     * Generates a structured .xlsx template with column headers and an
     * "Instructions" worksheet listing available categories and their schemas.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function template(): BinaryFileResponse
    {
        $filePath = $this->importExportService->generateTemplate();

        return response()->download(
            $filePath,
            'template_impor_potensi_desa.xlsx',
            ['Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        )->deleteFileAfterSend(true);
    }

    /**
     * Export all potentials to an Excel file.
     *
     * Generates a structured .xlsx file containing all village potentials
     * with human-readable column headers.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function export(): BinaryFileResponse
    {
        $filePath = $this->importExportService->export();

        return response()->download(
            $filePath,
            'ekspor_potensi_desa_' . date('Y-m-d_His') . '.xlsx',
            ['Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        )->deleteFileAfterSend(true);
    }
}
