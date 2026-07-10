<?php

namespace Database\Seeders;

use App\Models\Media;
use Illuminate\Database\Seeder;

/**
 * MediaSeeder
 *
 * Development Seeder.
 * Seeds file uploads metadata.
 */
class MediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Media::factory()->count(10)->create();
    }
}
