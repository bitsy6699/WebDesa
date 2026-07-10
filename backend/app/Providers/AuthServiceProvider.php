<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

/**
 * AuthServiceProvider
 *
 * Empty foundation provider for authentication and policy registration.
 * Enables clean organization of policies, gates, and authentication drivers
 * in future implementation phases.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §3.6 Policies
 * @see docs/development/CODING_RULES.md §4.3 Models & Scopes
 */
class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application authentication / authorization services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application authentication / authorization services.
     */
    public function boot(): void
    {
        // Register Potential policy
        \Illuminate\Support\Facades\Gate::policy(
            \App\Models\Potential::class,
            \App\Policies\PotentialPolicy::class
        );

        // Register Media policy
        \Illuminate\Support\Facades\Gate::policy(
            \App\Models\Media::class,
            \App\Policies\MediaPolicy::class
        );
    }
}
