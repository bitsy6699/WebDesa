<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * ApiResponse Trait
 *
 * Provides standardized JSON response methods for all API controllers.
 * This is the single source of truth for API response formatting.
 *
 * Response format follows the API Specification:
 * - Success: { "success": true, "data": {}, "message": "..." }
 * - Error: { "success": false, "error": { "code": "...", "message": "...", "details": {} } }
 * - Paginated: { "success": true, "data": [], "meta": {}, "links": {} }
 *
 * @see docs/engineering/API_SPEC.md §2 API Standards & Formats
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §14 Error Handling Strategy
 */
trait ApiResponse
{
    /**
     * Return a standard success response.
     *
     * @param  mixed  $data  The response payload
     * @param  string  $message  Human-readable success message
     * @param  int  $statusCode  HTTP status code (default: 200)
     */
    protected function success(
        mixed $data = null,
        string $message = 'Operasi berhasil.',
        int $statusCode = 200
    ): JsonResponse {
        $response = [
            'success' => true,
            'message' => $message,
        ];

        if ($data !== null) {
            $response['data'] = $data;
        }

        return response()->json($response, $statusCode);
    }

    /**
     * Return a success response for resource creation (201 Created).
     *
     * @param  mixed  $data  The created resource payload
     * @param  string  $message  Human-readable success message
     */
    protected function created(
        mixed $data = null,
        string $message = 'Data berhasil dibuat.'
    ): JsonResponse {
        return $this->success($data, $message, 201);
    }

    /**
     * Return a no-content response (204 No Content).
     * Used for successful deletion operations.
     */
    protected function noContent(): JsonResponse
    {
        return response()->json(null, 204);
    }

    /**
     * Return a standard error response.
     *
     * @param  string  $code  Machine-readable error code (e.g., 'NOT_FOUND')
     * @param  string  $message  Human-readable error description
     * @param  int  $statusCode  HTTP status code (default: 400)
     * @param  array<string, mixed>|null  $details  Additional error context
     */
    protected function error(
        string $code,
        string $message,
        int $statusCode = 400,
        ?array $details = null
    ): JsonResponse {
        $response = [
            'success' => false,
            'error' => [
                'code' => $code,
                'message' => $message,
            ],
        ];

        if ($details !== null) {
            $response['error']['details'] = $details;
        }

        return response()->json($response, $statusCode);
    }

    /**
     * Return a validation error response (422 Unprocessable Entity).
     *
     * @param  array<string, array<int, string>>  $errors  Field-level validation errors
     * @param  string  $message  Human-readable validation message
     */
    protected function validationError(
        array $errors,
        string $message = 'Data input tidak valid.'
    ): JsonResponse {
        return $this->error('VALIDATION_FAILED', $message, 422, $errors);
    }

    /**
     * Return an authentication error response (401 Unauthorized).
     *
     * @param  string  $message  Human-readable authentication message
     */
    protected function unauthorized(
        string $message = 'Autentikasi diperlukan.'
    ): JsonResponse {
        return $this->error('UNAUTHENTICATED', $message, 401);
    }

    /**
     * Return a forbidden error response (403 Forbidden).
     *
     * @param  string  $message  Human-readable authorization message
     */
    protected function forbidden(
        string $message = 'Anda tidak memiliki akses.'
    ): JsonResponse {
        return $this->error('FORBIDDEN', $message, 403);
    }

    /**
     * Return a not-found error response (404 Not Found).
     *
     * @param  string  $message  Human-readable not-found message
     */
    protected function notFound(
        string $message = 'Data tidak ditemukan.'
    ): JsonResponse {
        return $this->error('NOT_FOUND', $message, 404);
    }

    /**
     * Return a server error response (500 Internal Server Error).
     *
     * @param  string  $message  Human-readable server error message
     */
    protected function serverError(
        string $message = 'Terjadi kesalahan pada server.'
    ): JsonResponse {
        return $this->error('SERVER_ERROR', $message, 500);
    }

    /**
     * Return a paginated response with meta and links.
     *
     * Wraps Laravel's paginated results into the standardized API format
     * with `meta` (current_page, last_page, per_page, total) and
     * `links` (prev, next) keys.
     *
     * @param  \Illuminate\Pagination\LengthAwarePaginator  $paginator  The paginated result
     * @param  string|null  $resourceClass  Optional API Resource class for transforming items
     */
    protected function paginated(
        mixed $paginator,
        ?string $resourceClass = null
    ): JsonResponse {
        $items = $resourceClass
            ? $resourceClass::collection($paginator->items())
            : $paginator->items();

        return response()->json([
            'success' => true,
            'data' => $items,
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
            ],
            'links' => [
                'prev' => $paginator->previousPageUrl(),
                'next' => $paginator->nextPageUrl(),
            ],
        ], 200);
    }
}
