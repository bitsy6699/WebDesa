<?php

namespace Database\Factories\Metadata;

use Faker\Generator;

/**
 * UmkmMetadataFactory
 *
 * Generates mock metadata for UMKM potential listings conforming to the category schema definition.
 */
class UmkmMetadataFactory
{
    /**
     * Generate mock UMKM metadata.
     *
     * @param  \Faker\Generator  $faker
     * @return array<string, mixed>
     */
    public static function make(Generator $faker): array
    {
        $ownerNames = ['Pak Sugeng', 'Ibu Aminah', 'Pak Joko', 'Ibu Retno', 'Mang Dadang'];
        $productTypes = ['Kerajinan Kayu', 'Makanan Ringan', 'Kopi Bubuk', 'Tenun Tradisional', 'Keripik Pisang'];
        $priceRanges = ['Rp 10.000 - Rp 50.000', 'Rp 25.000 - Rp 100.000', 'Rp 5.000 - Rp 25.000'];

        $products = [
            $faker->word() . ' Premium',
            $faker->word() . ' Khas Karamatwangi',
            $faker->word() . ' Organik'
        ];

        return [
            'owner_name' => $faker->randomElement($ownerNames),
            'product_type' => $faker->randomElement($productTypes),
            'price_range' => $faker->randomElement($priceRanges),
            'products' => $products,
            'opening_hours' => '08:00 - 17:00 WIB',
        ];
    }
}
