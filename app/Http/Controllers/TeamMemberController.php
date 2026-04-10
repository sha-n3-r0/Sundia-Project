<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class TeamMemberController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'company_logo' => ['nullable', 'string', 'max:255'],
            'profile_image_file' => ['nullable', 'image', 'max:4096'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $member = new TeamMember();
        $member->name = $validated['name'];
        $member->title = $validated['title'] ?? null;
        $member->company = $validated['company'] ?? null;
        $member->company_logo = $validated['company_logo'] ?? null;
        $member->display_order = (int) ($validated['display_order'] ?? 0);
        $member->is_active = (bool) ($validated['is_active'] ?? true);

        if ($request->hasFile('profile_image_file')) {
            $path = $request->file('profile_image_file')->store('team-members', 'public');
            $member->profile_image_path = '/storage/' . $path;
        }

        $member->save();

        return redirect()
            ->route('dashboard')
            ->with('success_team_member', 'Team member created.');
    }

    public function update(Request $request, TeamMember $teamMember): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'company_logo' => ['nullable', 'string', 'max:255'],
            'profile_image_file' => ['nullable', 'image', 'max:4096'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $teamMember->name = $validated['name'];
        $teamMember->title = array_key_exists('title', $validated) ? ($validated['title'] ?: null) : $teamMember->title;
        $teamMember->company = array_key_exists('company', $validated) ? ($validated['company'] ?: null) : $teamMember->company;
        $teamMember->company_logo = array_key_exists('company_logo', $validated) ? ($validated['company_logo'] ?: null) : $teamMember->company_logo;
        $teamMember->display_order = (int) ($validated['display_order'] ?? $teamMember->display_order);
        $teamMember->is_active = (bool) ($validated['is_active'] ?? $teamMember->is_active);

        if ($request->hasFile('profile_image_file')) {
            $path = $request->file('profile_image_file')->store('team-members', 'public');
            $teamMember->profile_image_path = '/storage/' . $path;
        }

        $teamMember->save();

        return redirect()
            ->route('dashboard')
            ->with('success_team_member', 'Team member updated.');
    }

    public function destroy(TeamMember $teamMember): RedirectResponse
    {
        $teamMember->delete();

        return redirect()
            ->route('dashboard')
            ->with('success_team_member', 'Team member deleted.');
    }
}

