<?php

namespace Database\Factories;

use App\Models\Media;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Media>
 */
class MediaFactory extends Factory
{
    protected $model = Media::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = $this->faker;

        $id = $faker->uuid();
        $filename = "mock_image_{$id}.webp";

        return [
            'filename' => $filename,
            'filepath' => "uploads/{$filename}",
            'filetype' => 'image/webp',
            'filesize' => $faker->numberBetween(100 * 1024, 2 * 1024 * 1024), // 100kb to 2mb
            'alt_text' => $faker->sentence(4),
        ];
    }
}
