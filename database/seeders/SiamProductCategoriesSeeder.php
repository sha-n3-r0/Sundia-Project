<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class SiamProductCategoriesSeeder extends Seeder
{
    public function run(): void
    {
        if (!Schema::hasTable('siam_product_categories')) {
            return;
        }

        if (DB::table('siam_product_categories')->exists()) {
            return;
        }

        $rows = [
            [
                'name' => 'PANDEMIC PRODUCTS',
                'card_description' => 'Essential safety and protective products designed to promote health and prevent the spread of infection.',
                'card_image_path' => 'PandemicProducts.png',
                'display_order' => 0,
            ],
            [
                'name' => 'METAL FABRICATION',
                'card_description' => 'Custom metal works crafted with precision and durability for industrial, commercial, and personal use.',
                'card_image_path' => 'MetalFabrication.png',
                'display_order' => 1,
            ],
            [
                'name' => 'TROPHIES & SIGNAGES',
                'card_description' => 'High-quality custom trophies and signages designed for events, businesses, and special recognition.',
                'card_image_path' => 'Trophies.png',
                'display_order' => 2,
            ],
            [
                'name' => 'BOXES & OFFICE SUPPLIES',
                'card_description' => 'Durable packaging boxes and reliable office essentials for everyday business needs.',
                'card_image_path' => 'Boxes.png',
                'display_order' => 3,
            ],
            [
                'name' => 'CONSTRUCTION MATERIALS',
                'card_description' => 'Quality materials built for strength, safety, and reliable construction projects.',
                'card_image_path' => 'https://placehold.co/350x269',
                'display_order' => 4,
            ],
            [
                'name' => 'OTHER CONSUMABLES',
                'card_description' => 'Essential everyday supplies designed for continuous use in various industries and businesses.',
                'card_image_path' => 'https://placehold.co/350x269',
                'display_order' => 5,
            ],
        ];

        foreach ($rows as $row) {
            $slug = Str::slug($row['name']);
            DB::table('siam_product_categories')->insert([
                'name' => $row['name'],
                'slug' => $slug,
                'card_description' => $row['card_description'],
                'card_image_path' => $row['card_image_path'],
                'modal_short_description' => null,
                'display_order' => $row['display_order'],
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
