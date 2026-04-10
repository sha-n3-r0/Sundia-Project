<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Avoid factories here (project setup may not include `fake()` helper).
        // Create a basic user if none exists yet.
        $hasAnyUser = DB::table('users')->exists();
        if (!$hasAnyUser) {
            DB::table('users')->insert([
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->call([
            SubsidiarySeeder::class,
            TeamMemberSeeder::class,
            TrustedCompanySeeder::class,
            CareersSeeder::class,
            SiamProductCategoriesSeeder::class,
            TpsmiProductsSeeder::class,
            TopoffroadProductsSeeder::class,
            TpsmiSeeder::class,
            TopoffroadSeeder::class,
        ]);
    }
}
