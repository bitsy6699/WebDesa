<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StorePotentialRequest;
use App\Http\Requests\UpdatePotentialRequest;
use App\Http\Resources\PotentialDetailResource;
use App\Http\Resources\PotentialCollection;
use App\Models\Potential;
use App\Services\PotentialService;
use App\Support\PotentialFilter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * PotentialController
 *
 * Coordinates REST API endpoints for Village Potentials.
 * Enforces gate/policy checks for administrative operations.
 *
 * @see docs/engineering/API_SPEC.md §5 Potential Endpoints
 */
class PotentialController extends BaseController
{
    /**
     * Create a new PotentialController instance.
     */
    public function __construct(
        protected PotentialService $potentialService
    ) {}

    /**
     * Retrieve paginated listings filtered by request parameters.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Http\Resources\PotentialCollection
     */
    public function index(Request $request): PotentialCollection
    {
        $filter = new PotentialFilter($request->all());
        $potentials = $this->potentialService->list($filter);

        return new PotentialCollection($potentials);
    }

    /**
     * Fetch a single potential profile.
     *
     * @param  string  $categorySlug
     * @param  string  $slug
     * @return \App\Http\Resources\PotentialDetailResource
     */
    public function show(string $categorySlug, string $slug): PotentialDetailResource
    {
        $potential = $this->potentialService->show($categorySlug, $slug);

        return new PotentialDetailResource($potential);
    }

    /**
     * Write a new potential listing.
     *
     * @param  \App\Http\Requests\StorePotentialRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StorePotentialRequest $request): JsonResponse
    {
        $this->authorize('create', Potential::class);

        $potential = $this->potentialService->create(
            $request->validated(),
            $request->user()->id,
            $request->ip() ?? '127.0.0.1'
        );

        // Load category to return structured response
        $potential->load('category');

        return $this->created(
            new PotentialDetailResource($potential),
            'Potensi berhasil ditambahkan.'
        );
    }

    /**
     * Modify an existing potential listing.
     *
     * @param  \App\Http\Requests\UpdatePotentialRequest  $request
     * @param  string  $id  UUID of potential listing
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdatePotentialRequest $request, string $id): JsonResponse
    {
        // Resolve database record
        $potential = Potential::findOrFail($id);

        $this->authorize('update', $potential);

        $updatedPotential = $this->potentialService->update(
            $potential,
            $request->validated(),
            $request->ip() ?? '127.0.0.1'
        );

        return $this->success(
            new PotentialDetailResource($updatedPotential),
            'Potensi berhasil diperbarui.'
        );
    }

    /**
     * Soft delete potential listing.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id  UUID of potential listing
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $potential = Potential::findOrFail($id);

        $this->authorize('delete', $potential);

        $this->potentialService->delete(
            $potential,
            $request->ip() ?? '127.0.0.1'
        );

        return $this->noContent();
    }

    /**
     * Toggle featured highlight state.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id  UUID of potential listing
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggleFeatured(Request $request, string $id): JsonResponse
    {
        $potential = Potential::findOrFail($id);

        $this->authorize('toggleFeatured', $potential);

        $updatedPotential = $this->potentialService->toggleFeatured(
            $potential,
            $request->ip() ?? '127.0.0.1'
        );

        return $this->success(
            new PotentialDetailResource($updatedPotential),
            'Status unggulan potensi berhasil diubah.'
        );
    }
}
