<?php

namespace Tests\Feature;

use App\Models\Setting;
use App\Models\User;
use App\Support\Constants;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class SettingsTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create();

        // Seed required settings
        Setting::create(['key' => 'site.name', 'value' => 'Potensi Desa Karamatwangi', 'type' => 'string', 'group' => 'site']);
        Setting::create(['key' => 'site.whatsapp', 'value' => '6281234567890', 'type' => 'string', 'group' => 'site']);
        Setting::create(['key' => 'map.default_zoom', 'value' => '14', 'type' => 'integer', 'group' => 'map']);
    }

    /**
     * Test public endpoint returns all settings wrapped in SettingResource.
     */
    public function test_public_index_returns_all_settings(): void
    {
        $response = $this->getJson(route('settings.index'));

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => ['key', 'value', 'type', 'group'],
                ],
            ]);

        $this->assertCount(3, $response->json('data'));
    }

    /**
     * Test public endpoint serves settings from cache on repeated calls.
     */
    public function test_public_index_serves_from_cache(): void
    {
        // First call primes cache
        $this->getJson(route('settings.index'))->assertStatus(200);
        $this->assertTrue(Cache::has(Constants::CACHE_KEY_SETTINGS));

        // Second call should resolve from cache (DB query count remains minimal)
        $this->getJson(route('settings.index'))->assertStatus(200);
    }

    /**
     * Test admin can update settings and cache is invalidated.
     */
    public function test_admin_can_update_settings_and_cache_is_cleared(): void
    {
        // Prime cache
        $this->getJson(route('settings.index'));
        $this->assertTrue(Cache::has(Constants::CACHE_KEY_SETTINGS));

        $payload = [
            'settings' => [
                ['key' => 'site.name', 'value' => 'Portal Desa Karamatwangi'],
                ['key' => 'site.whatsapp', 'value' => '6289876543210'],
            ],
        ];

        $response = $this->actingAs($this->admin, 'sanctum')
            ->putJson(route('admin.settings.update'), $payload);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Konfigurasi berhasil diperbarui.',
            ]);

        // Verify database was updated
        $this->assertDatabaseHas('settings', ['key' => 'site.name', 'value' => 'Portal Desa Karamatwangi']);
        $this->assertDatabaseHas('settings', ['key' => 'site.whatsapp', 'value' => '6289876543210']);

        // Verify cache was cleared
        $this->assertFalse(Cache::has(Constants::CACHE_KEY_SETTINGS));
    }

    /**
     * Test submitting an unknown key returns validation error.
     */
    public function test_update_with_unknown_key_returns_validation_error(): void
    {
        $payload = [
            'settings' => [
                ['key' => 'nonexistent.key', 'value' => 'somevalue'],
            ],
        ];

        $response = $this->actingAs($this->admin, 'sanctum')
            ->putJson(route('admin.settings.update'), $payload);

        $response->assertStatus(422)
            ->assertJsonStructure([
                'error' => [
                    'details' => [
                        'settings.0.key',
                    ],
                ],
            ]);
    }

    /**
     * Test unauthenticated requests to admin endpoint return 401.
     */
    public function test_unauthenticated_update_returns_unauthorized(): void
    {
        $this->putJson(route('admin.settings.update'), [
            'settings' => [
                ['key' => 'site.name', 'value' => 'Test'],
            ],
        ])->assertStatus(401);
    }

    /**
     * Test BR-CON-01: site.whatsapp is readable and returns fallback contact.
     */
    public function test_br_con_01_site_whatsapp_is_retrievable(): void
    {
        $response = $this->getJson(route('settings.index'));

        $settings = collect($response->json('data'));
        $whatsapp = $settings->firstWhere('key', 'site.whatsapp');

        $this->assertNotNull($whatsapp);
        $this->assertEquals('6281234567890', $whatsapp['value']);
    }
}
