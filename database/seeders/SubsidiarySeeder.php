<?php

namespace Database\Seeders;

use App\Models\Subsidiary;
use Illuminate\Database\Seeder;

class SubsidiarySeeder extends Seeder
{
    public function run(): void
    {
        if (Subsidiary::query()->exists()) {
            return;
        }

        $rows = [
            [
                'name' => 'SD TRADING C.',
                'description' => 'Founded in 1982 and forged an exclusive partnership with Sunstar of Japan, started supplying windshield sealers to local automotive OEMs. Other products introduced include body sealers, D/G, primers, and adhesives',
                'logo_path' => '/sd-remove.png',
                'background_path' => '/SD.JPG',
                'display_style' => 'dark',
                'display_order' => 0,
                'is_active' => true,
            ],
            [
                'name' => 'SIAM DIRECT',
                'description' => 'Established in 2010 to handle distribution of manufacturing consumables. We also stand as the sales and marketing arm of the whole Sundia group.',
                'logo_path' => '/siam.png',
                'background_path' => null,
                'display_style' => 'light',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'TPMSI',
                'description' => 'Offer a broad range of packaging solutions to meet our customer needs and continuously improve our operations to better respond to those needs.',
                'logo_path' => '/Tpsmilogo.png',
                'background_path' => '/Tpsmiprod.JPG',
                'display_style' => 'dark',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'R2R',
                'description' => 'A primary painting contractor of automotive, motorcycle, and electronic components that includes ED painting, powder coating, and automotive plastic painting.',
                'logo_path' => '/Sundialogo.png',
                'background_path' => null,
                'display_style' => 'light',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'TOP OFFROAD',
                'description' => 'TOP Offroad Philippines have become a major player in the distribution and installation of outdoor and off-road vehicle accessories. We continuously expand our product line to help our customers enjoy the outdoor experience.',
                'logo_path' => '/topoffroadlogo.png',
                'background_path' => '/ford.jpg',
                'display_style' => 'dark',
                'display_order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($rows as $row) {
            Subsidiary::query()->create($row);
        }
    }
}

