<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Add dusun index to the locations table.
 *
 * Accelerates the distinct dusun count query in StatisticsService::getSummary()
 * which groups and counts unique dusun values for the public landing statistics.
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
        Schema::table('locations', function (Blueprint $table) {
            $table->index(['dusun'], 'locations_dusun_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('locations', function (Blueprint $table) {
            $table->dropIndex('locations_dusun_index');
        });
    }
};
