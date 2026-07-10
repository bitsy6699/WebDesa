<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * Category Model
 *
 * Classifies potentials (e.g. UMKM, Wisata, Pertanian).
 * Each category defines its custom input fields via its linked CategorySchema.
 *
 * @see docs/engineering/ERD.md §3.2 Entity: categories
 * @see docs/engineering/ACA.md §4 Core Domain Model
 */
class Category extends Model
{
    use HasFactory;
    use HasUuid;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'label',
        'slug',
        'icon_key',
        'color_code',
    ];

    /**
     * Get the validation schema rules associated with this category.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne<\App\Models\CategorySchema>
     */
    public function schema(): HasOne
    {
        return $this->hasOne(CategorySchema::class, 'category_id');
    }

    /**
     * Get the village potentials classified under this category.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<\App\Models\Potential>
     */
    public function potentials(): HasMany
    {
        return $this->hasMany(Potential::class, 'category_id');
    }
}
