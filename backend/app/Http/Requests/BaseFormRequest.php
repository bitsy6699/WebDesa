<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

/**
 * BaseFormRequest
 *
 * Base class for all Form Request validators.
 * Overrides the default validation failure behavior to return
 * a standardized JSON error response instead of redirecting.
 *
 * All Form Request classes MUST extend this class.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §5 Form Request & Validation Layer
 * @see docs/engineering/API_SPEC.md §2.2 Standard Error Response
 * @see docs/development/CODING_RULES.md §4.4 Requests & Validation
 */
class BaseFormRequest extends FormRequest
{
    /**
     * Handle a failed validation attempt.
     *
     * Throws an HttpResponseException with the standardized
     * JSON error format instead of redirecting back.
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'error' => [
                    'code' => 'VALIDATION_FAILED',
                    'message' => 'Data input tidak valid.',
                    'details' => $validator->errors()->toArray(),
                ],
            ], 422)
        );
    }

    /**
     * Handle a failed authorization attempt.
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedAuthorization(): void
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'error' => [
                    'code' => 'FORBIDDEN',
                    'message' => 'Anda tidak memiliki akses untuk melakukan operasi ini.',
                ],
            ], 403)
        );
    }
}
