<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Media Model
 *
 * Tracks uploaded file assets and dimensions.
 *
 * @see docs/engineering/ERD.md §3.5 Entity: media
 * @see docs/engineering/DATABASE_DESIGN.md §6.3 Media Storage
 */
class Media extends Model
{
    use HasFactory;
    use HasUuid;

    // Disables updated_at timestamp since media only has created_at
    public const UPDATED_AT = null;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'filename',
        'filepath',
        'filetype',
        'filesize',
        'alt_text',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'filesize' => 'integer',
        ];
    }

    /**
     * Get the potentials using this media as their cover image.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<\App\Models\Potential>
     */
    public function potentialsAsCover(): HasMany
    {
        return $this->hasMany(Potential::class, 'cover_image_id');
    }

    /**
     * Get the potentials using this media in their gallery.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany<\App\Models\Potential>
     */
    public function potentials(): BelongsToMany
    {
        return $this->belongsToMany(Potential::class, 'potential_media', 'media_id', 'potential_id')
            ->withPivot('sort_order');
    }
}
