<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * ActivityLog Model
 *
 * Stores administrative audit actions using polymorphic subject relations.
 *
 * @see docs/engineering/ERD.md §3.8 Entity: activity_logs
 * @see docs/development/CODING_RULES.md §7 Security Hardening Rules
 */
class ActivityLog extends Model
{
    use HasFactory;
    use HasUuid;

    // Disable updated_at timestamp since audit entries are immutable
    public const UPDATED_AT = null;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'action',
        'subject_id',
        'subject_type',
        'ip_address',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
        ];
    }

    /**
     * Get the user who triggered the activity.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<\App\Models\User, \App\Models\ActivityLog>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the subject of this activity (polymorphic relationship).
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo<\Illuminate\Database\Eloquent\Model, \App\Models\ActivityLog>
     */
    public function subject(): MorphTo
    {
        return $this->morphTo();
    }
}
