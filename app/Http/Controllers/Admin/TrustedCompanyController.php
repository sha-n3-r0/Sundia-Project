<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TrustedCompany;
use App\Support\PublicUrl;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TrustedCompanyController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/TrustedCompanies/Index', [
            'companies' => TrustedCompany::query()
                ->orderBy('display_order')
                ->orderBy('id')
                ->get()
                ->map(fn (TrustedCompany $c) => [
                    'id' => $c->id,
                    'name' => $c->name,
                    'logo_path' => PublicUrl::web($c->logo_path),
                    'display_order' => (int) $c->display_order,
                    'is_active' => (bool) $c->is_active,
                ]),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'logo_file' => ['nullable', 'image', 'max:4096'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $company = new TrustedCompany();
        $company->name = $validated['name'];
        $company->display_order = (int) ($validated['display_order'] ?? 0);
        $company->is_active = (bool) ($validated['is_active'] ?? true);

        $logoUrl = $this->storePublicUpload($request, 'logo_file', 'uploads/trusted-companies');
        if ($logoUrl) {
            $company->logo_path = $logoUrl;
        }

        $company->save();

        return redirect()
            ->route('admin.trusted-companies.index')
            ->with('success', 'Trusted company created.');
    }

    public function update(Request $request, TrustedCompany $trustedCompany): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'logo_file' => ['nullable', 'image', 'max:4096'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        if (array_key_exists('name', $validated)) {
            $trustedCompany->name = $validated['name'] ?? $trustedCompany->name;
        }
        if (array_key_exists('display_order', $validated)) {
            $trustedCompany->display_order = (int) ($validated['display_order'] ?? $trustedCompany->display_order);
        }
        if (array_key_exists('is_active', $validated)) {
            $trustedCompany->is_active = (bool) ($validated['is_active'] ?? $trustedCompany->is_active);
        }

        $logoUrl = $this->storePublicUpload($request, 'logo_file', 'uploads/trusted-companies');
        if ($logoUrl) {
            $trustedCompany->logo_path = $logoUrl;
        }

        $trustedCompany->save();

        return redirect()
            ->route('admin.trusted-companies.index')
            ->with('success', 'Trusted company updated.');
    }

    public function destroy(TrustedCompany $trustedCompany): RedirectResponse
    {
        $trustedCompany->delete();

        return redirect()
            ->route('admin.trusted-companies.index')
            ->with('success', 'Trusted company deleted.');
    }
}

