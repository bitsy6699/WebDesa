<?php

namespace Database\Factories\Metadata;

use Faker\Generator;

/**
 * MetadataFactory
 *
 * Dynamically routes metadata generation based on category slugs.
 * Ensures clean expansion when adding new ACA categories.
 *
 * @see docs/engineering/ACA.md §10 Extensibility & Scalability Case Study
 */
class MetadataFactory
{
    /**
     * Generate mock metadata based on the category slug.
     *
     * @param  string  $categorySlug
     * @param  \Faker\Generator  $faker
     * @return array<string, mixed>
     */
    public static function generateFor(string $categorySlug, Generator $faker): array
    {
        return match (strtolower($categorySlug)) {
            'umkm' => UmkmMetadataFactory::make($faker),
            'wisata' => TourismMetadataFactory::make($faker),
            'pertanian' => AgricultureMetadataFactory::make($faker),
            default => [
                'custom_field_1' => $faker->sentence(2),
                'custom_field_2' => $faker->numberBetween(1, 100),
            ]
        };
    }
}
