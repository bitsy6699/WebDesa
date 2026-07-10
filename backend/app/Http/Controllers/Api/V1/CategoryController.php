<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * CategoryController
 *
 * Coordinates REST API endpoints for categories.
 *
 * @see docs/engineering/API_SPEC.md §4 Category Endpoints
 */
class CategoryController extends BaseController
{
    /**
     * Create a new CategoryController instance.
     */
    public function __construct(
        protected CategoryService $categoryService
    ) {}

    /**
     * Retrieve all categories.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $categories = $this->categoryService->all();

        return $this->success(CategoryResource::collection($categories));
    }
}
