<?php

namespace App\Http\Requests;

/**
 * UploadMediaRequest
 *
 * Handles validation for administrative raw media uploads.
 *
 * @see docs/engineering/API_SPEC.md §6.1 Upload Image
 * @see docs/development/CODING_RULES.md §4.6 File Storage & Media Processing
 */
class UploadMediaRequest extends BaseFormRequest
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
        // Max size 5MB (5120 Kilobytes) (BR-MED-01)
        return [
            'file' => 'required|file|image|max:5120|mimes:jpeg,jpg,png,webp',
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
            'file.required' => 'File gambar wajib diunggah.',
            'file.file'     => 'Format unggahan harus berupa file.',
            'file.image'    => 'File yang diunggah harus berupa gambar.',
            'file.max'      => 'Ukuran gambar tidak boleh melebihi 5MB.',
            'file.mimes'    => 'Format gambar harus berupa jpeg, jpg, png, atau webp.',
        ];
    }
}
