<?php

namespace App\Services;

use App\Exceptions\ApiException;
use App\Models\User;
use App\Support\Constants;
use Illuminate\Support\Facades\Hash;

/**
 * AuthService
 *
 * Handles administrative credential verification, session pruning, token generation, and revocation.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §9 Authentication Architecture
 * @see docs/development/CODING_RULES.md §7 Security Hardening Rules
 */
class AuthService extends BaseService
{
    /**
     * Create a new AuthService instance.
     */
    public function __construct(
        protected ActivityLogService $activityLogService
    ) {}

    /**
     * Authenticate an administrator and generate a token.
     *
     * @param  string  $username
     * @param  string  $password
     * @param  string  $ipAddress
     * @return array{token: string, user: \App\Models\User}
     *
     * @throws \App\Exceptions\ApiException
     */
    public function login(string $username, string $password, string $ipAddress): array
    {
        return $this->executeSafely(function () use ($username, $password, $ipAddress) {
            $user = User::where('username', $username)->first();

            if (!$user || !Hash::check($password, $user->password)) {
                throw new ApiException(
                    errorCode: 'INVALID_CREDENTIALS',
                    message: 'Nama pengguna atau kata sandi salah.',
                    statusCode: 401
                );
            }

            // Prune expired tokens if database contains any
            $user->tokens()->where('expires_at', '<', now())->delete();

            // Generate Sanctum token
            $token = $user->createToken(Constants::AUTH_TOKEN_NAME)->plainTextToken;

            // Log activity
            $this->activityLogService->log(
                user: $user,
                action: 'auth.login',
                subjectId: $user->id,
                subjectType: User::class,
                ipAddress: $ipAddress
            );

            return [
                'token' => $token,
                'user' => $user,
            ];
        }, 'Gagal melakukan login.');
    }

    /**
     * Revoke the current active token session.
     *
     * @param  \App\Models\User  $user
     * @param  string  $ipAddress
     * @return void
     */
    public function logout(User $user, string $ipAddress): void
    {
        $this->executeSafely(function () use ($user, $ipAddress) {
            $token = $user->currentAccessToken();

            if ($token) {
                $token->delete();
            }

            $this->activityLogService->log(
                user: $user,
                action: 'auth.logout',
                subjectId: $user->id,
                subjectType: User::class,
                ipAddress: $ipAddress
            );
        }, 'Gagal melakukan logout.');
    }
}
