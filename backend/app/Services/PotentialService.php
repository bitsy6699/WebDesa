<?php

namespace App\Services;

use App\Enums\Status;
use App\Exceptions\ApiException;
use App\Models\Location;
use App\Models\Potential;
use App\Support\Constants;
use App\Support\PotentialFilter;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Cache;

/**
 * PotentialService
 *
 * Implements business operations for Village Potentials catalogs under a dynamic ACA design.
 * Integrates database transactions, log triggers, and cache invalidation.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §6.1 PotentialService
 */
class PotentialService extends BaseService
{
    /**
     * Create a new PotentialService instance.
     */
    public function __construct(
        protected ActivityLogService $activityLogService,
        protected CategoryService $categoryService
    ) {}

    /**
     * Retrieve paginated listings filtered by PotentialFilter parameters.
     *
     * @param  \App\Support\PotentialFilter  $filter
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator<\App\Models\Potential>
     */
    public function list(PotentialFilter $filter): LengthAwarePaginator
    {
        return $this->executeSafely(function () use ($filter) {
            $isCacheable = $filter->search === null
                && $filter->category === null
                && $filter->featured === null
                && $filter->status === null
                && $filter->sort === 'latest'
                && $filter->page === 1
                && $filter->perPage === Constants::PAGINATION_DEFAULT_PER_PAGE;

            if ($isCacheable) {
                return Cache::remember(
                    Constants::CACHE_KEY_POTENTIALS_LIST,
                    Constants::CACHE_TTL_FIFTEEN_MINUTES,
                    fn () => $this->fetchListFromDatabase($filter)
                );
            }

            return $this->fetchListFromDatabase($filter);
        }, 'Gagal memuat daftar potensi.');
    }

    /**
     * Fetch the potentials list directly from database.
     *
     * @param  \App\Support\PotentialFilter  $filter
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator<\App\Models\Potential>
     */
    protected function fetchListFromDatabase(PotentialFilter $filter): LengthAwarePaginator
    {
        // Eager load relations to prevent N+1 queries
        $query = Potential::with(['category', 'location', 'coverImage']);

        // 1. Apply status scope
        if ($filter->status !== null) {
            $query->where('status', $filter->status);
        } else {
            $query->published(); // Public directory default
        }

        // 2. Apply category scope
        if ($filter->category !== null) {
            $query->inCategory($filter->category);
        }

        // 3. Apply search scope
        if ($filter->search !== null) {
            $query->search($filter->search);
        }

        // 4. Apply featured scope
        if ($filter->featured !== null) {
            if ($filter->featured) {
                $query->featured();
            } else {
                $query->where('is_featured', false);
            }
        }

        // 5. Apply sorting
        $query = $this->applySorting($query, $filter->sort);

        // 6. Paginate results
        return $query->paginate(
            perPage: $filter->perPage,
            page: $filter->page
        );
    }

    /**
     * Fetch a single potential profile with cached deep relationships.
     *
     * @param  string  $categorySlug
     * @param  string  $slug
     * @return \App\Models\Potential
     *
     * @throws \App\Exceptions\ApiException
     */
    public function show(string $categorySlug, string $slug): Potential
    {
        $cacheKey = "potential_detail_{$categorySlug}_{$slug}";

        return $this->executeSafely(function () use ($categorySlug, $slug, $cacheKey) {
            return Cache::remember($cacheKey, Constants::CACHE_TTL_ONE_DAY, function () use ($categorySlug, $slug) {
                $potential = Potential::with(['category', 'location', 'coverImage', 'gallery'])
                    ->where('slug', $slug)
                    ->inCategory($categorySlug)
                    ->first();

                if (!$potential) {
                    throw new ApiException(
                        errorCode: 'NOT_FOUND',
                        message: 'Data potensi tidak ditemukan.',
                        statusCode: 404
                    );
                }

                return $potential;
            });
        }, 'Gagal memuat detail potensi.');
    }

    /**
     * Write a new potential listing using transactional guarantees.
     *
     * @param  array<string, mixed>  $data
     * @param  string  $adminId  UUID of author
     * @param  string  $ipAddress
     * @return \App\Models\Potential
     */
    public function create(array $data, string $adminId, string $ipAddress): Potential
    {
        return $this->transaction(function () use ($data, $adminId, $ipAddress) {
            // 1. Create Location details
            $location = Location::create([
                'latitude' => $data['latitude'],
                'longitude' => $data['longitude'],
                'address' => $data['address'],
                'dusun' => $data['dusun'] ?? null,
            ]);

            // 2. Create Potential record
            $potential = Potential::create([
                'category_id' => $data['category_id'],
                'title' => $data['title'],
                'description' => $data['description'],
                'status' => $data['status'] ?? Status::Draft->value,
                'cover_image_id' => $data['cover_image_id'] ?? null,
                'location_id' => $location->id,
                'metadata' => $data['metadata'] ?? [],
                'is_featured' => $data['is_featured'] ?? false,
                'created_by_id' => $adminId,
            ]);

            // 3. Attach gallery assets if present
            if (!empty($data['gallery'])) {
                $pivotData = [];
                $order = 0;
                foreach ($data['gallery'] as $mediaId) {
                    $pivotData[$mediaId] = ['sort_order' => $order++];
                }
                $potential->gallery()->attach($pivotData);
            }

            // Invalidate categories count cache
            $this->categoryService->clearCache();
            $this->clearListCache();

            // Log activity
            $this->activityLogService->log(
                user: auth()->user(),
                action: 'potential.created',
                subjectId: $potential->id,
                subjectType: Potential::class,
                ipAddress: $ipAddress
            );

            return $potential;
        });
    }

