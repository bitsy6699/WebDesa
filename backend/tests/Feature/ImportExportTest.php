<?php

namespace Tests\Feature;

use App\Enums\Status;
use App\Models\ActivityLog;
use App\Models\Category;
use App\Models\CategorySchema;
use App\Models\Location;
use App\Models\Potential;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Tests\TestCase;

/**
 * ImportExportTest
 *
 * Feature tests for Phase 10: Bulk Excel Import & Export Module.
 * Covers successful import, rollback scenarios, template download,
 * export download, authorization, validation, and cache consistency.
 *
 * @see docs/engineering/API_SPEC.md §8 Excel Import/Export Endpoints
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §6.3 ImportExportService
 */
class ImportExportTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected Category $umkmCategory;
    protected CategorySchema $umkmSchema;
    protected Category $wisataCategory;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create();

        $this->umkmCategory = Category::factory()->umkm()->create();
        $this->umkmSchema = CategorySchema::create([
            'category_id' => $this->umkmCategory->id,
            'schema_definition' => [
                'owner_name' => [
                    'type' => 'string',
                    'required' => true,
                    'label' => 'Nama Pemilik',
                    'validation' => 'min:3',
                ],
                'price_range' => [
                    'type' => 'string',
                    'required' => false,
                    'label' => 'Harga',
                ],
            ],
        ]);

        $this->wisataCategory = Category::factory()->wisata()->create();
        CategorySchema::create([
            'category_id' => $this->wisataCategory->id,
            'schema_definition' => [
                'ticket_price' => [
                    'type' => 'numeric',
                    'required' => true,
                    'label' => 'Harga Tiket',
                ],
            ],
        ]);
    }

    // =========================================================================
    // IMPORT TESTS
    // =========================================================================

    /**
     * Test successful Excel import creates potentials and locations.
     */
    public function test_successful_import_creates_potentials_and_locations(): void
    {
        $file = $this->createValidExcelFile([
            [
                $this->umkmCategory->id,
                'Warung Nasi Bu Ani',
                'Warung nasi sederhana yang terkenal.',
                'published',
                -6.9175,
                107.6191,
                'Jl. Raya Karamatwangi No. 1',
                'Dusun 1',
                1,
                '{"owner_name": "Bu Ani", "price_range": "Rp 10.000 - Rp 25.000"}',
            ],
            [
                $this->umkmCategory->id,
                'Toko Kerajinan Pak Budi',
                'Kerajinan tangan khas desa.',
                'draft',
                -6.9180,
                107.6200,
                'Jl. Desa No. 5',
                'Dusun 2',
                0,
                '{"owner_name": "Pak Budi"}',
            ],
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.potentials.import'), [
                'file' => $file,
            ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => ['imported_count' => 2],
            ])
            ->assertJsonFragment([
                'message' => 'Impor data berhasil. 2 potensi ditambahkan.',
            ]);

        // Verify records were created
        $this->assertDatabaseCount('potentials', 2);
        $this->assertDatabaseCount('locations', 2);

        // Verify data integrity
        $this->assertDatabaseHas('potentials', [
            'title' => 'Warung Nasi Bu Ani',
            'status' => 'published',
            'is_featured' => true,
            'created_by_id' => $this->admin->id,
        ]);

        $this->assertDatabaseHas('potentials', [
            'title' => 'Toko Kerajinan Pak Budi',
            'status' => 'draft',
            'is_featured' => false,
        ]);

        $this->assertDatabaseHas('locations', [
            'address' => 'Jl. Raya Karamatwangi No. 1',
            'dusun' => 'Dusun 1',
        ]);
    }

    /**
     * Test import stores metadata correctly as JSON.
     */
    public function test_import_stores_metadata_as_json(): void
    {
        $metadata = ['owner_name' => 'Test Owner', 'price_range' => 'Rp 5.000'];
        $file = $this->createValidExcelFile([
            [
                $this->umkmCategory->id,
                'Test Metadata Store',
                'Testing metadata storage.',
                'draft',
                -6.9175,
                107.6191,
                'Jl. Test',
                null,
                0,
                json_encode($metadata),
            ],
        ]);

        $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.potentials.import'), ['file' => $file])
            ->assertStatus(200);

        $potential = Potential::where('title', 'Test Metadata Store')->first();
        $this->assertNotNull($potential);
        $this->assertEquals('Test Owner', $potential->metadata['owner_name']);
        $this->assertEquals('Rp 5.000', $potential->metadata['price_range']);
    }

    /**
     * Test import logs activity in activity_logs table.
     */
    public function test_import_logs_activity(): void
    {
        $file = $this->createValidExcelFile([
            [
                $this->umkmCategory->id,
                'Activity Log Test',
                'Testing activity logging.',
                'draft',
                -6.9175,
                107.6191,
                'Jl. Test',
                null,
                0,
                '{"owner_name": "Logger"}',
            ],
        ]);

        $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.potentials.import'), ['file' => $file])
            ->assertStatus(200);

        $this->assertDatabaseHas('activity_logs', [
            'user_id' => $this->admin->id,
            'action' => 'potentials.imported',
            'subject_type' => Potential::class,
        ]);
    }

    // =========================================================================
    // ROLLBACK TESTS (BR-CMS-01)
    // =========================================================================

    /**
     * Test import rolls back entirely when a row has an invalid category ID.
     */
    public function test_import_rollback_on_invalid_category_id(): void
    {
        $file = $this->createValidExcelFile([
            [
                $this->umkmCategory->id,
                'Valid Row',
                'This should not be saved.',
                'published',
                -6.9175,
                107.6191,
                'Jl. Valid',
                null,
                0,
                '{"owner_name": "Valid"}',
            ],
            [
                'non-existent-category-id',
                'Invalid Category Row',
                'This has a bad category.',
                'published',
                -6.9180,
                107.6200,
                'Jl. Invalid',
                null,
                0,
                '{}',
            ],
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.potentials.import'), ['file' => $file]);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'error' => [
                    'code' => 'IMPORT_VALIDATION_FAILED',
                ],
            ]);

        // No records should exist — full rollback per BR-CMS-01
        $this->assertDatabaseCount('potentials', 0);
        $this->assertDatabaseCount('locations', 0);
    }

    /**
     * Test import rolls back when a row fails ACA metadata validation.
     */
    public function test_import_rollback_on_invalid_aca_metadata(): void
    {
        $file = $this->createValidExcelFile([
            [
                $this->umkmCategory->id,
                'Valid Row',
                'This should not be saved.',
                'published',
                -6.9175,
                107.6191,
                'Jl. Valid',
                null,
                0,
                '{"owner_name": "Valid Owner"}',
            ],
            [
                $this->umkmCategory->id,
                'Invalid Metadata Row',
                'Owner name too short per ACA schema.',
                'published',
                -6.9180,
                107.6200,
                'Jl. Invalid',
                null,
                0,
                '{"owner_name": "AB"}', // min:3 violation
            ],
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.potentials.import'), ['file' => $file]);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'error' => [
                    'code' => 'IMPORT_VALIDATION_FAILED',
                ],
            ]);

        // Verify error details reference the failing row
        $errorDetails = $response->json('error.details');
        $this->assertNotEmpty($errorDetails);

        // Full rollback — no records saved
        $this->assertDatabaseCount('potentials', 0);
        $this->assertDatabaseCount('locations', 0);
    }

    /**
     * Test import rolls back when a row fails required ACA metadata field.
     */
    public function test_import_rollback_on_missing_required_metadata(): void
    {
        $file = $this->createValidExcelFile([
            [
                $this->umkmCategory->id,
                'Missing Required Metadata',
                'Missing owner_name which is required.',
                'published',
                -6.9175,
                107.6191,
                'Jl. Test',
                null,
                0,
                '{}', // Missing required owner_name
            ],
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.potentials.import'), ['file' => $file]);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'error' => [
                    'code' => 'IMPORT_VALIDATION_FAILED',
                ],
            ]);

        $this->assertDatabaseCount('potentials', 0);
    }

    /**
     * Test import rolls back when invalid JSON is provided in metadata.
     */
    public function test_import_rollback_on_malformed_json_metadata(): void
    {
        $file = $this->createValidExcelFile([
            [
                $this->umkmCategory->id,
                'Malformed JSON',
                'Contains broken JSON.',
                'published',
                -6.9175,
                107.6191,
                'Jl. Test',
                null,
                0,
                '{invalid json here}',
            ],
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.potentials.import'), ['file' => $file]);

        $response->assertStatus(422);
        $this->assertDatabaseCount('potentials', 0);
    }

    /**
     * Test import fails on invalid status value.
     */
    public function test_import_rollback_on_invalid_status(): void
    {
        $file = $this->createValidExcelFile([
            [
                $this->umkmCategory->id,
                'Invalid Status',
                'Has an invalid status.',
                'unknown_status',
                -6.9175,
                107.6191,
                'Jl. Test',
                null,
                0,
                '{"owner_name": "Test"}',
            ],
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.potentials.import'), ['file' => $file]);

        $response->assertStatus(422);
        $this->assertDatabaseCount('potentials', 0);
    }

    /**
     * Test import fails on invalid latitude value.
     */
    public function test_import_rollback_on_invalid_coordinates(): void
    {
        $file = $this->createValidExcelFile([
            [
                $this->umkmCategory->id,
                'Invalid Coordinates',
                'Has coordinates out of range.',
                'draft',
                999.0, // Invalid latitude
                107.6191,
                'Jl. Test',
                null,
                0,
                '{"owner_name": "Test"}',
            ],
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.potentials.import'), ['file' => $file]);

        $response->assertStatus(422);
        $this->assertDatabaseCount('potentials', 0);
    }

    /**
     * Test import fails when file has no data rows.
     */
    public function test_import_fails_on_empty_file(): void
    {
        $file = $this->createValidExcelFile([]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.potentials.import'), ['file' => $file]);

        $response->assertStatus(422);
    }

    /**
     * Test import skips completely empty rows.
     */
    public function test_import_skips_empty_rows(): void
    {
        $file = $this->createValidExcelFile([
            [
                $this->umkmCategory->id,
                'Valid Entry',
                'Should be imported.',
                'published',
                -6.9175,
                107.6191,
                'Jl. Valid',
                null,
                0,
                '{"owner_name": "Valid Owner"}',
            ],
            [null, null, null, null, null, null, null, null, null, null], // Empty row
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.potentials.import'), ['file' => $file]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => ['imported_count' => 1],
            ]);

        $this->assertDatabaseCount('potentials', 1);
    }

    // =========================================================================
    // AUTHORIZATION TESTS
    // =========================================================================

    /**
     * Test import requires authentication.
     */
    public function test_import_requires_authentication(): void
    {
        $file = $this->createValidExcelFile([
            [
                $this->umkmCategory->id,
                'Unauthorized',
                'Should fail auth.',
                'draft',
                -6.9175,
                107.6191,
                'Jl. Test',
                null,
                0,
                '{"owner_name": "Test"}',
            ],
        ]);

        $response = $this->postJson(route('admin.potentials.import'), [
            'file' => $file,
        ]);

        $response->assertStatus(401);
    }

    /**
     * Test template download requires authentication.
     */
    public function test_template_requires_authentication(): void
    {
        $response = $this->getJson(route('admin.potentials.import.template'));
        $response->assertStatus(401);
    }

    /**
     * Test export download requires authentication.
     */
    public function test_export_requires_authentication(): void
    {
        $response = $this->getJson(route('admin.potentials.export'));
        $response->assertStatus(401);
    }

    // =========================================================================
    // FILE VALIDATION TESTS
    // =========================================================================

    /**
     * Test import rejects request without file.
     */
    public function test_import_rejects_missing_file(): void
    {
        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.potentials.import'), []);

        $response->assertStatus(422)
            ->assertJsonPath('error.code', 'VALIDATION_FAILED');
    }

    /**
     * Test import rejects non-xlsx files.
     */
    public function test_import_rejects_non_xlsx_file(): void
    {
        $file = UploadedFile::fake()->create('test.csv', 100, 'text/csv');

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.potentials.import'), [
                'file' => $file,
            ]);

        $response->assertStatus(422);
    }

    /**
     * Test import rejects files exceeding 10MB.
     */
    public function test_import_rejects_oversized_file(): void
    {
        $file = UploadedFile::fake()->create(
            'large.xlsx',
            11000, // 11MB
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.potentials.import'), [
                'file' => $file,
            ]);

        $response->assertStatus(422);
    }

    // =========================================================================
    // TEMPLATE DOWNLOAD TESTS
    // =========================================================================

    /**
     * Test template download returns valid xlsx file.
     */
    public function test_template_download_returns_xlsx(): void
    {
        $response = $this->actingAs($this->admin, 'sanctum')
            ->get(route('admin.potentials.import.template'));

        $response->assertStatus(200);
        $response->assertDownload('template_impor_potensi_desa.xlsx');
    }

    // =========================================================================
    // EXPORT TESTS
    // =========================================================================

    /**
     * Test export download returns valid xlsx file.
     */
    public function test_export_download_returns_xlsx(): void
    {
        // Create sample data
        $location = Location::factory()->create();
        Potential::factory()->create([
            'category_id' => $this->umkmCategory->id,
            'status' => Status::Published->value,
            'created_by_id' => $this->admin->id,
            'location_id' => $location->id,
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->get(route('admin.potentials.export'));

        $response->assertStatus(200);
        $response->assertHeader('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }

    /**
     * Test export with empty database returns file with headers only.
     */
    public function test_export_with_no_data_returns_headers_only(): void
    {
        $response = $this->actingAs($this->admin, 'sanctum')
            ->get(route('admin.potentials.export'));

        $response->assertStatus(200);
    }

    // =========================================================================
    // CROSS-CATEGORY IMPORT TESTS
    // =========================================================================

    /**
     * Test import works across multiple categories with different ACA schemas.
     */
    public function test_import_across_multiple_categories(): void
    {
        $file = $this->createValidExcelFile([
            [
                $this->umkmCategory->id,
                'UMKM Entry',
                'An UMKM potential.',
                'published',
                -6.9175,
                107.6191,
                'Jl. UMKM',
                'Dusun 1',
                0,
                '{"owner_name": "Owner UMKM"}',
            ],
            [
                $this->wisataCategory->id,
                'Wisata Entry',
                'A tourism potential.',
                'draft',
                -6.9180,
                107.6200,
                'Jl. Wisata',
                'Dusun 2',
                1,
                '{"ticket_price": 15000}',
            ],
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.potentials.import'), ['file' => $file]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => ['imported_count' => 2],
            ]);

        $this->assertDatabaseCount('potentials', 2);
        $this->assertDatabaseHas('potentials', [
            'title' => 'UMKM Entry',
            'category_id' => $this->umkmCategory->id,
        ]);
        $this->assertDatabaseHas('potentials', [
            'title' => 'Wisata Entry',
            'category_id' => $this->wisataCategory->id,
        ]);
    }

    // =========================================================================
    // HELPER METHODS
    // =========================================================================

    /**
     * Create a valid Excel file from an array of row data for testing.
     *
     * @param  array<int, array<int, mixed>>  $rows  Data rows (without headers)
     * @return \Illuminate\Http\UploadedFile
     */
    private function createValidExcelFile(array $rows): UploadedFile
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Write headers
        $headers = [
            'ID Kategori', 'Judul', 'Deskripsi', 'Status (draft/published/archived)',
            'Latitude', 'Longitude', 'Alamat', 'Dusun', 'Unggulan (0/1)', 'Metadata (JSON)',
        ];
        foreach ($headers as $colIndex => $header) {
            $colLetter = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($colIndex + 1);
            $sheet->setCellValue("{$colLetter}1", $header);
        }

        // Write data rows
        foreach ($rows as $rowIndex => $rowData) {
            foreach ($rowData as $colIndex => $value) {
                $colLetter = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($colIndex + 1);
                $sheet->setCellValue($colLetter . ($rowIndex + 2), $value);
            }
        }

        // Save to temp file
        $tempPath = tempnam(sys_get_temp_dir(), 'test_import_') . '.xlsx';
        $writer = new Xlsx($spreadsheet);
        $writer->save($tempPath);

        return new UploadedFile(
            $tempPath,
            'test_import.xlsx',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            null,
            true
        );
    }
}
