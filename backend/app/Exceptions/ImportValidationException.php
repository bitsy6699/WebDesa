<?php

namespace App\Exceptions;

/**
 * ImportValidationException
 *
 * Thrown when an Excel import operation encounters row-level validation errors.
 * Carries details about which rows failed and why, enabling the API to return
 * structured error information with row numbers and field-specific messages.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §11 Import Architecture
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §14 Error Handling Strategy
 */
class ImportValidationException extends ApiException
{
    /**
     * @param  array<int, array<string, mixed>>  $rowErrors  Row-level validation errors
     *   Format: [ row_number => [ 'field' => 'error message', ... ], ... ]
     * @param  string  $message  Human-readable summary message
     */
    public function __construct(
        protected array $rowErrors = [],
        string $message = 'Validasi impor gagal. Periksa detail kesalahan per baris.'
    ) {
        parent::__construct(
            errorCode: 'IMPORT_VALIDATION_FAILED',
            message: $message,
            statusCode: 422,
            details: ['row_errors' => $this->rowErrors]
        );
    }

    /**
     * Get the row-level validation errors.
     *
     * @return array<int, array<string, mixed>>
     */
    public function getRowErrors(): array
    {
        return $this->rowErrors;
    }
}
