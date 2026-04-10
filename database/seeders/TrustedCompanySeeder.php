<?php

namespace Database\Seeders;

use App\Models\TrustedCompany;
use Illuminate\Database\Seeder;

class TrustedCompanySeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            ['name' => 'SIAM DIRECT', 'logo_path' => '/siam-direct.svg', 'display_order' => 0, 'is_active' => true],
            ['name' => 'TPSMI', 'logo_path' => '/tpsmi-logo.svg', 'display_order' => 1, 'is_active' => true],
            ['name' => 'TOP OFFROAD', 'logo_path' => '/topoffroad-logo.svg', 'display_order' => 2, 'is_active' => true],
        ];

        foreach ($rows as $row) {
            TrustedCompany::query()->updateOrCreate(
                ['name' => $row['name']],
                [
                    'logo_path' => $row['logo_path'] ?? null,
                    'display_order' => $row['display_order'],
                    'is_active' => $row['is_active'],
                ],
            );
        }
    }
}

