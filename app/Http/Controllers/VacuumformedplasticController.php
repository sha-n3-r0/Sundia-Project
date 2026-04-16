<?php

namespace App\Http\Controllers;

use App\Models\Vacuumformedplastic;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class VacuumformedplasticController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $this->discardGhostFileField($request, 'image_file');

        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'image_file' => ['required', 'image', 'max:4096'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $picture = new Vacuumformedplastic();
        $picture->title = $validated['title'] ?? null;
        $picture->display_order = (int) ($validated['display_order'] ?? 0);
        $picture->is_active = (bool) ($validated['is_active'] ?? true);

        $publicImagePath = $this->storePublicUpload($request, 'image_file', 'uploads/tpsmi-vacuumformedplastic');
        if ($publicImagePath) {
            $picture->image_path = $publicImagePath;
        }

        $picture->save();

        return redirect()
            ->route('dashboard', ['company' => 'TPSMI'])
            ->with('success_vacuumformedplastic', 'Vacuum formed plastic picture added.');
    }

    public function update(Request $request, Vacuumformedplastic $vacuumformedplastic): RedirectResponse
    {
        $this->discardGhostFileField($request, 'image_file');

        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'image_file' => ['nullable', 'image', 'max:4096'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $vacuumformedplastic->title = array_key_exists('title', $validated)
            ? ($validated['title'] ?: null)
            : $vacuumformedplastic->title;
        $vacuumformedplastic->display_order = (int) ($validated['display_order'] ?? $vacuumformedplastic->display_order);
        $vacuumformedplastic->is_active = (bool) ($validated['is_active'] ?? $vacuumformedplastic->is_active);

        $publicImagePath = $this->storePublicUpload($request, 'image_file', 'uploads/tpsmi-vacuumformedplastic');
        if ($publicImagePath) {
            $vacuumformedplastic->image_path = $publicImagePath;
        }

        $vacuumformedplastic->save();

        return redirect()
            ->route('dashboard', ['company' => 'TPSMI'])
            ->with('success_vacuumformedplastic', 'Vacuum formed plastic picture updated.');
    }

    public function destroy(Vacuumformedplastic $vacuumformedplastic): RedirectResponse
    {
        $vacuumformedplastic->delete();

        return redirect()
            ->route('dashboard', ['company' => 'TPSMI'])
            ->with('success_vacuumformedplastic', 'Vacuum formed plastic picture deleted.');
    }
}
