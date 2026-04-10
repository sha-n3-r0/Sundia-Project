<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TopoffroadProductsSeeder extends Seeder
{
    public function run(): void
    {
        if (!Schema::hasTable('topoffroad_products')) {
            return;
        }

        if (DB::table('topoffroad_products')->exists()) {
            return;
        }

        DB::table('topoffroad_products')->insert([
            [
                'category' => 'car-accessories',
                'title' => 'ADJUSTABLE HEADREST',
                'description' => '360° Adjustable, Memory foam comfort, Easy installation',
                'image_path' => '/adjustable-headrest.png',
                'display_order' => 0,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category' => 'car-accessories',
                'title' => 'EXTREME BLAST HORN',
                'description' => 'High decibel, Compact design, Easy installation',
                'image_path' => '/extreme-blast-horn.png',
                'display_order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category' => 'car-accessories',
                'title' => 'DIFFERENTIAL BREATHER KIT',
                'description' => 'Off-road ready, Water protection, Easy installation',
                'image_path' => '/differential-breather-kit.png',
                'display_order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category' => 'car-accessories',
                'title' => 'RUGGED CASE',
                'description' => 'Heavy-duty build, Weather resistant, Lockable latches',
                'image_path' => '/rugged-case.png',
                'display_order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category' => 'car-accessories',
                'title' => 'FRONT BUMPER',
                'description' => 'Winch ready, Steel construction, Easy installation',
                'image_path' => '/front-bumper.png',
                'display_order' => 4,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category' => 'car-accessories',
                'title' => 'SECURITY STRAP',
                'description' => 'Heavy-duty hooks, High load rating, Easy storage',
                'image_path' => '/security-strap.png',
                'display_order' => 5,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category' => 'car-accessories',
                'title' => 'CASE',
                'description' => 'Keeps gear cold, Durable shell, Secure latches',
                'image_path' => '/case.png',
                'display_order' => 6,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category' => 'car-accessories',
                'title' => 'RAMPAGE LEAF SPRING',
                'description' => 'Improved load, Smoother ride, Durable steel',
                'image_path' => '/rampage-leaf-spring.png',
                'display_order' => 7,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category' => 'car-accessories',
                'title' => 'COIL SPRING',
                'description' => 'Lift ready, Enhanced control, Easy fitment',
                'image_path' => '/coil-spring.png',
                'display_order' => 8,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
