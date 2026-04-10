<?php

namespace App\Http\Controllers;

use App\Models\Tpsmi;
use App\Models\TpsmipageVideo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class TpsmiController extends Controller
{
    /**
     * Update TPSMI primary configuration (stats + legacy video content)
     * from the owner dashboard.
     */
    public function updatePrimary(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'content' => ['nullable', 'array'],
            'flash_key' => ['nullable', 'string', 'in:stats,video'],
            'video_file' => [
                'nullable',
                'file',
                'mimetypes:video/mp4,video/quicktime,video/x-msvideo,video/x-ms-wmv,video/webm',
                'max:512000',
            ],
            'video_thumbnail_file' => ['nullable', 'image', 'max:4096'],
        ]);

        $tpsmi = Tpsmi::firstOrCreate([]);

        // Ensure defaults exist at least once (matches current hardcoded TPSMI page).
        if (empty($tpsmi->content) || !is_array($tpsmi->content)) {
            $tpsmi->content = [
                'stats_title_line1' => 'WHAT',
                'stats_title_line2' => 'WE',
                'stats_title_line3' => 'DO?',
                'stats_items' => [
                    ['value' => '25+', 'label' => 'Years Experience'],
                    ['value' => '3', 'label' => 'Affiliated Companies'],
                    ['value' => '500+', 'label' => 'Team Members'],
                    ['value' => '1000+', 'label' => 'Projects Completed'],
                ],
            ];
        }

        // Normalize content in case it was stored incorrectly in the past.
        $content = $tpsmi->content;
        if (is_string($content)) {
            $decoded = json_decode($content, true);
            $content = is_array($decoded) ? $decoded : [];
        } elseif (is_array($content)) {
            if (Arr::isList($content) && count($content) > 2 && is_string($content[0] ?? null)) {
                $maybeJson = implode('', array_map(fn ($v) => is_string($v) ? $v : '', $content));
                $decoded = json_decode($maybeJson, true);
                if (is_array($decoded)) {
                    $content = $decoded;
                }
            }
        } else {
            $content = [];
        }

        if (array_key_exists('content', $validated)) {
            $content = array_merge($content, $validated['content'] ?? []);
        }

        // Handle TPSMI legacy video file upload (stored in tpsmis.content.video)
        if ($request->hasFile('video_file')) {
            $videoPath = $request->file('video_file')->store('tpsmi-videos', 'public');
            $content['video'] = is_array($content['video'] ?? null) ? $content['video'] : [];
            $content['video']['url'] = '/storage/' . $videoPath;
        }

        // Handle TPSMI legacy video thumbnail upload (stored in tpsmis.content.video)
        if ($request->hasFile('video_thumbnail_file')) {
            $thumbPath = $request->file('video_thumbnail_file')->store('tpsmi-video-thumbnails', 'public');
            $content['video'] = is_array($content['video'] ?? null) ? $content['video'] : [];
            $content['video']['thumbnail'] = '/storage/' . $thumbPath;
        }

        $tpsmi->content = $content;
        $tpsmi->save();

        // Keep the newer `tpsmipage_videos` table in sync when saving video.
        // Dashboard stores video fields inside `tpsmis.content.video` (legacy format).
        if (($validated['flash_key'] ?? null) === 'video') {
            $videoContent = is_array($content['video'] ?? null) ? $content['video'] : [];

            $videoRow = TpsmipageVideo::query()->firstOrCreate([
                'id' => 1,
            ]);

            $url = $videoContent['url'] ?? null;
            $isStoragePath = is_string($url) && str_starts_with($url, '/storage/');

            $videoRow->title = $videoContent['title'] ?? null;
            $videoRow->video_path = $isStoragePath ? $url : ($videoContent['video_path'] ?? null);
            $videoRow->video_url = $isStoragePath ? null : ($url ?? ($videoContent['video_url'] ?? null));
            $videoRow->thumbnail_path = $videoContent['thumbnail'] ?? null;
            $videoRow->overlay_enabled = true;
            $videoRow->overlay_image_path = $videoContent['overlay_image'] ?? null;
            $videoRow->is_active = (bool) ($videoContent['active'] ?? true);
            $videoRow->save();
        }

        $flashKey = $validated['flash_key'] ?? null;
        if ($flashKey === 'video') {
            return back()->with('success_tpsmi_video', 'TPSMI page video updated.');
        }

        return back()->with('success_tpsmi_stats', '"What we do" stats updated.');
    }
}

