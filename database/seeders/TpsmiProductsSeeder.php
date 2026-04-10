<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TpsmiProductsSeeder extends Seeder
{
    public function run(): void
    {
        if (!Schema::hasTable('tpsmi_products')) {
            return;
        }

        if (DB::table('tpsmi_products')->exists()) {
            return;
        }

        DB::table('tpsmi_products')->insert([
            [
                'title' => 'CORRUGATED BOX',
                'description' => 'Durable, Custom sizes, Eco-friendly',
                'image_path' => '/CORRUGATED BOX.png',
                'display_order' => 0,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'BILAO BOX',
                'description' => 'Food-grade, Stackable, Secure fit',
                'image_path' => '/Bilao Box.png',
                'display_order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'BELLY BOX',
                'description' => 'Heavy duty, Versatile, Cost-effective',
                'image_path' => '/BELLY BOX.png',
                'display_order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'ANTI-STATIC BUBBLE SHEET POUCH',
                'description' => 'ESD protection, Reusable, Tear resistant',
                'image_path' => '/AntiStatic.png',
                'display_order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'PE FOAM POUCH',
                'description' => 'Cushioning, Lightweight, Flexible',
                'image_path' => '/PE FOAM PoUCH.png',
                'display_order' => 4,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'BUBBLE SHEET SLEEVES',
                'description' => 'Easy to use, Protective, Multiple sizes',
                'image_path' => '/BUBBLE SHEET SLEEVES.png',
                'display_order' => 5,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

