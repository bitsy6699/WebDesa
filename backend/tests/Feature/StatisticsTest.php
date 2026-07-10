<?php

namespace Tests\Feature;

use App\Enums\Status;
use App\Models\Category;
use App\Models\Location;
use App\Models\Potential;
use App\Models\User;
use App\Support\Constants;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class StatisticsTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected Category $umkmCategory;
    protected Category $wisataCategory;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create();

        // Seed Categories
        $this->umkmCategory = Category::create([
            'label' => 'UMKM',
            'slug' => 'umkm',
            'icon_key' => 'store',
            'color_code' => '#FF0000'
        ]);

        $this->wisataCategory = Category::create([
            'label' => 'Wisata',
            'slug' => 'wisata',
            'icon_key' => 'compass',
            'color_code' => '#00FF00'
        ]);

        // Seed Locations representing distinct Dusun values
        $loc1 = Location::create(['latitude' => -6.123, 'longitude' => 106.123, 'address' => 'Addr 1', 'dusun' => 'Dusun I']);
        $loc2 = Location::create(['latitude' => -6.124, 'longitude' => 106.124, 'address' => 'Addr 2', 'dusun' => 'Dusun II']);
        $loc3 = Location::create(['latitude' => -6.125, 'longitude' => 106.125, 'address' => 'Addr 3', 'dusun' => 'Dusun I']); // Repeated dusun name

        // 1. Published UMKM potential
        Potential::create([
            'category_id' => $this->umkmCategory->id,
            'title' => 'UMKM Published 1',
            'slug' => 'umkm-published-1',
            'description' => 'Desc',
            'status' => Status::Published->value,
            'location_id' => $loc1->id,
            'created_by_id' => $this->admin->id
        ]);

        // 2. Draft UMKM potential (Should be excluded per BR-STAT-01)
        Potential::create([
            'category_id' => $this->umkmCategory->id,
            'title' => 'UMKM Draft 1',
            'slug' => 'umkm-draft-1',
            'description' => 'Desc',
            'status' => Status::Draft->value,
            'location_id' => $loc2->id,
            'created_by_id' => $this->admin->id
        ]);

        // 3. Published Wisata potential
        Potential::create([
            'category_id' => $this->wisataCategory->id,
            'title' => 'Wisata Published 1',
            'slug' => 'wisata-published-1',
            'description' => 'Desc',
            'status' => Status::Published->value,
            'location_id' => $loc3->id,
            'created_by_id' => $this->admin->id
        ]);
    }

    /**
     * Test public statistics summary endpoint.
     */
    public function test_get_summary_returns_valid_counters(): void
    {
        $response = $this->getJson(route('statistics.summary'));

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'total_potentials' => 2, // Only published ones
                    'total_umkm'       => 1, // Only published UMKM
                    'total_categories' => 2, // Both Categories exist
                    'total_dusun'      => 1, // Unique dusun holding published potentials ('Dusun I' has both. 'Dusun II' has only a Draft)
                ]
            ]);
    }

    /**
     * Test statistics endpoint serves results from cache.
     */
    public function test_get_summary_serves_from_cache(): void
    {
        // First request primes cache
        $this->getJson(route('statistics.summary'))->assertStatus(200);
        $this->assertTrue(Cache::has(Constants::CACHE_KEY_STATISTICS));

        // Second request should hit cache
        $response = $this->getJson(route('statistics.summary'));
        $response->assertStatus(200);
    }
}
