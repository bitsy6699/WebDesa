<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

/**
 * CategorySeeder
 *
 * Infrastructure Seeder (Safe for production).
 * Seeds the core categories for the village potentials.
 */
class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. UMKM (Local Enterprise)
        Category::factory()->umkm()->create();

        // 2. Wisata (Tourism Spots)
        Category::factory()->wisata()->create();

        // 3. Pertanian (Agriculture Yields)
        Category::factory()->pertanian()->create();
    }
}
