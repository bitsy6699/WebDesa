<?php

namespace App\Http\Requests;

/**
 * UpdateSettingRequest
 *
 * Validates bulk configuration update payloads for administrative settings management.
 *
 * @see docs/engineering/API_SPEC.md §Settings Endpoints
 * @see docs/development/CODING_RULES.md §4.4 Requests & Validation
 */
class UpdateSettingRequest extends BaseFormRequest
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
            'settings'          => 'required|array|min:1',
            'settings.*.key'    => 'required|string|exists:settings,key',
            'settings.*.value'  => 'nullable|string|max:2000',
        ];
    }

    /**
     * Get custom error messages for validation failures.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'settings.required'         => 'Konfigurasi yang akan diperbarui wajib disertakan.',
            'settings.array'            => 'Format konfigurasi harus berupa array.',
            'settings.min'              => 'Minimal satu konfigurasi harus disertakan.',
            'settings.*.key.required'   => 'Kunci konfigurasi wajib diisi.',
            'settings.*.key.exists'     => 'Kunci konfigurasi tidak ditemukan dalam sistem.',
            'settings.*.value.max'      => 'Nilai konfigurasi tidak boleh melebihi 2000 karakter.',
        ];
    }
}
