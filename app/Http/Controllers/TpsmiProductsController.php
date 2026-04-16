<?php

namespace App\Http\Controllers;

use App\Models\TpsmiProducts;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class TpsmiProductsController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $this->discardGhostFileField($request, 'image_file');

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image_file' => ['nullable', 'image', 'max:4096'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $product = new TpsmiProducts();
        $product->title = $validated['title'];
        $product->description = $validated['description'] ?? null;
        $product->display_order = (int) ($validated['display_order'] ?? 0);
        $product->is_active = (bool) ($validated['is_active'] ?? true);

        $publicImagePath = $this->storePublicUpload($request, 'image_file', 'uploads/tpsmi-products');
        if ($publicImagePath) {
            $product->image_path = $publicImagePath;
        }

        $product->save();

        return redirect()
            ->route('dashboard', ['company' => 'TPSMI'])
            ->with('success_tpsmi_product', 'TPSMI product created.');
    }

    public function update(Request $request, TpsmiProducts $tpsmiProduct): RedirectResponse
    {
        $this->discardGhostFileField($request, 'image_file');

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image_file' => ['nullable', 'image', 'max:4096'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $tpsmiProduct->title = $validated['title'];
        $tpsmiProduct->description = array_key_exists('description', $validated)
            ? ($validated['description'] ?: null)
            : $tpsmiProduct->description;
        $tpsmiProduct->display_order = (int) ($validated['display_order'] ?? $tpsmiProduct->display_order);
        $tpsmiProduct->is_active = (bool) ($validated['is_active'] ?? $tpsmiProduct->is_active);

        $publicImagePath = $this->storePublicUpload($request, 'image_file', 'uploads/tpsmi-products');
        if ($publicImagePath) {
            $tpsmiProduct->image_path = $publicImagePath;
        }

        $tpsmiProduct->save();

        return redirect()
            ->route('dashboard', ['company' => 'TPSMI'])
            ->with('success_tpsmi_product', 'TPSMI product updated.');
    }

    public function destroy(TpsmiProducts $tpsmiProduct): RedirectResponse
    {
        $tpsmiProduct->delete();

        return redirect()
            ->route('dashboard', ['company' => 'TPSMI'])
            ->with('success_tpsmi_product', 'TPSMI product deleted.');
    }
}

