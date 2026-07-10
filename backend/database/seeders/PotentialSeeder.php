<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Location;
use App\Models\Media;
use App\Models\Potential;
use App\Models\User;
use Database\Factories\Metadata\MetadataFactory;
use Illuminate\Database\Seeder;

/**
 * PotentialSeeder
 *
 * Development Seeder.
 * Seeds potentials linking users, categories, locations, covers, and gallery media.
 */
class PotentialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('username', 'admin')->first();
        if (!$admin) {
            $admin = User::factory()->create(['username' => 'admin']);
        }

        $categories = Category::all();
        if ($categories->isEmpty()) {
            $this->call([
                CategorySeeder::class,
                CategorySchemaSeeder::class,
            ]);
            $categories = Category::all();
        }

        // Generate 5 mock listings for each category
        foreach ($categories as $category) {
            for ($i = 1; $i <= 5; $i++) {
                $location = Location::factory()->create();
                $cover = Media::factory()->create();

                $potential = Potential::factory()->create([
                    'category_id' => $category->id,
                    'cover_image_id' => $cover->id,
                    'location_id' => $location->id,
                    'created_by_id' => $admin->id,
                    'metadata' => MetadataFactory::generateFor($category->slug, fake()),
                ]);

                // Create and link 2-3 mock gallery images
                $galleryImages = Media::factory()->count(rand(2, 3))->create();
                $pivotData = [];
                $order = 0;
                foreach ($galleryImages as $image) {
                    $pivotData[$image->id] = ['sort_order' => $order++];
                }
                $potential->gallery()->attach($pivotData);
            }
        }
    }
}
