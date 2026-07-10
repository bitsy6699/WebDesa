<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    protected $model = Category::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $label = $this->faker->unique()->word();
        return [
            'label' => ucfirst($label),
            'slug' => Str::slug($label),
            'icon_key' => 'store',
            'color_code' => '#16A34A',
        ];
    }

    /**
     * Preset states for core categories
     */
    public function umkm(): self
    {
        return $this->state(fn () => [
            'label' => 'UMKM',
            'slug' => 'umkm',
            'icon_key' => 'shopping-bag',
            'color_code' => '#EA580C', // Amber-Orange (tourism/merchant contrast)
        ]);
    }

    public function wisata(): self
    {
        return $this->state(fn () => [
            'label' => 'Wisata',
            'slug' => 'wisata',
            'icon_key' => 'map-pin',
            'color_code' => '#0D9488', // Teal-Green (natural environment vibe)
        ]);
    }

    public function pertanian(): self
    {
        return $this->state(fn () => [
            'label' => 'Pertanian',
            'slug' => 'pertanian',
            'icon_key' => 'leaf',
            'color_code' => '#16A34A', // Green (fields/harvest)
        ]);
    }
}
