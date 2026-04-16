<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subsidiary;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SubsidiaryController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        Log::info('Subsidiary store called', [
            'user_id' => $request->user()?->id,
            'keys' => array_keys($request->all()),
        ]);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'display_style' => ['required', 'in:dark,light'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
            'logo_file' => ['nullable', 'image', 'max:4096'],
            'background_file' => ['nullable', 'image', 'max:8192'],
        ]);

        $subsidiary = new Subsidiary();
        $subsidiary->name = $validated['name'];
        $subsidiary->description = $validated['description'] ?? null;
        $subsidiary->display_style = $validated['display_style'] ?? 'light';
        $subsidiary->display_order = (int) ($validated['display_order'] ?? 0);
        $subsidiary->is_active = (bool) ($validated['is_active'] ?? true);

        $publicLogoPath = $this->storePublicUpload($request, 'logo_file', 'uploads/subsidiaries/logos');
        if ($publicLogoPath) {
            $subsidiary->logo_path = $publicLogoPath;
        }

        $publicBgPath = $this->storePublicUpload($request, 'background_file', 'uploads/subsidiaries/backgrounds');
        if ($publicBgPath) {
            $subsidiary->background_path = $publicBgPath;
        }

        $subsidiary->save();

        return redirect()
            ->route('dashboard')
            ->with('success_subsidiary', 'Subsidiary created.');
    }

    public function update(Request $request, Subsidiary $subsidiary): RedirectResponse
    {
        Log::info('Subsidiary update called', [
            'user_id' => $request->user()?->id,
            'subsidiary_id' => $subsidiary->id,
            'keys' => array_keys($request->all()),
        ]);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'display_style' => ['required', 'in:dark,light'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
            'logo_file' => ['nullable', 'image', 'max:4096'],
            'background_file' => ['nullable', 'image', 'max:8192'],
        ]);

        $subsidiary->name = $validated['name'];
        $subsidiary->description = array_key_exists('description', $validated) ? ($validated['description'] ?: null) : $subsidiary->description;
        $subsidiary->display_style = $validated['display_style'] ?? $subsidiary->display_style;
        $subsidiary->display_order = (int) ($validated['display_order'] ?? $subsidiary->display_order);
        $subsidiary->is_active = (bool) ($validated['is_active'] ?? $subsidiary->is_active);

        $publicLogoPath = $this->storePublicUpload($request, 'logo_file', 'uploads/subsidiaries/logos');
        if ($publicLogoPath) {
            $subsidiary->logo_path = $publicLogoPath;
        }

        $publicBgPath = $this->storePublicUpload($request, 'background_file', 'uploads/subsidiaries/backgrounds');
        if ($publicBgPath) {
            $subsidiary->background_path = $publicBgPath;
        }

        $subsidiary->save();

        return redirect()
            ->route('dashboard')
            ->with('success_subsidiary', 'Subsidiary updated.');
    }

    public function destroy(Subsidiary $subsidiary): RedirectResponse
    {
        Log::info('Subsidiary destroy called', [
            'user_id' => request()->user()?->id,
            'subsidiary_id' => $subsidiary->id,
        ]);

        $subsidiary->delete();

        return redirect()
            ->route('dashboard')
            ->with('success_subsidiary', 'Subsidiary deleted.');
    }
}

