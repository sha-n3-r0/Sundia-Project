<?php

namespace Database\Seeders;

use App\Models\Topoffroad;
use App\Models\TopoffroadpageVideo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class TopoffroadSeeder extends Seeder
{
    public function run(): void
    {
        if (Schema::hasTable('topoffroads')) {
            Topoffroad::query()->firstOrCreate([], [
                'logo_path' => '/topoffroadlogo.png',
                'content' => [
                    'stats_title_line1' => 'WHAT',
                    'stats_title_line2' => 'WE',
                    'stats_title_line3' => 'DO?',
                    'stats_items' => [
                        ['value' => '25+', 'label' => 'Years Experience'],
                        ['value' => '5', 'label' => 'Affiliated Companies'],
                        ['value' => '500+', 'label' => 'Team Members'],
                        ['value' => '1000+', 'label' => 'Projects Completed'],
                    ],
                    'video' => [
                        'title' => 'TOP OFFROAD Page Video',
                        'url' => '/2024%20TOP%20Offroad%20presentation.mp4',
                        'thumbnail' => null,
                        'active' => true,
                    ],
                ],
            ]);
        }

        if (Schema::hasTable('topoffroadpage_videos')) {
            TopoffroadpageVideo::query()->firstOrCreate(
                ['id' => 1],
                [
                    'title' => 'TOP OFFROAD Page Video',
                    'video_url' => '/2024%20TOP%20Offroad%20presentation.mp4',
                    'video_path' => null,
                    'thumbnail_path' => null,
                    'overlay_enabled' => true,
                    'overlay_image_path' => null,
                    'is_active' => true,
                ]
            );
        }
    }
}

