<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * User Model
 *
 * Represents an administrator account.
 * Implements UUID v4 primary keys and standard authentication properties.
 *
 * @see docs/engineering/ERD.md §3.1 Entity: users
 * @see docs/development/CODING_RULES.md §4.3 Models & Scopes
 */
class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasUuid;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    /**
     * Get the village potentials created by this user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<\App\Models\Potential>
     */
    public function potentials(): HasMany
    {
        return $this->hasMany(Potential::class, 'created_by_id');
    }

    /**
     * Get the administrative activity logs triggered by this user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<\App\Models\ActivityLog>
     */
    public function activityLogs(): HasMany
    {
        return $this->hasMany(ActivityLog::class, 'user_id');
    }
}
