<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiampageVideo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SiampageVideoController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/SiampageVideos/Index', [
            'videos' => SiampageVideo::query()
                ->latest('id')
                ->get()
                ->map(fn (SiampageVideo $v) => [
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
        return Inertia::render('Admin/SiampageVideos/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'video_url' => ['nullable', 'url', 'max:2048'],
            'video_file' => [
                'nullable',
                'file',
                'mimetypes:video/mp4,video/quicktime,video/x-msvideo,video/x-ms-wmv,video/webm',
                'max:512000',
            ],
            'thumbnail_file' => ['nullable', 'image', 'max:4096'],
            'overlay_enabled' => ['nullable', 'boolean'],
            'overlay_image_file' => ['nullable', 'image', 'max:4096'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $video = new SiampageVideo();
        $video->title = $validated['title'] ?? null;
        $video->video_url = $validated['video_url'] ?? null;
        $video->overlay_enabled = (bool) ($validated['overlay_enabled'] ?? true);
        $video->is_active = (bool) ($validated['is_active'] ?? true);

        if ($request->hasFile('video_file')) {
            $path = $request->file('video_file')->store('siampage-videos', 'public');
            $video->video_path = '/storage/' . $path;
        }

        if ($request->hasFile('thumbnail_file')) {
            $path = $request->file('thumbnail_file')->store('siampage-video-thumbnails', 'public');
            $video->thumbnail_path = '/storage/' . $path;
        }

        if ($request->hasFile('overlay_image_file')) {
            $path = $request->file('overlay_image_file')->store('siampage-video-overlays', 'public');
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
            ->route('admin.siampage-videos.index')
            ->with('success', 'SIAM page video created.');
    }

    public function edit(SiampageVideo $siampageVideo): Response
    {
        return Inertia::render('Admin/SiampageVideos/Edit', [
            'video' => [
                'id' => $siampageVideo->id,
                'title' => $siampageVideo->title,
                'video_url' => $siampageVideo->video_url,
                'video_path' => $siampageVideo->video_path,
                'thumbnail_path' => $siampageVideo->thumbnail_path,
                'overlay_enabled' => (bool) $siampageVideo->overlay_enabled,
                'overlay_image_path' => $siampageVideo->overlay_image_path,
                'is_active' => (bool) $siampageVideo->is_active,
            ],
        ]);
    }

    public function update(Request $request, SiampageVideo $siampageVideo): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'video_url' => ['nullable', 'url', 'max:2048'],
            'video_file' => [
                'nullable',
                'file',
                'mimetypes:video/mp4,video/quicktime,video/x-msvideo,video/x-ms-wmv,video/webm',
                'max:512000',
            ],
            'thumbnail_file' => ['nullable', 'image', 'max:4096'],
            'overlay_enabled' => ['nullable', 'boolean'],
            'overlay_image_file' => ['nullable', 'image', 'max:4096'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $siampageVideo->title = $validated['title'] ?? $siampageVideo->title;
        $siampageVideo->video_url = array_key_exists('video_url', $validated)
            ? ($validated['video_url'] ?: null)
            : $siampageVideo->video_url;

        $siampageVideo->overlay_enabled = (bool) ($validated['overlay_enabled'] ?? $siampageVideo->overlay_enabled);
        $siampageVideo->is_active = (bool) ($validated['is_active'] ?? $siampageVideo->is_active);

        if ($request->hasFile('video_file')) {
            $path = $request->file('video_file')->store('siampage-videos', 'public');
            $siampageVideo->video_path = '/storage/' . $path;
        }

        if ($request->hasFile('thumbnail_file')) {
            $path = $request->file('thumbnail_file')->store('siampage-video-thumbnails', 'public');
            $siampageVideo->thumbnail_path = '/storage/' . $path;
        }

        if ($request->hasFile('overlay_image_file')) {
            $path = $request->file('overlay_image_file')->store('siampage-video-overlays', 'public');
            $siampageVideo->overlay_image_path = '/storage/' . $path;
        }

        if (!$siampageVideo->video_path && !$siampageVideo->video_url) {
            return back()
                ->withErrors(['video_url' => 'Please provide a video URL or upload a video file.'])
                ->withInput();
        }

        $siampageVideo->save();

        return redirect()
            ->route('admin.siampage-videos.index')
            ->with('success', 'SIAM page video updated.');
    }

    public function destroy(SiampageVideo $siampageVideo): RedirectResponse
    {
        $siampageVideo->delete();

        return redirect()
            ->route('admin.siampage-videos.index')
            ->with('success', 'SIAM page video deleted.');
    }
}

