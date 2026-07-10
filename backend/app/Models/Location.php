<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * Location Model
 *
 * Represents geographical coordinates and addresses for village potentials.
 *
 * @see docs/engineering/ERD.md §3.6 Entity: locations
 * @see docs/engineering/DATABASE_DESIGN.md §6.1 Location mapping
 */
class Location extends Model
{
    use HasFactory;
    use HasUuid;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'latitude',
        'longitude',
        'address',
        'dusun',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'latitude' => 'float',
            'longitude' => 'float',
        ];
    }

    /**
     * Get the potential associated with this location.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne<\App\Models\Potential>
     */
    public function potential(): HasOne
    {
        return $this->hasOne(Potential::class, 'location_id');
    }
}
