<?php

namespace App\Services;

use App\Enums\Status;
use App\Exceptions\ApiException;
use App\Models\Category;
use App\Models\Location;
use App\Models\Potential;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;

/**
 * ImportExportService
 *
 * Handles bulk Excel import, export, and template generation for Village Potentials.
 * Implements transactional rollback per BR-CMS-01: if any row fails validation,
 * the entire import is aborted and no data is written.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §6.3 ImportExportService
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §11 Import Architecture
 * @see docs/engineering/API_SPEC.md §8 Excel Import/Export Endpoints
 */
class ImportExportService extends BaseService
{
    /**
     * Column header mapping for the import/export Excel template.
     * Keys are internal identifiers; values are human-readable column names.
     *
     * @var array<string, string>
     */
    protected const COLUMN_HEADERS = [
        'category_id'   => 'ID Kategori',
        'title'         => 'Judul',
        'description'   => 'Deskripsi',
        'status'        => 'Status (draft/published/archived)',
        'latitude'      => 'Latitude',
        'longitude'     => 'Longitude',
        'address'       => 'Alamat',
        'dusun'         => 'Dusun',
        'is_featured'   => 'Unggulan (0/1)',
        'metadata_json' => 'Metadata (JSON)',
    ];

    /**
     * Create a new ImportExportService instance.
     */
    public function __construct(
        protected ActivityLogService $activityLogService,
        protected CategoryService $categoryService
    ) {}

    /**
     * Import potentials from an uploaded Excel file.
     *
     * Reads all data rows, validates each row against static rules and dynamic
     * ACA category schemas, then either commits all rows in a single transaction
     * or rolls back entirely on any validation failure.
     *
     * @param  \Illuminate\Http\UploadedFile  $file
     * @param  string  $adminId  UUID of the importing administrator
     * @param  string  $ipAddress  Client IP address for audit logging
     * @return array{imported_count: int}
     *
     * @throws \App\Exceptions\ApiException
     */
    public function import(UploadedFile $file, string $adminId, string $ipAddress): array
    {
        return $this->executeSafely(function () use ($file, $adminId, $ipAddress) {
            // 1. Parse the spreadsheet
            $spreadsheet = IOFactory::load($file->getRealPath());
            $worksheet = $spreadsheet->getActiveSheet();
            $rows = $worksheet->toArray(null, true, true, false);

            if (count($rows) < 2) {
                throw new ApiException(
                    errorCode: 'IMPORT_VALIDATION_FAILED',
                    message: 'File Excel tidak memiliki baris data. Pastikan file berisi minimal 1 baris data setelah header.',
                    statusCode: 422
                );
            }

            // 2. Extract header row and validate column count
            $headerRow = array_shift($rows);
            $expectedColumnCount = count(self::COLUMN_HEADERS);

            if (count($headerRow) < $expectedColumnCount) {
                throw new ApiException(
                    errorCode: 'IMPORT_VALIDATION_FAILED',
                    message: "Format kolom tidak sesuai. Diharapkan {$expectedColumnCount} kolom, ditemukan " . count($headerRow) . " kolom. Gunakan template yang disediakan.",
                    statusCode: 422
                );
            }

            // 3. Pre-load all categories and their schemas for validation
            $categories = Category::with('schema')->get()->keyBy('id');

            // 4. Validate all rows first (collect errors before any writes)
            $validatedRows = [];
            $errors = [];

            foreach ($rows as $index => $row) {
                $rowNumber = $index + 2; // Excel row number (1-indexed header + offset)

                // Skip completely empty rows
                if ($this->isEmptyRow($row)) {
                    continue;
                }

                $rowData = $this->mapRowToData($row);
                $rowErrors = $this->validateRow($rowData, $rowNumber, $categories);

                if (!empty($rowErrors)) {
                    $errors["row_{$rowNumber}"] = implode(' ', $rowErrors);
                } else {
                    $validatedRows[] = [
                        'row_number' => $rowNumber,
                        'data' => $rowData,
                    ];
                }
            }

            // 5. If any errors exist, abort entirely per BR-CMS-01
            if (!empty($errors)) {
                throw new ApiException(
                    errorCode: 'IMPORT_VALIDATION_FAILED',
                    message: 'Proses impor dibatalkan. Baris data mengandung error.',
                    statusCode: 422,
                    details: $errors
                );
            }

            if (empty($validatedRows)) {
                throw new ApiException(
                    errorCode: 'IMPORT_VALIDATION_FAILED',
                    message: 'File Excel tidak memiliki baris data yang valid.',
                    statusCode: 422
                );
            }

            // 6. All rows validated — execute bulk insert inside a transaction
            $importedCount = $this->executeBulkInsert($validatedRows, $adminId);

            // 7. Log the import activity
            $this->activityLogService->log(
                user: auth()->user(),
                action: 'potentials.imported',
                subjectType: Potential::class,
                ipAddress: $ipAddress
            );

            // 8. Invalidate relevant caches
            $this->categoryService->clearCache();

            return ['imported_count' => $importedCount];
        }, 'Gagal memproses file impor.');
    }

