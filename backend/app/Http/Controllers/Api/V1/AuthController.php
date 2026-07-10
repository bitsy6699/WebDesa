<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\AuthResource;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * AuthController
 *
 * Coordinates administrator authentication requests.
 *
 * @see docs/engineering/API_SPEC.md §3 Authentication Endpoints
 * @see docs/development/CODING_RULES.md §4.1 Thin Controllers
 */
class AuthController extends BaseController
{
    /**
     * Create a new AuthController instance.
     */
    public function __construct(
        protected AuthService $authService
    ) {}

    /**
     * Authenticate administrative user credentials.
     *
     * @param  \App\Http\Requests\LoginRequest  $request
     * @return \App\Http\Resources\AuthResource
     */
    public function login(LoginRequest $request): AuthResource
    {
        $result = $this->authService->login(
            $request->input('username'),
            $request->input('password'),
            $request->ip() ?? '127.0.0.1'
        );

        return new AuthResource($result);
    }

    /**
     * Terminate the active Sanctum session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();

        // Enforce fallback if auth resolved user is null (fail-safe)
        if (!$user) {
            return $this->unauthorized();
        }

        $this->authService->logout(
            $user,
            $request->ip() ?? '127.0.0.1'
        );

        return $this->success(null, 'Logged out successfully.');
    }

    /**
     * Retrieve the currently authenticated administrator.
     * Optional endpoint supporting frontend session restoration.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return $this->unauthorized();
        }

        return $this->success([
            'id' => $user->id,
            'username' => $user->username,
        ]);
    }
}
