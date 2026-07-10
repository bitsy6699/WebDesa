<?php

namespace App\Http\Requests;

/**
 * ImportPotentialRequest
 *
 * Validates the Excel file upload for bulk import operations.
 * Ensures the uploaded file meets size limits and MIME type constraints
 * before passing it to the ImportExportService for row-level processing.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §6.3 ImportExportService
 * @see docs/engineering/API_SPEC.md §8.1 Excel Bulk Import
 */
class ImportPotentialRequest extends BaseFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Authorization is enforced by the auth:sanctum middleware on the route group.
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
            'file' => [
                'required',
                'file',
                'max:10240', // 10MB
                'mimes:xlsx',
                'mimetypes:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ],
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'file.required' => 'File Excel (.xlsx) wajib diunggah.',
            'file.file' => 'Data yang diunggah harus berupa file.',
            'file.max' => 'Ukuran file tidak boleh melebihi 10MB.',
            'file.mimes' => 'Format file harus .xlsx (Excel).',
            'file.mimetypes' => 'Tipe file tidak valid. Gunakan format Excel (.xlsx).',
        ];
    }
}
