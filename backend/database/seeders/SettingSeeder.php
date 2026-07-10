<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

/**
 * SettingSeeder
 *
 * Infrastructure Seeder (Safe for production).
 * Seeds default site settings.
 */
class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::create([
            'key' => 'site.name',
            'value' => 'Website Potensi Desa Karamatwangi',
            'type' => 'string',
            'group' => 'site',
        ]);

        Setting::create([
            'key' => 'site.whatsapp',
            'value' => '6281234567890',
            'type' => 'string',
            'group' => 'site',
        ]);

        Setting::create([
            'key' => 'map.default_zoom',
            'value' => '14',
            'type' => 'integer',
            'group' => 'map',
        ]);
    }
}
