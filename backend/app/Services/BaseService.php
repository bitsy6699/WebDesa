<?php

namespace App\Services;

use Exception;
use App\Exceptions\ApiException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;

/**
 * BaseService
 *
 * Base class for all domain-specific services in the application.
 * All services MUST extend this class.
 *
 * Provides central utilities for:
 * - Database transactions with automatic rollback and error wrapping
 * - Unified exception handling and logging of server errors
 * - Common diagnostic logging helpers
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §6 Service Layer Design
 * @see docs/development/CODING_RULES.md §4.2 Service Layer
 */
abstract class BaseService
{
    /**
     * Wrap a callback in a database transaction.
     *
     * Automatically commits the transaction if successful,
     * or rolls back and throws an ApiException if any exception occurs.
     *
     * @template T
     * @param  callable(): T  $callback
     * @return T
     *
     * @throws \App\Exceptions\ApiException
     */
    protected function transaction(callable $callback): mixed
    {
        DB::beginTransaction();

        try {
            $result = $callback();
            DB::commit();
            return $result;
        } catch (ApiException $e) {
            DB::rollBack();
            throw $e;
        } catch (QueryException $e) {
            DB::rollBack();
            $this->logError('Database query failed in transaction', $e);
            throw new ApiException(
                errorCode: 'DATABASE_ERROR',
                message: 'Terjadi kesalahan pada query database.',
                statusCode: 500
            );
        } catch (Exception $e) {
            DB::rollBack();
            $this->logError('Transaction execution failed', $e);
            throw new ApiException(
                errorCode: 'SERVER_ERROR',
                message: 'Terjadi kesalahan saat memproses data.',
                statusCode: 500
            );
        }
    }

    /**
     * Execute a block of code with unified exception mapping and logging.
     *
     * @template T
     * @param  callable(): T  $callback
     * @param  string  $errorMessage  User-facing error message for unhandled errors
     * @return T
     *
     * @throws \App\Exceptions\ApiException
     */
    protected function executeSafely(callable $callback, string $errorMessage = 'Terjadi kesalahan saat memproses permintaan.'): mixed
    {
        try {
            return $callback();
        } catch (ApiException $e) {
            throw $e;
        } catch (Exception $e) {
            $this->logError('Unhandled exception caught in service', $e);
            throw new ApiException(
                errorCode: 'SERVER_ERROR',
                message: $errorMessage,
                statusCode: 500
            );
        }
    }

    /**
     * Log a detailed error message with backtrace and context metadata.
     *
     * @param  string  $message
     * @param  \Exception  $exception
     * @param  array<string, mixed>  $context
     */
    protected function logError(string $message, Exception $exception, array $context = []): void
    {
        Log::error($message, array_merge([
            'exception' => get_class($exception),
            'message' => $exception->getMessage(),
            'code' => $exception->getCode(),
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
            'trace' => collect($exception->getTrace())->take(10)->toArray(),
        ], $context));
    }

    /**
     * Log an administrative audit activity.
     *
     * @param  string  $action  The action name (e.g. 'potential.created')
     * @param  string  $message  Descriptive message
     * @param  array<string, mixed>  $data  Metadata related to the action
     */
    protected function logActivity(string $action, string $message, array $data = []): void
    {
        Log::info(sprintf('Audit Log - %s: %s', $action, $message), [
            'action' => $action,
            'data' => $data,
            'ip' => request()->ip(),
            'user_id' => auth()->id(),
        ]);
    }
}
