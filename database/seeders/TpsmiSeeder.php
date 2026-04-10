<?php

namespace Database\Seeders;

use App\Models\Tpsmi;
use App\Models\TpsmipageVideo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class TpsmiSeeder extends Seeder
{
    public function run(): void
    {
        if (Schema::hasTable('tpsmis')) {
            Tpsmi::query()->firstOrCreate([], [
                'logo_path' => null,
                'content' => [
                    'stats_title_line1' => 'WHAT',
                    'stats_title_line2' => 'WE',
                    'stats_title_line3' => 'DO?',
                    'stats_items' => [
                        ['value' => '25+', 'label' => 'Years Experience'],
                        ['value' => '3', 'label' => 'Affiliated Companies'],
                        ['value' => '500+', 'label' => 'Team Members'],
                        ['value' => '1000+', 'label' => 'Projects Completed'],
                    ],
                    'video' => [
                        'title' => 'TPSMI Page Video',
                        'url' => '/2025%20Sundia%20Company%20video.mp4',
                        'thumbnail' => null,
                        'active' => true,
                    ],
                ],
            ]);
        }

        if (Schema::hasTable('tpsmipage_videos')) {
            TpsmipageVideo::query()->firstOrCreate(
                ['id' => 1],
                [
                    'title' => 'TPSMI Page Video',
                    'video_url' => '/2025%20Sundia%20Company%20video.mp4',
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

