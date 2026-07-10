<?php

namespace App\Support;

/**
 * PotentialFilter
 *
 * Data Transfer Object encapsulating and sanitizing filter/sorting/pagination parameters.
 */
class PotentialFilter
{
    public ?string $search;
    public ?string $category;
    public ?bool $featured;
    public ?string $status;
    public string $sort;
    public int $page;
    public int $perPage;

    /**
     * Create a new PotentialFilter instance from request inputs.
     *
     * @param  array<string, mixed>  $inputs
     */
    public function __construct(array $inputs = [])
    {
        $this->search = isset($inputs['search']) && strlen(trim($inputs['search'])) >= Constants::SEARCH_MIN_LENGTH 
            ? trim($inputs['search']) 
            : null;

        $this->category = $inputs['category'] ?? null;

        $this->featured = isset($inputs['featured']) 
            ? filter_var($inputs['featured'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) 
            : null;

        $this->status = $inputs['status'] ?? null;

        $this->sort = $inputs['sort'] ?? 'latest';

        $this->page = isset($inputs['page']) ? (int) $inputs['page'] : 1;
        if ($this->page < 1) {
            $this->page = 1;
        }

        $perPageInput = isset($inputs['per_page']) ? (int) $inputs['per_page'] : Constants::PAGINATION_DEFAULT_PER_PAGE;
        $this->perPage = min(max($perPageInput, 1), Constants::PAGINATION_MAX_PER_PAGE);
    }
}
