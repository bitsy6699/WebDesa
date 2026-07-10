<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

/**
 * DatabaseSeeder
 *
 * Runs all seeders in sequential order to populate categories, schemas, settings,
 * default admin user credentials, and development demo potentials.
 *
 * Execution order:
 * 1. CategorySeeder (Infra)
 * 2. CategorySchemaSeeder (Infra)
 * 3. SettingSeeder (Infra)
 * 4. AdminSeeder (Dev)
 * 5. LocationSeeder (Dev)
 * 6. MediaSeeder (Dev)
 * 7. PotentialSeeder (Dev)
 *
 * @see docs/project/implementation_plan.md
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            // 1. Infrastructure Seeders (Production-Ready)
            CategorySeeder::class,
            CategorySchemaSeeder::class,
            SettingSeeder::class,

            // 2. Development Seeders (Demo Data)
            AdminSeeder::class,
            LocationSeeder::class,
            MediaSeeder::class,
            PotentialSeeder::class,
        ]);
    }
}
