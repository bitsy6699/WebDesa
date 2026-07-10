<?php

namespace Tests\Feature;

use App\Support\Constants;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HealthTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test health endpoint returns ok status.
     */
    public function test_health_endpoint_returns_ok_status(): void
    {
        $response = $this->getJson(route('health'));

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'status' => 'ok',
                    'version' => Constants::API_VERSION,
                ],
            ])
            ->assertJsonStructure([
                'success',
                'data' => [
                    'status',
                    'version',
                    'timestamp',
                ],
            ]);
    }

    /**
     * Test health endpoint requires no authentication.
     */
    public function test_health_endpoint_requires_no_authentication(): void
    {
        // Simply call it without credentials
        $response = $this->getJson(route('health'));
        $response->assertStatus(200);
    }
}
