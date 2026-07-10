<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Setting Model
 *
 * Represents site-wide configurations.
 * Uses key-value-type-group mapping to support expanding options without migrations.
 *
 * @see docs/engineering/ERD.md §3.7 Entity: settings
 * @see docs/engineering/DATABASE_DESIGN.md §12.3 Settings Config
 */
class Setting extends Model
{
    use HasFactory;

    // Use key as the primary key and disable auto-increment
    protected $primaryKey = 'key';
    protected $keyType = 'string';
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'key',
        'value',
        'type',
        'group',
    ];
}