    /**
     * Modify an existing potential listing.
     *
     * @param  \App\Models\Potential  $potential
     * @param  array<string, mixed>  $data
     * @param  string  $ipAddress
     * @return \App\Models\Potential
     */
    public function update(Potential $potential, array $data, string $ipAddress): Potential
    {
        return $this->transaction(function () use ($potential, $data, $ipAddress) {
            // 1. Hydrate and update Location details
            $potential->location->update([
                'latitude' => $data['latitude'],
                'longitude' => $data['longitude'],
                'address' => $data['address'],
                'dusun' => $data['dusun'] ?? null,
            ]);

            // 2. Update Potential listing
            $oldSlug = $potential->slug;
            
            $potential->update([
                'category_id' => $data['category_id'],
                'title' => $data['title'],
                'description' => $data['description'],
                'status' => $data['status'] ?? $potential->status->value,
                'cover_image_id' => $data['cover_image_id'] ?? null,
                'metadata' => $data['metadata'] ?? [],
                'is_featured' => $data['is_featured'] ?? false,
            ]);

            // 3. Synchronize gallery images
            if (isset($data['gallery'])) {
                $pivotData = [];
                $order = 0;
                foreach ($data['gallery'] as $mediaId) {
                    $pivotData[$mediaId] = ['sort_order' => $order++];
                }
                $potential->gallery()->sync($pivotData);
            }

            // Invalidate cache keys for detail page
            $oldCategorySlug = $potential->category->slug;
            Cache::forget("potential_detail_{$oldCategorySlug}_{$oldSlug}");

            // Load fresh relations to update cached detail slug mappings
            $potential->load('category');
            $newCategorySlug = $potential->category->slug;
            Cache::forget("potential_detail_{$newCategorySlug}_{$potential->slug}");

            $this->categoryService->clearCache();
            $this->clearListCache();

            // Log activity
            $this->activityLogService->log(
                user: auth()->user(),
                action: 'potential.updated',
                subjectId: $potential->id,
                subjectType: Potential::class,
                ipAddress: $ipAddress
            );

            return $potential->fresh(['category', 'location', 'coverImage', 'gallery']);
        });
    }

    /**
     * Soft delete potential listing.
     *
     * @param  \App\Models\Potential  $potential
     * @param  string  $ipAddress
     * @return void
     */
    public function delete(Potential $potential, string $ipAddress): void
    {
        $this->transaction(function () use ($potential, $ipAddress) {
            $potential->delete();

            // Clear detail caching
            Cache::forget("potential_detail_{$potential->category->slug}_{$potential->slug}");
            $this->categoryService->clearCache();
            $this->clearListCache();

            $this->activityLogService->log(
                user: auth()->user(),
                action: 'potential.deleted',
                subjectId: $potential->id,
                subjectType: Potential::class,
                ipAddress: $ipAddress
            );
        });
    }

    /**
     * Toggle featured highlights flag.
     *
     * @param  \App\Models\Potential  $potential
     * @param  string  $ipAddress
     * @return \App\Models\Potential
     */
    public function toggleFeatured(Potential $potential, string $ipAddress): Potential
    {
        return $this->transaction(function () use ($potential, $ipAddress) {
            $potential->update([
                'is_featured' => !$potential->is_featured
            ]);

            Cache::forget("potential_detail_{$potential->category->slug}_{$potential->slug}");
            $this->clearListCache();

            $this->activityLogService->log(
                user: auth()->user(),
                action: 'potential.featured_toggled',
                subjectId: $potential->id,
                subjectType: Potential::class,
                ipAddress: $ipAddress
            );

            return $potential;
        });
    }

    /**
     * Apply sorting filters to query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder<\App\Models\Potential>  $query
     * @param  string  $sort
     * @return \Illuminate\Database\Eloquent\Builder<\App\Models\Potential>
     */
    protected function applySorting(Builder $query, string $sort): Builder
    {
        return match ($sort) {
            'oldest' => $query->orderBy('created_at', 'asc'),
            'name' => $query->orderBy('title', 'asc'),
            'featured' => $query->orderBy('is_featured', 'desc')->orderBy('created_at', 'desc'),
            'latest' => $query->orderBy('created_at', 'desc'),
            default => $query->orderBy(Constants::DEFAULT_SORT_COLUMN, Constants::DEFAULT_SORT_DIRECTION),
        };
    }

    /**
     * Clear the list-level caching keys.
     */
    public function clearListCache(): void
    {
        Cache::forget(Constants::CACHE_KEY_POTENTIALS_LIST);
    }
}
