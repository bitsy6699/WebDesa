<?php

namespace Tests\Feature;

use App\Models\User;
use App\Support\Constants;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test successful login returns auth resource token and credentials.
     */
    public function test_successful_login_returns_token_and_user(): void
    {
        $user = User::factory()->create([
            'username' => 'admin_test',
            'password' => Hash::make('secret123'),
        ]);

        $response = $this->postJson(route('auth.login'), [
            'username' => 'admin_test',
            'password' => 'secret123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'token',
                    'user' => [
                        'id',
                        'username',
                    ],
                ],
            ]);

        $token = $response->json('data.token');
        $this->assertNotEmpty($token);

        // Verify token exists in database personal_access_tokens
        $this->assertDatabaseHas('personal_access_tokens', [
            'tokenable_id' => $user->id,
            'name' => Constants::AUTH_TOKEN_NAME,
        ]);
    }

    /**
     * Test login failure with invalid password.
     */
    public function test_failed_login_returns_unauthorized_error(): void
    {
        User::factory()->create([
            'username' => 'admin_test',
            'password' => Hash::make('secret123'),
        ]);

        $response = $this->postJson(route('auth.login'), [
            'username' => 'admin_test',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'success' => false,
                'error' => [
                    'code' => 'INVALID_CREDENTIALS',
                    'message' => 'Nama pengguna atau kata sandi salah.',
                ],
            ]);
    }

    /**
     * Test login validation constraints.
     */
    public function test_login_validation_requires_username_and_password(): void
    {
        $response = $this->postJson(route('auth.login'), []);

        $response->assertStatus(422)
            ->assertJsonStructure([
                'success',
                'error' => [
                    'code',
                    'message',
                    'details' => [
                        'username',
                        'password',
                    ],
                ],
            ]);
    }

    /**
     * Test me endpoint retrieves current authenticated user.
     */
    public function test_me_endpoint_retrieves_authenticated_profile(): void
    {
        $user = User::factory()->create(['username' => 'current_admin']);

        // Request unauthenticated
        $this->getJson(route('auth.me'))->assertStatus(401);

        // Request authenticated
        $response = $this->actingAs($user, 'sanctum')->getJson(route('auth.me'));

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'id' => $user->id,
                    'username' => 'current_admin',
                ],
            ]);
    }

    /**
     * Test logout revokes token.
     */
    public function test_logout_revokes_current_access_token(): void
    {
        $user = User::factory()->create(['username' => 'logout_admin']);
        $token = $user->createToken(Constants::AUTH_TOKEN_NAME)->plainTextToken;

        // Verify token exists first
        $this->assertCount(1, $user->tokens);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson(route('auth.logout'));

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Logged out successfully.',
            ]);

        // Verify token is deleted
        $this->assertCount(0, $user->fresh()->tokens);
    }

    /**
     * Test logout removes only current token, leaving other active sessions intact.
     */
    public function test_logout_removes_only_current_active_token(): void
    {
        $user = User::factory()->create(['username' => 'multi_admin']);

        // Generate multiple active sessions
        $token1 = $user->createToken('session-1')->plainTextToken;
        $token2 = $user->createToken('session-2')->plainTextToken;

        $this->assertCount(2, $user->tokens);

        // Revoke token1 session
        $this->withHeader('Authorization', 'Bearer ' . $token1)
            ->postJson(route('auth.logout'))
            ->assertStatus(200);

        // Verify only 1 token remains (session-2)
        $remainingTokens = $user->fresh()->tokens;
        $this->assertCount(1, $remainingTokens);
        $this->assertEquals('session-2', $remainingTokens->first()->name);
    }

    /**
     * Test malformed bearer token rejection.
     */
    public function test_malformed_bearer_token_returns_unauthenticated(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer invalidtokenformat123456')
            ->getJson(route('auth.me'));

        $response->assertStatus(401);
    }
}
