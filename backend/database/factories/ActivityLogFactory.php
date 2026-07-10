<?php

namespace Database\Factories;

use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ActivityLog>
 */
class ActivityLogFactory extends Factory
{
    /**
     * The model the factory corresponds to.
     */
    protected $model = ActivityLog::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = $this->faker;

        return [
            'user_id' => User::factory(),
            'action' => $faker->randomElement([
                'potential.created',
                'potential.updated',
                'potential.deleted',
                'auth.login',
                'auth.logout',
            ]),
            'subject_id' => $faker->uuid(),
            'subject_type' => 'App\\Models\\Potential',
            'ip_address' => $faker->ipv4(),
            'created_at' => $faker->dateTimeThisYear(),
        ];
    }
}
