<?php

namespace App\Http\Controllers;

use App\Models\ContactInfo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ContactInfoController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'type' => ['required', 'string', 'in:Address,Phone,Email,Hours'],
            'title' => ['nullable', 'string', 'max:255'],
            'value' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:100'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        ContactInfo::create([
            'type' => $validated['type'],
            'title' => $validated['title'] ?? null,
            'value' => $validated['value'] ?? null,
            'icon' => $validated['icon'] ?? null,
            'display_order' => (int) ($validated['display_order'] ?? 0),
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return redirect()
            ->route('dashboard')
            ->with('success_contact_info', 'Contact item created.');
    }

    public function update(Request $request, ContactInfo $contactInfo): RedirectResponse
    {
        $validated = $request->validate([
            'type' => ['required', 'string', 'in:Address,Phone,Email,Hours'],
            'title' => ['nullable', 'string', 'max:255'],
            'value' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:100'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $contactInfo->type = $validated['type'];
        $contactInfo->title = $validated['title'] ?? null;
        $contactInfo->value = $validated['value'] ?? null;
        $contactInfo->icon = $validated['icon'] ?? null;
        $contactInfo->display_order = (int) ($validated['display_order'] ?? $contactInfo->display_order);
        $contactInfo->is_active = (bool) ($validated['is_active'] ?? $contactInfo->is_active);
        $contactInfo->save();

        return redirect()
            ->route('dashboard')
            ->with('success_contact_info', 'Contact item updated.');
    }

    public function destroy(ContactInfo $contactInfo): RedirectResponse
    {
        $contactInfo->delete();

        return redirect()
            ->route('dashboard')
            ->with('success_contact_info', 'Contact item deleted.');
    }
}

