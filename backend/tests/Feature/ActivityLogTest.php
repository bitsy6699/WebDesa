<?php

namespace Tests\Feature;

use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ActivityLogTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create();
    }

    /**
     * Test index requires authentication.
     */
    public function test_index_requires_authentication(): void
    {
        $response = $this->getJson(route('admin.activity-logs.index'));
        $response->assertStatus(401);
    }

    /**
     * Test index returns paginated activity logs.
     */
    public function test_index_returns_paginated_activity_logs(): void
    {
        ActivityLog::factory()->count(20)->create([
            'user_id' => $this->admin->id,
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->getJson(route('admin.activity-logs.index'));

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'action',
                        'subject_id',
                        'subject_type',
                        'ip_address',
                        'created_at',
                        'user' => [
                            'id',
                            'username',
                        ],
                    ],
                ],
                'meta' => [
                    'current_page',
                    'last_page',
                    'per_page',
                    'total',
                ],
                'links' => [
                    'prev',
                    'next',
                ],
            ]);
    }

    /**
     * Test index filters by action slug.
     */
    public function test_index_filters_by_action_slug(): void
    {
        ActivityLog::factory()->count(5)->create([
            'user_id' => $this->admin->id,
            'action' => 'potential.created',
        ]);

        ActivityLog::factory()->count(10)->create([
            'user_id' => $this->admin->id,
            'action' => 'potential.updated',
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->getJson(route('admin.activity-logs.index', ['action' => 'potential.created']));

        $response->assertStatus(200)
            ->assertJsonCount(5, 'data');
    }

    /**
     * Test index defaults to 15 per page.
     */
    public function test_index_defaults_to_15_per_page(): void
    {
        ActivityLog::factory()->count(20)->create([
            'user_id' => $this->admin->id,
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->getJson(route('admin.activity-logs.index'));

        $response->assertStatus(200);
        $this->assertEquals(15, $response->json('meta.per_page'));
        $this->assertCount(15, $response->json('data'));
    }

    /**
     * Test index respects per_page parameter.
     */
    public function test_index_respects_per_page_parameter(): void
    {
        ActivityLog::factory()->count(10)->create([
            'user_id' => $this->admin->id,
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->getJson(route('admin.activity-logs.index', ['per_page' => 5]));

        $response->assertStatus(200);
        $this->assertEquals(5, $response->json('meta.per_page'));
        $this->assertCount(5, $response->json('data'));
    }

    /**
     * Test per_page is clamped to max 50.
     */
    public function test_per_page_is_clamped_to_max_50(): void
    {
        ActivityLog::factory()->count(60)->create([
            'user_id' => $this->admin->id,
        ]);

        $response = $actingResponse = $this->actingAs($this->admin, 'sanctum')
            ->getJson(route('admin.activity-logs.index', ['per_page' => 100]));

        $response->assertStatus(422); // Validation fails for max 50
    }
}
