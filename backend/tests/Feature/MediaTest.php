<?php

namespace Tests\Feature;

use App\Models\Media;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class MediaTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create();

        // Swap to virtual storage disk context
        Storage::fake('public');
    }

    /**
     * Test uploading a valid JPG image converts it to WebP and resizes to 1200px width limit.
     */
    public function test_uploading_image_resizes_and_converts_to_webp(): void
    {
        // 1600x1200 image
        $image = UploadedFile::fake()->image('nature.jpg', 1600, 1200);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.media.upload'), [
                'file' => $image,
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'id',
                    'filename',
                    'filepath',
                    'filetype',
                    'filesize',
                ],
            ]);

        $mediaId = $response->json('data.id');
        $filepath = $response->json('data.filepath');

        // Extract relative filepath parameter
        $dbPath = Media::findOrFail($mediaId)->filepath;

        // Verify physical file was created in virtual disk
        Storage::disk('public')->assertExists($dbPath);

        // Verify it was saved as WebP format
        $this->assertEquals('image/webp', $response->json('data.filetype'));
        $this->assertStringEndsWith('.webp', $response->json('data.filename'));

        // Load visual details from virtual disk to verify dimensions
        $fullDiskPath = Storage::disk('public')->path($dbPath);
        $gdImage = imagecreatefromwebp($fullDiskPath);
        $this->assertEquals(1200, imagesx($gdImage)); // Resized to max 1200px width limit
        imagedestroy($gdImage);
    }

    /**
     * Test uploading file constraints.
     */
    public function test_uploading_invalid_file_type_fails_validation(): void
    {
        $document = UploadedFile::fake()->create('contract.pdf', 100, 'application/pdf');

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.media.upload'), [
                'file' => $document,
            ]);

        $response->assertStatus(422)
            ->assertJsonStructure([
                'error' => [
                    'details' => [
                        'file',
                    ],
                ],
            ]);
    }

    /**
     * Test unauthenticated requests are blocked.
     */
    public function test_unauthenticated_requests_are_denied_access(): void
    {
        $image = UploadedFile::fake()->image('nature.jpg');

        $this->postJson(route('admin.media.upload'), ['file' => $image])
            ->assertStatus(401);
    }

    /**
     * Test deleting a media file deletes database row and physical disk file.
     */
    public function test_deleting_media_removes_record_and_file(): void
    {
        $image = UploadedFile::fake()->image('nature.jpg', 600, 400);

        // Upload first
        $uploadResponse = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.media.upload'), [
                'file' => $image,
            ]);

        $mediaId = $uploadResponse->json('data.id');
        $media = Media::findOrFail($mediaId);

        // Verify exists
        Storage::disk('public')->assertExists($media->filepath);

        // Delete
        $deleteResponse = $this->actingAs($this->admin, 'sanctum')
            ->deleteJson(route('admin.media.destroy', ['id' => $mediaId]));

        $deleteResponse->assertStatus(204);

        // Verify removed from database and disk
        $this->assertDatabaseMissing('media', ['id' => $mediaId]);
        Storage::disk('public')->assertMissing($media->filepath);
    }
}
