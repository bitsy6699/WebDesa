<?php

namespace Database\Factories\Metadata;

use Faker\Generator;

/**
 * TourismMetadataFactory
 *
 * Generates mock metadata for Wisata potential listings conforming to the category schema definition.
 */
class TourismMetadataFactory
{
    /**
     * Generate mock Tourism metadata.
     *
     * @param  \Faker\Generator  $faker
     * @return array<string, mixed>
     */
    public static function make(Generator $faker): array
    {
        $facilitiesSet = [
            ['Tempat Parkir', 'Toilet Umum', 'Mushola'],
            ['Tempat Parkir', 'Toilet Umum', 'Spot Foto', 'Warung Makan'],
            ['Toilet Umum', 'Spot Foto', 'Gazebo', 'Camping Ground']
        ];

        return [
            'ticket_price' => $faker->randomElement([5000, 10000, 15000, 20000]),
            'facilities' => $faker->randomElement($facilitiesSet),
            'opening_hours' => '07:00 - 18:00 WIB',
        ];
    }
}
