<?php

namespace App\Providers;

use App\Models\Model; // Wait, Laravel's Model is Illuminate\Database\Eloquent\Model
use App\Models\Potential;
use App\Observers\PotentialObserver;
use Illuminate\Database\Eloquent\Model as EloquentModel;
use Illuminate\Support\ServiceProvider;

/**
 * AppServiceProvider
 *
 * Configures application-wide settings, model observers, and service bindings.
 *
 * Enforces Laravel's strict mode during development:
 * - Prevents lazy loading of Eloquent relationships (prevents N+1 query bugs)
 * - Prevents silently discarding mass-assigned attributes
 * - Prevents accessing model attributes that were not fetched in the SQL query
 *
 * Registers model observers.
 *
 * @see docs/development/CODING_RULES.md §4.3 Models & Scopes
 * @see docs/development/CODING_RULES.md §8 Performance Optimization Rules
 */
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Enable database strictness behaviors in local/development environment
        EloquentModel::shouldBeStrict(! $this->app->isProduction());

        // Register Observers
        Potential::observe(PotentialObserver::class);
    }
}
