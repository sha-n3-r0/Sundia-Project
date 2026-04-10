<?php

namespace App\Http\Controllers;

use App\Models\MissionVision;
use App\Models\Sundia;
use App\Models\Subsidiary;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SundiaController extends Controller
{
    /**
     * Display a listing of the Sundia homepage configurations.
     */
    public function index(): JsonResponse
    {
        return response()->json(Sundia::all());
    }

    /**
     * Store a newly created Sundia homepage configuration.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'logo' => ['nullable', 'image', 'max:2048'],
            'content' => ['nullable', 'array'],
        ]);

        $data = [
            'content' => $validated['content'] ?? null,
        ];

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('logos', 'public');
            $data['logo_path'] = '/storage/' . $path;
        }

        $sundia = Sundia::create($data);

        return response()->json($sundia, 201);
    }

    /**
     * Display a specific Sundia homepage configuration.
     */
    public function show(Sundia $sundium): JsonResponse
    {
        return response()->json($sundium);
    }

    /**
     * Update a specific Sundia homepage configuration.
     */
    public function update(Request $request, Sundia $sundium): JsonResponse
    {
        $validated = $request->validate([
            'logo' => ['nullable', 'image', 'max:2048'],
            'content' => ['nullable', 'array'],
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('logos', 'public');
            $sundium->logo_path = '/storage/' . $path;
        }

        if (array_key_exists('content', $validated)) {
            $sundium->content = $validated['content'];
        }

        $sundium->save();

        return response()->json($sundium);
    }

    /**
     * Remove a specific Sundia homepage configuration.
     */
    public function destroy(Sundia $sundium): JsonResponse
    {
        $sundium->delete();

        return response()->json(['message' => 'Deleted'], 204);
    }

    /**
     * Edit the primary Sundia homepage configuration used by the owner dashboard.
     */
    public function editPrimary(): Response
    {
        $sundia = Sundia::first();
        $missionVision = MissionVision::query()->first();
        $subsidiaries = Subsidiary::query()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (Subsidiary $s) => [
                'id' => $s->id,
                'name' => $s->name,
                'description' => $s->description,
                'logo_path' => $s->logo_path,
                'background_path' => $s->background_path,
                'display_style' => $s->display_style,
                'display_order' => (int) $s->display_order,
                'is_active' => (bool) $s->is_active,
            ]);

        return Inertia::render('Dashboard', [
            'sundia' => $sundia,
            'missionVision' => $missionVision ? [
                'mission_text' => $missionVision->mission_text,
                'vision_text' => $missionVision->vision_text,
            ] : null,
            'subsidiaries' => $subsidiaries,
        ]);
    }

    /**
     * Update the primary Sundia configuration (logo and content) from the owner dashboard.
     */
    public function updatePrimary(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'logo' => ['nullable', 'image', 'max:2048'],
            'content' => ['nullable', 'array'],
            'video_file' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime,video/x-msvideo,video/x-ms-wmv', 'max:512000'],
            'video_thumbnail_file' => ['nullable', 'image', 'max:4096'],
            'flash_key' => ['nullable', 'string', 'in:logo,stats,video'],
        ]);

        $sundia = Sundia::firstOrCreate([]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('logos', 'public');
            $sundia->logo_path = '/storage/' . $path;
        }

        // Content may be stored in multiple legacy/incorrect formats; normalize to an associative array.
        $content = $sundia->content;
        if (is_string($content)) {
            $decoded = json_decode($content, true);
            $content = is_array($decoded) ? $decoded : [];
        } elseif (is_array($content)) {
            // If content accidentally became a "character array" (JS spread of a string),
            // try to reconstruct the original JSON object.
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
            // Merge basic content fields (stats, etc.)
            $content = array_merge($content, $validated['content']);
        }

        // Handle video file upload
        if ($request->hasFile('video_file')) {
            $videoPath = $request->file('video_file')->store('videos', 'public');
            $content['video'] = is_array($content['video'] ?? null) ? $content['video'] : [];
            $content['video']['url'] = '/storage/' . $videoPath;
        }

        // Handle video thumbnail upload
        if ($request->hasFile('video_thumbnail_file')) {
            $thumbPath = $request->file('video_thumbnail_file')->store('video-thumbnails', 'public');
            $content['video'] = is_array($content['video'] ?? null) ? $content['video'] : [];
            $content['video']['thumbnail'] = '/storage/' . $thumbPath;
        }

        // Ensure video metadata (title/active) is preserved from content payload if present
        if (isset($validated['content']['video'])) {
            $content['video'] = is_array($content['video'] ?? null) ? $content['video'] : [];
            $content['video'] = array_merge($content['video'], Arr::wrap($validated['content']['video']));
        }

        $sundia->content = $content;

        $sundia->save();

        $flashKey = $validated['flash_key'] ?? null;
        $message = match ($flashKey) {
            'logo' => 'Logo updated.',
            'stats' => '"What we do" stats updated.',
            'video' => 'Homepage video updated.',
            default => 'Sundia homepage updated.',
        };

        if ($flashKey) {
            return back()->with('success_' . $flashKey, $message);
        }

        return back()->with('success', $message);
    }
}

