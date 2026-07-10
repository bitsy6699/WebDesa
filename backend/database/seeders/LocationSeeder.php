<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;

/**
 * LocationSeeder
 *
 * Development Seeder.
 * Seeds geographical coordinate details.
 */
class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Location::factory()->count(5)->create();
    }
}
