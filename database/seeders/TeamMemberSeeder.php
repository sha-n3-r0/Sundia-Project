<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            [
                'name' => 'MR. DANTE LAMANDO',
                'title' => 'CHAIRMAN',
                'company' => 'SUNDIA',
                'company_logo' => 'sundia',
                'display_order' => 0,
                'is_active' => true,
            ],
            [
                'name' => 'MR. JEP BERNAS',
                'title' => 'PRESIDENT',
                'company' => 'TPSMI',
                'company_logo' => 'tpsmi',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'MR. GENER DOCTORA',
                'title' => 'VICE PRESIDENT',
                'company' => 'TOP OFFROAD',
                'company_logo' => 'top',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'MS. RHOMAY ANTONIO',
                'title' => 'ASST. PLANT MANAGER',
                'company' => 'SUNDIA',
                'company_logo' => 'sundia',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'MR. RD ELIZONDO',
                'title' => 'MARKETING MANAGER',
                'company' => 'SUNDIA',
                'company_logo' => 'sundia',
                'display_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'MR. ROMEO AMORES, JR.',
                'title' => 'SR. ACCOUNTS OFFICER',
                'company' => 'SUNDIA',
                'company_logo' => 'sundia',
                'display_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($defaults as $row) {
            TeamMember::query()->updateOrCreate(
                ['name' => $row['name']],
                $row,
            );
        }
    }
}

