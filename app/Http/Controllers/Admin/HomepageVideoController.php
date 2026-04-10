<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomepageVideo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomepageVideoController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/HomepageVideos/Index', [
            'videos' => HomepageVideo::query()
                ->latest('id')
                ->get()
                ->map(fn (HomepageVideo $v) => [
                    'id' => $v->id,
                    'title' => $v->title,
                    'video_url' => $v->video_url,
                    'video_path' => $v->video_path,
                    'thumbnail_path' => $v->thumbnail_path,
                    'overlay_enabled' => (bool) $v->overlay_enabled,
                    'overlay_image_path' => $v->overlay_image_path,
                    'is_active' => (bool) $v->is_active,
                    'created_at' => $v->created_at?->toISOString(),
                    'updated_at' => $v->updated_at?->toISOString(),
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/HomepageVideos/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'video_url' => ['nullable', 'url', 'max:2048'],
            'video_file' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime,video/x-msvideo,video/x-ms-wmv,video/webm', 'max:512000'],
            'thumbnail_file' => ['nullable', 'image', 'max:4096'],
            'overlay_enabled' => ['nullable', 'boolean'],
            'overlay_image_file' => ['nullable', 'image', 'max:4096'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $video = new HomepageVideo();
        $video->title = $validated['title'] ?? null;
        $video->video_url = $validated['video_url'] ?? null;
        $video->overlay_enabled = (bool) ($validated['overlay_enabled'] ?? true);
        $video->is_active = (bool) ($validated['is_active'] ?? true);

        if ($request->hasFile('video_file')) {
            $path = $request->file('video_file')->store('homepage-videos', 'public');
            $video->video_path = '/storage/' . $path;
        }

        if ($request->hasFile('thumbnail_file')) {
            $path = $request->file('thumbnail_file')->store('homepage-video-thumbnails', 'public');
            $video->thumbnail_path = '/storage/' . $path;
        }

        if ($request->hasFile('overlay_image_file')) {
            $path = $request->file('overlay_image_file')->store('homepage-video-overlays', 'public');
            $video->overlay_image_path = '/storage/' . $path;
        }

        // If a file was uploaded, it becomes the source; keep URL only as fallback.
        if ($video->video_path) {
            // keep as-is
        } elseif (!$video->video_url) {
            return back()
                ->withErrors(['video_url' => 'Please provide a video URL or upload a video file.'])
                ->withInput();
        }

        $video->save();

        return redirect()
            ->route('admin.homepage-videos.index')
            ->with('success', 'Homepage video created.');
    }

    public function edit(HomepageVideo $homepageVideo): Response
    {
        return Inertia::render('Admin/HomepageVideos/Edit', [
            'video' => [
                'id' => $homepageVideo->id,
                'title' => $homepageVideo->title,
                'video_url' => $homepageVideo->video_url,
                'video_path' => $homepageVideo->video_path,
                'thumbnail_path' => $homepageVideo->thumbnail_path,
                'overlay_enabled' => (bool) $homepageVideo->overlay_enabled,
                'overlay_image_path' => $homepageVideo->overlay_image_path,
                'is_active' => (bool) $homepageVideo->is_active,
            ],
        ]);
    }

    public function update(Request $request, HomepageVideo $homepageVideo): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'video_url' => ['nullable', 'url', 'max:2048'],
            'video_file' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime,video/x-msvideo,video/x-ms-wmv,video/webm', 'max:512000'],
            'thumbnail_file' => ['nullable', 'image', 'max:4096'],
            'overlay_enabled' => ['nullable', 'boolean'],
            'overlay_image_file' => ['nullable', 'image', 'max:4096'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $homepageVideo->title = $validated['title'] ?? $homepageVideo->title;
        $homepageVideo->video_url = array_key_exists('video_url', $validated)
            ? ($validated['video_url'] ?: null)
            : $homepageVideo->video_url;
        $homepageVideo->overlay_enabled = (bool) ($validated['overlay_enabled'] ?? $homepageVideo->overlay_enabled);
        $homepageVideo->is_active = (bool) ($validated['is_active'] ?? $homepageVideo->is_active);

        if ($request->hasFile('video_file')) {
            $path = $request->file('video_file')->store('homepage-videos', 'public');
            $homepageVideo->video_path = '/storage/' . $path;
        }

        if ($request->hasFile('thumbnail_file')) {
            $path = $request->file('thumbnail_file')->store('homepage-video-thumbnails', 'public');
            $homepageVideo->thumbnail_path = '/storage/' . $path;
        }

        if ($request->hasFile('overlay_image_file')) {
            $path = $request->file('overlay_image_file')->store('homepage-video-overlays', 'public');
            $homepageVideo->overlay_image_path = '/storage/' . $path;
        }

        if (!$homepageVideo->video_path && !$homepageVideo->video_url) {
            return back()
                ->withErrors(['video_url' => 'Please provide a video URL or upload a video file.'])
                ->withInput();
        }

        $homepageVideo->save();

        return redirect()
            ->route('admin.homepage-videos.index')
            ->with('success', 'Homepage video updated.');
    }

    public function destroy(HomepageVideo $homepageVideo): RedirectResponse
    {
        $homepageVideo->delete();

        return redirect()
            ->route('admin.homepage-videos.index')
            ->with('success', 'Homepage video deleted.');
    }
}

