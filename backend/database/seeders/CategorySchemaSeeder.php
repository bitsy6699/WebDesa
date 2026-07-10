<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\CategorySchema;
use Illuminate\Database\Seeder;

/**
 * CategorySchemaSeeder
 *
 * Infrastructure Seeder (Safe for production).
 * Seeds the validation and UI definitions for category metadata fields.
 */
class CategorySchemaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. UMKM Schema
        $umkm = Category::where('slug', 'umkm')->first();
        if ($umkm) {
            CategorySchema::create([
                'category_id' => $umkm->id,
                'schema_definition' => [
                    'owner_name' => [
                        'type' => 'string',
                        'required' => true,
                        'label' => 'Nama Pemilik',
                        'validation' => 'min:3|max:100',
                    ],
                    'product_type' => [
                        'type' => 'string',
                        'required' => true,
                        'label' => 'Jenis Produk',
                        'validation' => 'max:100',
                    ],
                    'price_range' => [
                        'type' => 'string',
                        'required' => false,
                        'label' => 'Rentang Harga',
                        'validation' => 'max:100',
                    ],
                    'products' => [
                        'type' => 'array',
                        'required' => true,
                        'label' => 'Produk Unggulan',
                        'validation' => 'array|min:1',
                    ],
                    'opening_hours' => [
                        'type' => 'string',
                        'required' => false,
                        'label' => 'Jam Buka',
                        'validation' => 'max:100',
                    ],
                ],
            ]);
        }

        // 2. Wisata Schema
        $wisata = Category::where('slug', 'wisata')->first();
        if ($wisata) {
            CategorySchema::create([
                'category_id' => $wisata->id,
                'schema_definition' => [
                    'ticket_price' => [
                        'type' => 'number',
                        'required' => true,
                        'label' => 'Harga Tiket (Rp)',
                        'validation' => 'numeric|min:0',
                    ],
                    'facilities' => [
                        'type' => 'array',
                        'required' => false,
                        'label' => 'Fasilitas',
                        'validation' => 'array',
                    ],
                    'opening_hours' => [
                        'type' => 'string',
                        'required' => false,
                        'label' => 'Jam Operasional',
                        'validation' => 'max:100',
                    ],
                ],
            ]);
        }

        // 3. Pertanian Schema
        $pertanian = Category::where('slug', 'pertanian')->first();
        if ($pertanian) {
            CategorySchema::create([
                'category_id' => $pertanian->id,
                'schema_definition' => [
                    'commodity_type' => [
                        'type' => 'string',
                        'required' => true,
                        'label' => 'Jenis Komoditas',
                        'validation' => 'max:100',
                    ],
                    'harvest_season' => [
                        'type' => 'array',
                        'required' => true,
                        'label' => 'Musim Panen',
                        'validation' => 'array|min:1',
                    ],
                    'yield_volume' => [
                        'type' => 'string',
                        'required' => false,
                        'label' => 'Volume Hasil Panen',
                        'validation' => 'max:100',
                    ],
                ],
            ]);
        }
    }
}
