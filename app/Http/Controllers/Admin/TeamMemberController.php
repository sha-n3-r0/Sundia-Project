<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use App\Support\PublicUrl;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeamMemberController extends Controller
{
    private const LOGO_OPTIONS = [
        ['value' => 'sundia', 'label' => 'Sundia'],
        ['value' => 'tpsmi', 'label' => 'TPSMI'],
        ['value' => 'top', 'label' => 'Top Offroad'],
    ];

    public function index(): Response
    {
        return Inertia::render('Admin/TeamMembers/Index', [
            'logoOptions' => self::LOGO_OPTIONS,
            'members' => TeamMember::query()
                ->orderBy('display_order')
                ->orderBy('id')
                ->get()
                ->map(fn (TeamMember $m) => [
                    'id' => $m->id,
                    'name' => $m->name,
                    'title' => $m->title,
                    'company' => $m->company,
                    'profile_image_path' => PublicUrl::web($m->profile_image_path),
                    'company_logo' => $m->company_logo,
                    'display_order' => (int) $m->display_order,
                    'is_active' => (bool) $m->is_active,
                ]),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'company_logo' => ['nullable', 'string', 'max:255'],
            'profile_image_file' => ['nullable', 'image', 'max:4096'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $member = new TeamMember();
        $member->name = $validated['name'];
        $member->title = $validated['title'] ?? null;
        $member->company = $validated['company'] ?? null;
        $member->company_logo = $validated['company_logo'] ?? null;
        $member->display_order = (int) ($validated['display_order'] ?? 0);
        $member->is_active = (bool) ($validated['is_active'] ?? true);

        $profileUrl = $this->storePublicUpload($request, 'profile_image_file', 'uploads/team-members');
        if ($profileUrl) {
            $member->profile_image_path = $profileUrl;
        }

        $member->save();

        return redirect()
            ->route('admin.team-members.index')
            ->with('success', 'Team member created.');
    }

    public function update(Request $request, TeamMember $teamMember): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'company_logo' => ['nullable', 'string', 'max:255'],
            'profile_image_file' => ['nullable', 'image', 'max:4096'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        if (array_key_exists('name', $validated)) {
            $teamMember->name = $validated['name'] ?? $teamMember->name;
        }
        if (array_key_exists('title', $validated)) {
            $teamMember->title = $validated['title'] ?: null;
        }
        if (array_key_exists('company', $validated)) {
            $teamMember->company = $validated['company'] ?: null;
        }
        if (array_key_exists('company_logo', $validated)) {
            $teamMember->company_logo = $validated['company_logo'] ?: null;
        }
        if (array_key_exists('display_order', $validated)) {
            $teamMember->display_order = (int) ($validated['display_order'] ?? $teamMember->display_order);
        }
        if (array_key_exists('is_active', $validated)) {
            $teamMember->is_active = (bool) ($validated['is_active'] ?? $teamMember->is_active);
        }

        $profileUrl = $this->storePublicUpload($request, 'profile_image_file', 'uploads/team-members');
        if ($profileUrl) {
            $teamMember->profile_image_path = $profileUrl;
        }

        $teamMember->save();

        return redirect()
            ->route('admin.team-members.index')
            ->with('success', 'Team member updated.');
    }

    public function destroy(TeamMember $teamMember): RedirectResponse
    {
        $teamMember->delete();

        return redirect()
            ->route('admin.team-members.index')
            ->with('success', 'Team member deleted.');
    }
}