    /**
     * Generate an Excel template file for administrators to fill in.
     * Includes an "Instructions" worksheet listing all available categories.
     *
     * @return string  Absolute path to the generated temporary template file
     */
    public function generateTemplate(): string
    {
        return $this->executeSafely(function () {
            $spreadsheet = new Spreadsheet();

            // ---- Sheet 1: Data Template ----
            $dataSheet = $spreadsheet->getActiveSheet();
            $dataSheet->setTitle('Data Potensi');

            $columnKeys = array_keys(self::COLUMN_HEADERS);
            $columnHeaders = array_values(self::COLUMN_HEADERS);

            // Write header row
            foreach ($columnHeaders as $colIndex => $header) {
                $colLetter = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($colIndex + 1);
                $dataSheet->setCellValue("{$colLetter}1", $header);
            }

            // Style the header row
            $lastColumn = chr(64 + count($columnHeaders)); // A=65, so col count offset
            $headerRange = "A1:{$lastColumn}1";
            $this->applyHeaderStyle($dataSheet, $headerRange);

            // Auto-size columns
            foreach (range('A', $lastColumn) as $col) {
                $dataSheet->getColumnDimension($col)->setAutoSize(true);
            }

            // ---- Sheet 2: Instructions ----
            $instructionSheet = $spreadsheet->createSheet();
            $instructionSheet->setTitle('Petunjuk');

            // Header for instructions
            $instructionSheet->setCellValue('A1', 'ID Kategori');
            $instructionSheet->setCellValue('B1', 'Nama Kategori');
            $instructionSheet->setCellValue('C1', 'Slug');
            $instructionSheet->setCellValue('D1', 'Skema Metadata');

            $this->applyHeaderStyle($instructionSheet, 'A1:D1', '1565C0');

            // Populate categories
            $categories = Category::with('schema')->get();
            $row = 2;
            foreach ($categories as $category) {
                $instructionSheet->setCellValue("A{$row}", $category->id);
                $instructionSheet->setCellValue("B{$row}", $category->label);
                $instructionSheet->setCellValue("C{$row}", $category->slug);

                // Show the schema definition as readable JSON so admins know what metadata fields are expected
                $schemaDescription = 'Tidak ada skema';
                if ($category->schema && is_array($category->schema->schema_definition)) {
                    $fields = [];
                    foreach ($category->schema->schema_definition as $fieldName => $def) {
                        $required = !empty($def['required']) ? 'wajib' : 'opsional';
                        $type = $def['type'] ?? 'string';
                        $label = $def['label'] ?? $fieldName;
                        $fields[] = "{$fieldName} ({$label}, {$type}, {$required})";
                    }
                    $schemaDescription = implode('; ', $fields);
                }
                $instructionSheet->setCellValue("D{$row}", $schemaDescription);
                $row++;
            }

            // Auto-size columns on instruction sheet
            foreach (range('A', 'D') as $col) {
                $instructionSheet->getColumnDimension($col)->setAutoSize(true);
            }

            // Add usage instructions below categories
            $row += 1;
            $instructionSheet->setCellValue("A{$row}", 'PETUNJUK PENGISIAN:');
            $instructionSheet->getStyle("A{$row}")->getFont()->setBold(true);
            $row++;
            $instructionSheet->setCellValue("A{$row}", '1. Isi data pada sheet "Data Potensi".');
            $row++;
            $instructionSheet->setCellValue("A{$row}", '2. Kolom "ID Kategori" harus diisi dengan UUID kategori dari tabel di atas.');
            $row++;
            $instructionSheet->setCellValue("A{$row}", '3. Kolom "Status" harus diisi dengan: draft, published, atau archived.');
            $row++;
            $instructionSheet->setCellValue("A{$row}", '4. Kolom "Metadata (JSON)" harus berupa format JSON sesuai skema kategori.');
            $row++;
            $instructionSheet->setCellValue("A{$row}", '   Contoh: {"owner_name": "Ahmad", "price_range": "Rp 10.000 - Rp 50.000"}');
            $row++;
            $instructionSheet->setCellValue("A{$row}", '5. Kolom "Unggulan" diisi 1 (ya) atau 0 (tidak).');
            $row++;
            $instructionSheet->setCellValue("A{$row}", '6. Latitude harus antara -90 dan 90, Longitude antara -180 dan 180.');

            // Set active sheet back to data
            $spreadsheet->setActiveSheetIndex(0);

            // Write to temp file
            $tempPath = tempnam(sys_get_temp_dir(), 'template_') . '.xlsx';
            $writer = new Xlsx($spreadsheet);
            $writer->save($tempPath);

            return $tempPath;
        }, 'Gagal membuat template Excel.');
    }

