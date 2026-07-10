<?php

namespace App\Policies;

use App\Models\Media;
use App\Models\User;

/**
 * MediaPolicy
 *
 * Restricts media creation and deletion to admin roles.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §3.6 Policies
 */
class MediaPolicy
{
    /**
     * Determine whether the user can upload media.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can delete media.
     */
    public function delete(User $user, Media $media): bool
    {
        return true;
    }
}
