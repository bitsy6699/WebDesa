<?php

namespace Database\Factories;

use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Location>
 */
class LocationFactory extends Factory
{
    protected $model = Location::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = $this->faker;

        // Generate deterministic coordinates strictly within Karamatwangi boundaries
        // Latitude: 6.7900 to 6.8200 S (negative latitude on southern hemisphere)
        // Longitude: 107.8900 to 107.9200 E
        $latitude = $faker->randomFloat(8, -6.8200, -6.7900);
        $longitude = $faker->randomFloat(8, 107.8900, 107.9200);

        $dusunList = ['Dusun Karamat', 'Dusun Wangi', 'Dusun Cikondang', 'Dusun Sukasari'];
        $dusun = $faker->randomElement($dusunList);

        return [
            'latitude' => $latitude,
            'longitude' => $longitude,
            'address' => $faker->streetAddress() . ', Karamatwangi, Sumedang',
            'dusun' => $dusun,
        ];
    }
}
