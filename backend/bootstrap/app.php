<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use App\Exceptions\ApiException;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        apiPrefix: 'api/v1',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Apply ForceJsonResponse middleware to api route group to ensure JSON output
        $middleware->api(prepend: [
            \App\Http\Middleware\ForceJsonResponse::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Enforce standardized JSON error response format for all API exceptions
        $exceptions->render(function (\Throwable $e, Request $request) {
            if ($request->is('api/*') || $request->wantsJson()) {
                // 1. App-specific custom ApiException (Base for domain errors)
                if ($e instanceof ApiException) {
                    return response()->json($e->toArray(), $e->getStatusCode());
                }

                // 2. Validation Exception
                if ($e instanceof ValidationException) {
                    return response()->json([
                        'success' => false,
                        'error' => [
                            'code' => 'VALIDATION_FAILED',
                            'message' => 'Data input tidak valid.',
                            'details' => $e->errors(),
                        ],
                    ], 422);
                }

                // 3. Authentication Exception
                if ($e instanceof AuthenticationException) {
                    return response()->json([
                        'success' => false,
                        'error' => [
                            'code' => 'UNAUTHENTICATED',
                            'message' => 'Autentikasi diperlukan.',
                        ],
                    ], 401);
                }

                // 4. Access Denied / Authorization Exception
                if ($e instanceof AuthorizationException || $e instanceof AccessDeniedHttpException) {
                    return response()->json([
                        'success' => false,
                        'error' => [
                            'code' => 'FORBIDDEN',
                            'message' => 'Anda tidak memiliki akses.',
                        ],
                    ], 403);
                }

                // 5. Model Not Found / Route Not Found
                if ($e instanceof ModelNotFoundException || $e instanceof NotFoundHttpException) {
                    return response()->json([
                        'success' => false,
                        'error' => [
                            'code' => 'NOT_FOUND',
                            'message' => 'Data atau halaman tidak ditemukan.',
                        ],
                    ], 404);
                }

                // 6. Method Not Allowed
                if ($e instanceof MethodNotAllowedHttpException) {
                    return response()->json([
                        'success' => false,
                        'error' => [
                            'code' => 'METHOD_NOT_ALLOWED',
                            'message' => 'Metode HTTP tidak diizinkan untuk rute ini.',
                        ],
                    ], 405);
                }

                // 7. General HTTP Exception
                if ($e instanceof HttpExceptionInterface) {
                    return response()->json([
                        'success' => false,
                        'error' => [
                            'code' => 'HTTP_ERROR',
                            'message' => $e->getMessage(),
                        ],
                    ], $e->getStatusCode());
                }

                // 8. General System/Database Exceptions (Only expose details in local/debug mode)
                $message = config('app.debug') ? $e->getMessage() : 'Terjadi kesalahan internal pada server.';
                $details = config('app.debug') ? [
                    'exception' => get_class($e),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => collect($e->getTrace())->take(5)->toArray(),
                ] : null;

                $error = [
                    'code' => 'SERVER_ERROR',
                    'message' => $message,
                ];
                if ($details) {
                    $error['details'] = $details;
                }

                return response()->json([
                    'success' => false,
                    'error' => $error,
                ], 500);
            }
        });
    })->create();
