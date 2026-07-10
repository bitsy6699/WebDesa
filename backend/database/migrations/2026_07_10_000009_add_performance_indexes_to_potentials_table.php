<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Add performance composite indexes to the potentials table.
 *
 * These indexes target the most frequent query patterns used across
 * PotentialService list(), show(), and search() operations.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §15 Performance Strategy
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('potentials', function (Blueprint $table) {
            // Powers scopePublished() used on every public directory query
            $table->index(['status', 'deleted_at'], 'potentials_status_deleted_at_index');

            // Powers scopeInCategory() + scopePublished() combined filter
            $table->index(['category_id', 'status', 'deleted_at'], 'potentials_category_status_deleted_index');

            // Powers scopeFeatured() + scopePublished() combined filter
            $table->index(['is_featured', 'status', 'deleted_at'], 'potentials_featured_status_deleted_index');

            // Supports future admin-scoped queries by creator
            $table->index(['created_by_id'], 'potentials_created_by_id_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('potentials', function (Blueprint $table) {
            $table->dropIndex('potentials_status_deleted_at_index');
            $table->dropIndex('potentials_category_status_deleted_index');
            $table->dropIndex('potentials_featured_status_deleted_index');
            $table->dropIndex('potentials_created_by_id_index');
        });
    }
};
