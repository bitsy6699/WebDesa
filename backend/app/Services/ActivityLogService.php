<?php

namespace App\Services;

use App\Models\ActivityLog;
use App\Models\User;

/**
 * ActivityLogService
 *
 * Service for logging administrator audit operations polymorphically.
 *
 * @see docs/engineering/ERD.md §3.8 Entity: activity_logs
 * @see docs/development/CODING_RULES.md §7 Security Hardening Rules
 */
class ActivityLogService extends BaseService
{
    /**
     * Log an administrative activity.
     *
     * @param  \App\Models\User  $user  The user who triggered the action
     * @param  string  $action  Action slug (e.g. 'auth.login')
     * @param  string|null  $subjectId  Optional polymorphic subject UUID
     * @param  string|null  $subjectType  Optional polymorphic subject model class name
     * @param  string  $ipAddress  Client IP address
     * @return \App\Models\ActivityLog
     */
    public function log(
        User $user,
        string $action,
        ?string $subjectId = null,
        ?string $subjectType = null,
        string $ipAddress = '127.0.0.1'
    ): ActivityLog {
        return $this->executeSafely(function () use ($user, $action, $subjectId, $subjectType, $ipAddress) {
            $activity = ActivityLog::create([
                'user_id' => $user->id,
                'action' => $action,
                'subject_id' => $subjectId,
                'subject_type' => $subjectType,
                'ip_address' => $ipAddress,
            ]);

            $this->logActivity($action, "Admin {$user->username} performed {$action}", [
                'subject_id' => $subjectId,
                'subject_type' => $subjectType,
            ]);

            return $activity;
        }, 'Gagal mencatat log aktivitas.');
    }
}
