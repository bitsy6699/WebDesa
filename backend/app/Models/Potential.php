<?php

namespace App\Models;

use App\Enums\Status;
use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Potential Model
 *
 * The central village potential catalog entry.
 * Follows the Adaptive Content Architecture (ACA) for polymorphic metadata.
 *
 * @see docs/engineering/ERD.md §3.4 Entity: potentials
 * @see docs/engineering/DATABASE_DESIGN.md §4.1 Base Entity Strategy
 * @see docs/engineering/DATABASE_DESIGN.md §7.2 Query Scopes
 */
class Potential extends Model
{
    use HasFactory;
    use HasUuid;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'description',
        'status',
        'cover_image_id',
        'location_id',
        'metadata',
        'is_featured',
        'created_by_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => Status::class,
            'metadata' => 'array',
            'is_featured' => 'boolean',
        ];
    }

    // =========================================================================
    // RELATIONSHIPS
    // =========================================================================

    /**
     * Get the category classification for this potential.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<\App\Models\Category, \App\Models\Potential>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    /**
     * Get the geographic location details for this potential.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<\App\Models\Location, \App\Models\Potential>
     */
    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class, 'location_id');
    }

    /**
     * Get the cover image resource for this potential.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<\App\Models\Media, \App\Models\Potential>
     */
    public function coverImage(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'cover_image_id');
    }

    /**
     * Get the user who created this potential listing.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<\App\Models\User, \App\Models\Potential>
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    /**
     * Get the secondary gallery media files linked to this potential.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany<\App\Models\Media>
     */
    public function gallery(): BelongsToMany
    {
        return $this->belongsToMany(Media::class, 'potential_media', 'potential_id', 'media_id')
            ->withPivot('sort_order');
    }

    // =========================================================================
    // QUERY SCOPES
    // =========================================================================

    /**
     * Scope a query to only include published and active potentials.
     *
     * @param  \Illuminate\Database\Eloquent\Builder<\App\Models\Potential>  $query
     */
    public function scopePublished(Builder $query): void
    {
        $query->where('status', Status::Published->value);
    }

    /**
     * Scope a query to only include featured potentials.
     *
     * @param  \Illuminate\Database\Eloquent\Builder<\App\Models\Potential>  $query
     */
    public function scopeFeatured(Builder $query): void
    {
        $query->where('is_featured', true);
    }

    /**
     * Scope a query to filter potentials by category slug.
     *
     * @param  \Illuminate\Database\Eloquent\Builder<\App\Models\Potential>  $query
     * @param  string  $categorySlug
     */
    public function scopeInCategory(Builder $query, string $categorySlug): void
    {
        $query->whereHas('category', function (Builder $q) use ($categorySlug): void {
            $q->where('slug', $categorySlug);
        });
    }

    /**
     * Scope a query to run keyword search against core indexed columns.
     * Searches must target title and description core columns, avoiding full-table scans of JSON metadata.
     *
     * @param  \Illuminate\Database\Eloquent\Builder<\App\Models\Potential>  $query
     * @param  string  $keyword
     */
    public function scopeSearch(Builder $query, string $keyword): void
    {
        if (trim($keyword) !== '') {
            $query->where(function (Builder $q) use ($keyword): void {
                $q->where('title', 'like', "%{$keyword}%")
                  ->orWhere('description', 'like', "%{$keyword}%");
            });
        }
    }
}
