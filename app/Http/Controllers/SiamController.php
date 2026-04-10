<?php

namespace App\Http\Controllers;

use App\Models\Siam;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;

class SiamController extends Controller
{
    /**
     * Update the primary SIAM configuration (content) from the owner dashboard.
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

        $siam = Siam::firstOrCreate([]);

        // Ensure defaults exist at least once (matches current hardcoded SIAM page).
        if (empty($siam->content) || !is_array($siam->content)) {
            $siam->content = [
                'stats_title_line1' => 'WHAT',
                'stats_title_line2' => 'WE',
                'stats_title_line3' => 'DO?',
                'stats_items' => [
                    ['value' => '25+', 'label' => 'Years Experience'],
                    ['value' => '5', 'label' => 'Affiliated Companies'],
                    ['value' => '500+', 'label' => 'Team Members'],
                    ['value' => '1000+', 'label' => 'Projects Completed'],
                ],
            ];
        }

        // Normalize content in case it was stored incorrectly in the past.
        $content = $siam->content;
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

        // Handle SIAM page video file upload
        if ($request->hasFile('video_file')) {
            $videoPath = $request->file('video_file')->store('siam-videos', 'public');
            $content['video'] = is_array($content['video'] ?? null) ? $content['video'] : [];
            $content['video']['url'] = '/storage/' . $videoPath;
        }

        // Handle SIAM page video thumbnail upload
        if ($request->hasFile('video_thumbnail_file')) {
            $thumbPath = $request->file('video_thumbnail_file')->store('siam-video-thumbnails', 'public');
            $content['video'] = is_array($content['video'] ?? null) ? $content['video'] : [];
            $content['video']['thumbnail'] = '/storage/' . $thumbPath;
        }

        $siam->content = $content;
        $siam->save();

        $flashKey = $validated['flash_key'] ?? null;
        if ($flashKey === 'video') {
            return back()->with('success_siam_video', 'SIAM page video updated.');
        }

        return back()->with('success_stats', '"What we do" stats updated.');
    }
}

