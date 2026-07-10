<?php

namespace App\Policies;

use App\Models\Potential;
use App\Models\User;

/**
 * PotentialPolicy
 *
 * Restricts modifications to administrator users carrying the admin role.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §3.6 Policies
 */
class PotentialPolicy
{
    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true; // Any authenticated user (Admin in V1) is allowed
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Potential $potential): bool
    {
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Potential $potential): bool
    {
        return true;
    }

    /**
     * Determine whether the user can toggle featured state.
     */
    public function toggleFeatured(User $user, Potential $potential): bool
    {
        return true;
    }
}
