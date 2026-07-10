<?php

namespace Tests\Feature;

use App\Enums\Status;
use App\Models\Category;
use App\Models\CategorySchema;
use App\Models\Location;
use App\Models\Media;
use App\Models\Potential;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class PotentialTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected Category $umkmCategory;
    protected CategorySchema $umkmSchema;

    protected function setUp(): void
    {
        parent::setUp();

        // Populate base records for test cases
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
                ]
            ]
        ]);
    }

    /**
     * Test public index lists published potentials and omits drafts.
     */
    public function test_public_index_filters_out_drafts(): void
    {
        // Published listing
        Potential::factory()->create([
            'category_id' => $this->umkmCategory->id,
            'status' => Status::Published->value,
            'created_by_id' => $this->admin->id,
        ]);

        // Draft listing
        Potential::factory()->create([
            'category_id' => $this->umkmCategory->id,
            'status' => Status::Draft->value,
            'created_by_id' => $this->admin->id,
        ]);

        $response = $this->getJson(route('potentials.index'));

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }

    /**
     * Test sorting parameters.
     */
    public function test_public_index_sorts_correctly(): void
    {
        $pot1 = Potential::factory()->create([
            'title' => 'Alpha Potential',
            'category_id' => $this->umkmCategory->id,
            'status' => Status::Published->value,
            'created_by_id' => $this->admin->id,
            'created_at' => now()->subDay(),
        ]);

        $pot2 = Potential::factory()->create([
            'title' => 'Beta Potential',
            'category_id' => $this->umkmCategory->id,
            'status' => Status::Published->value,
            'created_by_id' => $this->admin->id,
            'created_at' => now(),
        ]);

        // Sort by name
        $response = $this->getJson(route('potentials.index', ['sort' => 'name']));
        $response->assertStatus(200);
        $this->assertEquals('Alpha Potential', $response->json('data.0.title'));

        // Sort by latest
        $response = $this->getJson(route('potentials.index', ['sort' => 'latest']));
        $this->assertEquals('Beta Potential', $response->json('data.0.title'));
    }

    /**
     * Test public show endpoint retrieves full metadata.
     */
    public function test_public_show_retrieves_detailed_fields(): void
    {
        $potential = Potential::factory()->create([
            'category_id' => $this->umkmCategory->id,
            'status' => Status::Published->value,
            'created_by_id' => $this->admin->id,
            'metadata' => [
                'owner_name' => 'Mang Budi',
                'price_range' => 'Rp 20.000',
            ]
        ]);

        $response = $this->getJson(route('potentials.show', [
            'category_slug' => $this->umkmCategory->slug,
            'slug' => $potential->slug
        ]));

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'title' => $potential->title,
                    'metadata' => [
                        'owner_name' => 'Mang Budi',
                        'price_range' => 'Rp 20.000',
                    ]
                ]
            ]);
    }

    /**
     * Test dynamic validation constraints (Store Request).
     */
    public function test_dynamic_validation_fails_on_missing_required_metadata_field(): void
    {
        $cover = Media::factory()->create();

        // owner_name is required in the schema definition
        $payload = [
            'category_id' => $this->umkmCategory->id,
            'title' => 'Madu Robusta',
            'description' => 'Madu robusta murni.',
            'status' => Status::Published->value,
            'cover_image_id' => $cover->id,
            'latitude' => -6.8000,
            'longitude' => 107.9000,
            'address' => 'Jalan Cikondang',
            'metadata' => [
                'price_range' => 'Rp 50.000',
                // owner_name missing!
            ]
        ];

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.potentials.store'), $payload);

        $response->assertStatus(422)
            ->assertJsonStructure([
                'error' => [
                    'details' => [
                        'metadata.owner_name'
                    ]
                ]
            ]);
    }

    /**
     * Test dynamic validation passes on valid metadata payload.
     */
    public function test_dynamic_validation_passes_on_valid_payload(): void
    {
        $cover = Media::factory()->create();

        $payload = [
            'category_id' => $this->umkmCategory->id,
            'title' => 'Madu Robusta',
            'description' => 'Madu robusta murni.',
            'status' => Status::Published->value,
            'cover_image_id' => $cover->id,
            'latitude' => -6.8000,
            'longitude' => 107.9000,
            'address' => 'Jalan Cikondang',
            'metadata' => [
                'owner_name' => 'Mang Saswi',
                'price_range' => 'Rp 50.000',
            ]
        ];

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.potentials.store'), $payload);

        $response->assertStatus(201);
        $this->assertDatabaseHas('potentials', ['title' => 'Madu Robusta']);
    }

    /**
     * Test transaction safety: location coordinate insert rolls back if potential create fails.
     */
    public function test_transaction_rolls_back_on_failed_insert(): void
    {
        $locationsCountBefore = Location::count();

        // Send payload missing validation fields to force failure
        $payload = [
            'category_id' => $this->umkmCategory->id,
            'title' => 'Corrupt Potential',
            // description missing, fails database nullable constraint or Stage 1 validation
            'latitude' => -6.8000,
            'longitude' => 107.9000,
            'address' => 'Jalan Wangi',
        ];

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson(route('admin.potentials.store'), $payload);

        $response->assertStatus(422);
        
        // Assert no location details were left orphaned
        $this->assertEquals($locationsCountBefore, Location::count());
    }

    /**
     * Test authorization policy protection.
     */
    public function test_unauthenticated_requests_are_denied_access(): void
    {
        $this->postJson(route('admin.potentials.store'), [])
            ->assertStatus(401);
    }

    /**
     * Test caching and cache invalidation.
     */
    public function test_admin_modifications_invalidate_cache(): void
    {
        $potential = Potential::factory()->create([
            'category_id' => $this->umkmCategory->id,
            'status' => Status::Published->value,
            'created_by_id' => $this->admin->id,
        ]);

        // Eager load show cache
        $this->getJson(route('potentials.show', [
            'category_slug' => $this->umkmCategory->slug,
            'slug' => $potential->slug
        ]))->assertStatus(200);

        $cacheKey = "potential_detail_{$this->umkmCategory->slug}_{$potential->slug}";
        $this->assertTrue(Cache::has($cacheKey));

        // Update listing
        $payload = [
            'category_id' => $this->umkmCategory->id,
            'title' => 'Updated Title',
            'description' => 'Updated desc.',
            'status' => Status::Published->value,
            'latitude' => -6.8010,
            'longitude' => 107.9010,
            'address' => 'New Address',
            'metadata' => [
                'owner_name' => 'Mang Budi',
            ]
        ];

        $this->actingAs($this->admin, 'sanctum')
            ->putJson(route('admin.potentials.update', ['id' => $potential->id]), $payload)
            ->assertStatus(200);

        // Verify cache invalidation
        $this->assertFalse(Cache::has($cacheKey));
    }
}