    /**
     * Export all potentials to an Excel file with human-readable column headers.
     *
     * @return string  Absolute path to the generated temporary export file
     */
    public function export(): string
    {
        return $this->executeSafely(function () {
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            $sheet->setTitle('Data Potensi Desa');

            // Write header row
            $columnHeaders = array_values(self::COLUMN_HEADERS);
            foreach ($columnHeaders as $colIndex => $header) {
                $colLetter = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($colIndex + 1);
                $sheet->setCellValue("{$colLetter}1", $header);
            }

            // Style header
            $lastColumn = chr(64 + count($columnHeaders));
            $headerRange = "A1:{$lastColumn}1";
            $this->applyHeaderStyle($sheet, $headerRange);

            // Populate data rows
            $potentials = Potential::with(['location'])->get();
            $rowNumber = 2;

            foreach ($potentials as $potential) {
                $sheet->setCellValue("A{$rowNumber}", $potential->category_id);
                $sheet->setCellValue("B{$rowNumber}", $potential->title);
                $sheet->setCellValue("C{$rowNumber}", $potential->description);
                $sheet->setCellValue("D{$rowNumber}", $potential->status instanceof Status ? $potential->status->value : $potential->status);
                $sheet->setCellValue("E{$rowNumber}", $potential->location?->latitude);
                $sheet->setCellValue("F{$rowNumber}", $potential->location?->longitude);
                $sheet->setCellValue("G{$rowNumber}", $potential->location?->address);
                $sheet->setCellValue("H{$rowNumber}", $potential->location?->dusun);
                $sheet->setCellValue("I{$rowNumber}", $potential->is_featured ? 1 : 0);
                $sheet->setCellValue("J{$rowNumber}", is_array($potential->metadata) ? json_encode($potential->metadata, JSON_UNESCAPED_UNICODE) : '{}');

                $rowNumber++;
            }

            // Auto-size columns
            foreach (range('A', $lastColumn) as $col) {
                $sheet->getColumnDimension($col)->setAutoSize(true);
            }

            // Write to temp file
            $tempPath = tempnam(sys_get_temp_dir(), 'export_') . '.xlsx';
            $writer = new Xlsx($spreadsheet);
            $writer->save($tempPath);

            return $tempPath;
        }, 'Gagal mengekspor data potensi.');
    }

    // =========================================================================
    // PRIVATE HELPER METHODS
    // =========================================================================

    /**
     * Map a raw spreadsheet row array to a keyed data array.
     *
     * @param  array<int, mixed>  $row
     * @return array<string, mixed>
     */
    private function mapRowToData(array $row): array
    {
        $keys = array_keys(self::COLUMN_HEADERS);
        $data = [];

        foreach ($keys as $index => $key) {
            $data[$key] = $row[$index] ?? null;

            // Trim string values
            if (is_string($data[$key])) {
                $data[$key] = trim($data[$key]);
            }
        }

        return $data;
    }

