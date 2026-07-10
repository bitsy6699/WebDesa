<?php

namespace App\Http\Requests;

use App\Enums\Status;
use App\Models\CategorySchema;
use App\Models\Potential;
use Illuminate\Validation\Rule;

/**
 * UpdatePotentialRequest
 *
 * Implements two-stage validation for listing modification.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §5 Validation Layer
 * @see docs/engineering/API_SPEC.md §5.4 Update Potential
 */
class UpdatePotentialRequest extends BaseFormRequest
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
        // Resolve target potential
        $potentialId = $this->route('id');

        // 1. Static Validation (Stage 1)
        $rules = [
            'category_id' => 'required|uuid|exists:categories,id',
            'title' => 'required|string|max:150',
            'description' => 'required|string',
            'status' => ['required', 'string', Rule::in(Status::values())],
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'address' => 'required|string|max:255',
            'dusun' => 'nullable|string|max:100',
            'cover_image_id' => 'nullable|uuid|exists:media,id',
            'is_featured' => 'nullable|boolean',
            'metadata' => 'nullable|array',
            'gallery' => 'nullable|array',
            'gallery.*' => 'uuid|exists:media,id',
        ];

        // 2. Dynamic Validation (Stage 2)
        $categoryId = $this->input('category_id');
        if ($categoryId && \Illuminate\Support\Str::isUuid($categoryId)) {
            $schema = CategorySchema::where('category_id', $categoryId)->first();
            if ($schema && is_array($schema->schema_definition)) {
                foreach ($schema->schema_definition as $field => $def) {
                    $fieldKey = "metadata.{$field}";
                    $fieldRules = [];

                    if (!empty($def['required'])) {
                        $fieldRules[] = 'required';
                    } else {
                        $fieldRules[] = 'nullable';
                    }

                    $type = $def['type'] ?? 'string';
                    if ($type === 'number' || $type === 'numeric') {
                        $fieldRules[] = 'numeric';
                    } elseif ($type === 'array') {
                        $fieldRules[] = 'array';
                    } else {
                        $fieldRules[] = 'string';
                    }

                    if (!empty($def['validation'])) {
                        $customRules = explode('|', $def['validation']);
                        $fieldRules = array_merge($fieldRules, $customRules);
                    }

                    $rules[$fieldKey] = $fieldRules;
                }
            }
        }

        return $rules;
    }
}
