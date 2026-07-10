<?php

namespace Tests\Feature;

use App\Enums\Status;
use App\Models\Category;
use App\Models\CategorySchema;
use App\Models\Location;
use App\Models\Media;
use App\Models\Potential;
use App\Models\User;
use App\Models\Setting;
use App\Models\ActivityLog;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class DatabaseCoreTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test UUID v4 primary keys are automatically generated.
     */
    public function test_models_automatically_generate_uuid_keys(): void
    {
        $user = User::factory()->create();
        $this->assertTrue(Str::isUuid($user->id));

        $category = Category::factory()->umkm()->create();
        $this->assertTrue(Str::isUuid($category->id));

        $location = Location::factory()->create();
        $this->assertTrue(Str::isUuid($location->id));

        $media = Media::factory()->create();
        $this->assertTrue(Str::isUuid($media->id));

        $potential = Potential::factory()->create([
            'category_id' => $category->id,
            'location_id' => $location->id,
            'created_by_id' => $user->id,
        ]);
        $this->assertTrue(Str::isUuid($potential->id));
    }

    /**
     * Test PotentialObserver automatically generates URL slugs.
     */
    public function test_potential_observer_generates_unique_slugs(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->umkm()->create();

        $potential1 = Potential::factory()->create([
            'title' => 'Madu Asli Hutan Karamatwangi',
            'category_id' => $category->id,
            'created_by_id' => $user->id,
        ]);

        $this->assertEquals('madu-asli-hutan-karamatwangi', $potential1->slug);

        // Assert unique suffix handling on duplicate title creation
        $potential2 = Potential::factory()->create([
            'title' => 'Madu Asli Hutan Karamatwangi',
            'category_id' => $category->id,
            'created_by_id' => $user->id,
        ]);

        $this->assertEquals('madu-asli-hutan-karamatwangi-1', $potential2->slug);
    }

    /**
     * Test model casts for metadata and status.
     */
    public function test_models_cast_metadata_and_status_correctly(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->umkm()->create();

        $metadataPayload = [
            'owner_name' => 'Mang Udin',
            'products' => ['Kopi Robusta', 'Kopi Gayo'],
        ];

        $potential = Potential::factory()->create([
            'category_id' => $category->id,
            'created_by_id' => $user->id,
            'status' => Status::Published,
            'metadata' => $metadataPayload,
        ]);

        // Assert casts
        $this->assertInstanceOf(Status::class, $potential->status);
        $this->assertEquals(Status::Published, $potential->status);
        $this->assertIsArray($potential->metadata);
        $this->assertEquals('Mang Udin', $potential->metadata['owner_name']);
        $this->assertEquals(['Kopi Robusta', 'Kopi Gayo'], $potential->metadata['products']);
    }

    /**
     * Test soft delete behavior.
     */
    public function test_potential_supports_soft_deletes(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->umkm()->create();
        $potential = Potential::factory()->create([
            'category_id' => $category->id,
            'created_by_id' => $user->id,
        ]);

        $potentialId = $potential->id;
        $potential->delete();

        // Check database entry retains row but soft deleted
        $this->assertSoftDeleted('potentials', ['id' => $potentialId]);

        // Default query excludes deleted listing
        $this->assertNull(Potential::find($potentialId));

        // With trashed query retrieves it
        $this->assertNotNull(Potential::withTrashed()->find($potentialId));
    }

    /**
     * Test settings key-value-type-group mapping.
     */
    public function test_settings_fields_are_fully_fillable(): void
    {
        $setting = Setting::create([
            'key' => 'site.name',
            'value' => 'Portal Desa',
            'type' => 'string',
            'group' => 'general',
        ]);

        $this->assertEquals('site.name', $setting->key);
        $this->assertEquals('Portal Desa', $setting->value);
        $this->assertEquals('string', $setting->type);
        $this->assertEquals('general', $setting->group);
    }

    /**
     * Test activity logs polymorphic mapping.
     */
    public function test_activity_logs_map_subjects_polymorphically(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->umkm()->create();

        $log = ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'category.created',
            'subject_id' => $category->id,
            'subject_type' => Category::class,
            'ip_address' => '127.0.0.1',
        ]);

        $this->assertInstanceOf(Category::class, $log->subject);
        $this->assertEquals($category->label, $log->subject->label);
    }
}