    /**
     * Validate a single row against static field rules and dynamic ACA schema.
     *
     * @param  array<string, mixed>  $rowData
     * @param  int  $rowNumber
     * @param  \Illuminate\Database\Eloquent\Collection  $categories  Pre-loaded categories with schemas
     * @return array<int, string>  List of validation error messages
     */
    private function validateRow(array $rowData, int $rowNumber, $categories): array
    {
        $errors = [];

        // Stage 1: Static field validation
        $staticRules = [
            'category_id' => 'required|string',
            'title' => 'required|string|max:150',
            'description' => 'required|string',
            'status' => ['required', 'string', Rule::in(Status::values())],
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'address' => 'required|string|max:255',
            'dusun' => 'nullable|string|max:100',
            'is_featured' => 'nullable|in:0,1,true,false',
            'metadata_json' => 'nullable|string',
        ];

        $validator = Validator::make($rowData, $staticRules);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $msg) {
                $errors[] = $msg;
            }
            return $errors;
        }

        // Validate category_id exists
        $categoryId = $rowData['category_id'];
        if (!$categories->has($categoryId)) {
            $errors[] = "ID Kategori '{$categoryId}' tidak ditemukan.";
            return $errors;
        }

        // Stage 2: Dynamic ACA metadata validation
        $metadataJson = $rowData['metadata_json'];
        $metadata = [];

        if (!empty($metadataJson)) {
            $metadata = json_decode($metadataJson, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                $errors[] = 'Format metadata_json tidak valid (bukan JSON).';
                return $errors;
            }
        }

        // Validate metadata against ACA schema
        $category = $categories->get($categoryId);
        if ($category->schema && is_array($category->schema->schema_definition)) {
            $metadataRules = [];
            foreach ($category->schema->schema_definition as $field => $def) {
                $fieldRules = [];

                if (!empty($def['required'])) {
                    $fieldRules[] = 'required';
                } else {
                    $fieldRules[] = 'nullable';
                }

                $type = $def['type'] ?? 'string';
                if ($type === 'number' || $type === 'numeric') {
                    $fieldRules[] = 'numeric';
                } elseif ($type === 'array') {
                    $fieldRules[] = 'array';
                } else {
                    $fieldRules[] = 'string';
                }

                if (!empty($def['validation'])) {
                    $customRules = explode('|', $def['validation']);
                    $fieldRules = array_merge($fieldRules, $customRules);
                }

                $metadataRules[$field] = $fieldRules;
            }

            $metadataValidator = Validator::make($metadata, $metadataRules);
            if ($metadataValidator->fails()) {
                foreach ($metadataValidator->errors()->all() as $msg) {
                    $errors[] = "Metadata: {$msg}";
                }
            }
        }

        return $errors;
    }

    /**
     * Execute the bulk insert of validated rows inside a database transaction.
     *
     * @param  array<int, array{row_number: int, data: array<string, mixed>}>  $validatedRows
     * @param  string  $adminId
     * @return int  Number of rows imported
     */
    private function executeBulkInsert(array $validatedRows, string $adminId): int
    {
        return $this->transaction(function () use ($validatedRows, $adminId) {
            $importedCount = 0;

            foreach ($validatedRows as $entry) {
                $data = $entry['data'];

                // Parse metadata JSON
                $metadata = [];
                if (!empty($data['metadata_json'])) {
                    $metadata = json_decode($data['metadata_json'], true) ?? [];
                }

                // Create Location record
                $location = Location::create([
                    'latitude' => (float) $data['latitude'],
                    'longitude' => (float) $data['longitude'],
                    'address' => $data['address'],
                    'dusun' => $data['dusun'] ?: null,
                ]);

                // Create Potential record
                Potential::create([
                    'category_id' => $data['category_id'],
                    'title' => $data['title'],
                    'description' => $data['description'],
                    'status' => $data['status'],
                    'location_id' => $location->id,
                    'metadata' => $metadata,
                    'is_featured' => (bool) ($data['is_featured'] ?? false),
                    'created_by_id' => $adminId,
                ]);

                $importedCount++;
            }

            return $importedCount;
        });
    }

    /**
     * Check if a spreadsheet row is completely empty.
     *
     * @param  array<int, mixed>  $row
     * @return bool
     */
    private function isEmptyRow(array $row): bool
    {
        foreach ($row as $cell) {
            if ($cell !== null && trim((string) $cell) !== '') {
                return false;
            }
        }
        return true;
    }

    /**
     * Apply standard header styling to a worksheet range.
     *
     * @param  \PhpOffice\PhpSpreadsheet\Worksheet\Worksheet  $sheet
     * @param  string  $range
     * @param  string  $color
     * @return void
     */
    private function applyHeaderStyle($sheet, string $range, string $color = '2E7D32'): void
    {
        $sheet->getStyle($range)->applyFromArray([
            'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => $color],
            ],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
            'borders' => [
                'allBorders' => ['borderStyle' => Border::BORDER_THIN],
            ],
        ]);
    }
}
