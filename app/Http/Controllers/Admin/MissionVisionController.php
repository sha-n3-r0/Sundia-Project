<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MissionVision;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class MissionVisionController extends Controller
{
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'mission_text' => ['nullable', 'string'],
            'vision_text' => ['nullable', 'string'],
        ]);

        $record = MissionVision::query()->first();

        if (! $record) {
            $record = MissionVision::query()->create([
                'mission_text' => $validated['mission_text'] ?? null,
                'vision_text' => $validated['vision_text'] ?? null,
            ]);
        } else {
            $record->fill([
                'mission_text' => array_key_exists('mission_text', $validated) ? ($validated['mission_text'] ?: null) : $record->mission_text,
                'vision_text' => array_key_exists('vision_text', $validated) ? ($validated['vision_text'] ?: null) : $record->vision_text,
            ])->save();
        }

        return redirect()
            ->back()
            ->with('success_mission_vision', 'Mission & Vision updated.');
    }
}

