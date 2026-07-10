<?php

namespace App\Http\Requests;

/**
 * LoginRequest
 *
 * Handles validation and sanitization for administrator login requests.
 * Inherits standardized JSON error mapping on failure.
 *
 * @see docs/engineering/API_SPEC.md §3.1 Admin Login
 * @see docs/development/CODING_RULES.md §4.4 Requests & Validation
 */
class LoginRequest extends BaseFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'username' => 'required|string|max:50',
            'password' => 'required|string|max:255',
        ];
    }

    /**
     * Get custom error messages for validator failures.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'username.required' => 'Nama pengguna wajib diisi.',
            'username.string'   => 'Nama pengguna harus berupa teks.',
            'username.max'      => 'Nama pengguna tidak boleh lebih dari 50 karakter.',
            'password.required' => 'Kata sandi wajib diisi.',
            'password.string'   => 'Kata sandi harus berupa teks.',
            'password.max'      => 'Kata sandi tidak boleh lebih dari 255 karakter.',
        ];
    }
}
