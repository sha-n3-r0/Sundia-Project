<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CareerJob;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CareerJobController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'employment_type' => ['required', 'string', 'max:120'],
            'location' => ['required', 'string', 'max:255'],
            'summary' => ['required', 'string'],
            'responsibilities' => ['required', 'array', 'min:1'],
            'responsibilities.*' => ['required', 'string', 'max:500'],
            'icon_variant' => ['nullable', 'integer', 'min:1', 'max:4'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $job = new CareerJob;
        $job->title = $validated['title'];
        $job->employment_type = $validated['employment_type'];
        $job->location = $validated['location'];
        $job->summary = $validated['summary'];
        $job->responsibilities = array_values($validated['responsibilities']);
        $job->icon_variant = (int) ($validated['icon_variant'] ?? 1);
        $job->display_order = (int) ($validated['display_order'] ?? 0);
        $job->is_active = $request->boolean('is_active', true);
        $job->save();

        return redirect()
            ->route('dashboard')
            ->with('success_careers', 'Job opening created.');
    }

    public function update(Request $request, CareerJob $career_job): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'employment_type' => ['nullable', 'string', 'max:120'],
            'location' => ['nullable', 'string', 'max:255'],
            'summary' => ['nullable', 'string'],
            'responsibilities' => ['nullable', 'array', 'min:1'],
            'responsibilities.*' => ['required', 'string', 'max:500'],
            'icon_variant' => ['nullable', 'integer', 'min:1', 'max:4'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        if (array_key_exists('title', $validated) && $validated['title'] !== null) {
            $career_job->title = $validated['title'];
        }
        if (array_key_exists('employment_type', $validated) && $validated['employment_type'] !== null) {
            $career_job->employment_type = $validated['employment_type'];
        }
        if (array_key_exists('location', $validated) && $validated['location'] !== null) {
            $career_job->location = $validated['location'];
        }
        if (array_key_exists('summary', $validated) && $validated['summary'] !== null) {
            $career_job->summary = $validated['summary'];
        }
        if (array_key_exists('responsibilities', $validated) && $validated['responsibilities'] !== null) {
            $career_job->responsibilities = array_values($validated['responsibilities']);
        }
        if (array_key_exists('icon_variant', $validated) && $validated['icon_variant'] !== null) {
            $career_job->icon_variant = (int) $validated['icon_variant'];
        }
        if (array_key_exists('display_order', $validated)) {
            $career_job->display_order = (int) ($validated['display_order'] ?? $career_job->display_order);
        }
        $career_job->is_active = $request->boolean('is_active', (bool) $career_job->is_active);

        $career_job->save();

        return redirect()
            ->route('dashboard')
            ->with('success_careers', 'Job opening updated.');
    }

    public function destroy(CareerJob $career_job): RedirectResponse
    {
        $career_job->delete();

        return redirect()
            ->route('dashboard')
            ->with('success_careers', 'Job opening deleted.');
    }
}
