<?php

namespace App\Http\Controllers;

use App\Models\UpcomingEvent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class UpcomingEventController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'month_label' => ['required', 'string', 'max:12'],
            'day_label' => ['required', 'string', 'max:8'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        UpcomingEvent::create([
            'title' => $validated['title'],
            'location' => $validated['location'],
            'month_label' => strtoupper(trim($validated['month_label'])),
            'day_label' => trim($validated['day_label']),
            'display_order' => (int) ($validated['display_order'] ?? 0),
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return redirect()
            ->route('dashboard')
            ->with('success_upcoming_event', 'Upcoming event created.');
    }

    public function update(Request $request, UpcomingEvent $upcomingEvent): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'month_label' => ['required', 'string', 'max:12'],
            'day_label' => ['required', 'string', 'max:8'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $upcomingEvent->title = $validated['title'];
        $upcomingEvent->location = $validated['location'];
        $upcomingEvent->month_label = strtoupper(trim($validated['month_label']));
        $upcomingEvent->day_label = trim($validated['day_label']);
        $upcomingEvent->display_order = (int) ($validated['display_order'] ?? $upcomingEvent->display_order);
        $upcomingEvent->is_active = (bool) ($validated['is_active'] ?? $upcomingEvent->is_active);
        $upcomingEvent->save();

        return redirect()
            ->route('dashboard')
            ->with('success_upcoming_event', 'Upcoming event updated.');
    }

    public function destroy(UpcomingEvent $upcomingEvent): RedirectResponse
    {
        $upcomingEvent->delete();

        return redirect()
            ->route('dashboard')
            ->with('success_upcoming_event', 'Upcoming event deleted.');
    }
}
