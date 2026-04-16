<?php

namespace App\Http\Controllers;

use App\Models\TrustedCompany;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class TrustedCompanyController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $this->discardGhostFileField($request, 'logo_file');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'logo_file' => ['nullable', 'image', 'max:4096'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
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
            ->route('dashboard')
            ->with('success_trusted_company', 'Trusted company created.');
    }

    public function update(Request $request, TrustedCompany $trustedCompany): RedirectResponse
    {
        $this->discardGhostFileField($request, 'logo_file');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'logo_file' => ['nullable', 'image', 'max:4096'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $trustedCompany->name = $validated['name'];
        $trustedCompany->display_order = (int) ($validated['display_order'] ?? $trustedCompany->display_order);
        $trustedCompany->is_active = (bool) ($validated['is_active'] ?? $trustedCompany->is_active);

        $logoUrl = $this->storePublicUpload($request, 'logo_file', 'uploads/trusted-companies');
        if ($logoUrl) {
            $trustedCompany->logo_path = $logoUrl;
        }

        $trustedCompany->save();

        return redirect()
            ->route('dashboard')
            ->with('success_trusted_company', 'Trusted company updated.');
    }

    public function destroy(TrustedCompany $trustedCompany): RedirectResponse
    {
        $trustedCompany->delete();

        return redirect()
            ->route('dashboard')
            ->with('success_trusted_company', 'Trusted company deleted.');
    }
}

