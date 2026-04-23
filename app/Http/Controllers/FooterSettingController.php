<?php

namespace App\Http\Controllers;

use App\Models\FooterSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FooterSettingController extends Controller
{
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'logo' => ['nullable', 'image', 'max:2048'],
            'about_text' => ['nullable', 'string'],
            'contact_email_primary' => ['nullable', 'string', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:64'],
            'contact_email_secondary' => ['nullable', 'string', 'max:255'],
            'contact_company_label' => ['nullable', 'string', 'max:255'],
        ]);

        $footerSetting = FooterSetting::query()->first() ?? new FooterSetting();

        if ($request->hasFile('logo')) {
            if ($footerSetting->logo_path) {
                Storage::disk('public')->delete($footerSetting->logo_path);
            }
            $validated['logo_path'] = $request->file('logo')->store('footer', 'public');
        }

        $footerSetting->fill($validated);
        $footerSetting->save();

        return redirect()
            ->route('dashboard')
            ->with('success_footer_settings', 'Footer settings updated.');
    }
}

