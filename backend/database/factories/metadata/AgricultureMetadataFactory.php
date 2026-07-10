<?php

namespace Database\Factories\Metadata;

use Faker\Generator;

/**
 * AgricultureMetadataFactory
 *
 * Generates mock metadata for Pertanian potential listings conforming to the category schema definition.
 */
class AgricultureMetadataFactory
{
    /**
     * Generate mock Pertanian metadata.
     *
     * @param  \Faker\Generator  $faker
     * @return array<string, mixed>
     */
    public static function make(Generator $faker): array
    {
        $commodities = ['Padi Organik', 'Kopi Arabika', 'Jagung Manis', 'Ubi Cilembu', 'Sayuran Hijau'];
        $seasons = [
            ['Januari', 'Februari', 'Maret'],
            ['Mei', 'Juni', 'Juli'],
            ['September', 'Oktober', 'November']
        ];
        $yields = ['5 Ton / Hektar', '2 Ton / Hektar', '10 Ton / Hektar'];

        return [
            'commodity_type' => $faker->randomElement($commodities),
            'harvest_season' => $faker->randomElement($seasons),
            'yield_volume' => $faker->randomElement($yields),
        ];
    }
}
