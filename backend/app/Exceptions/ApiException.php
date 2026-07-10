<?php

namespace App\Exceptions;

use Exception;

/**
 * ApiException
 *
 * Base exception class for all API-related errors.
 * Carries a machine-readable error code, HTTP status code,
 * and optional details for structured JSON error responses.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §14 Error Handling Strategy
 * @see docs/engineering/API_SPEC.md §2.2 Standard Error Response
 */
class ApiException extends Exception
{
    /**
     * @param  string  $errorCode  Machine-readable error code (e.g., 'NOT_FOUND', 'FORBIDDEN')
     * @param  string  $message  Human-readable error description
     * @param  int  $statusCode  HTTP status code
     * @param  array<string, mixed>|null  $details  Additional error context
     */
    public function __construct(
        protected string $errorCode,
        string $message,
        protected int $statusCode = 400,
        protected ?array $details = null
    ) {
        parent::__construct($message, $statusCode);
    }

    /**
     * Get the machine-readable error code.
     */
    public function getErrorCode(): string
    {
        return $this->errorCode;
    }

    /**
     * Get the HTTP status code for the response.
     */
    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    /**
     * Get the additional error details.
     *
     * @return array<string, mixed>|null
     */
    public function getDetails(): ?array
    {
        return $this->details;
    }

    /**
     * Convert the exception to a structured JSON response array.
     *
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        $error = [
            'code' => $this->errorCode,
            'message' => $this->getMessage(),
        ];

        if ($this->details !== null) {
            $error['details'] = $this->details;
        }

        return [
            'success' => false,
            'error' => $error,
        ];
    }
}
