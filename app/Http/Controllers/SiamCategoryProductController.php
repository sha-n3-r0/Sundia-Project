<?php

namespace App\Http\Controllers;

use App\Models\SiamCategoryProduct;
use App\Models\SiamProductCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SiamCategoryProductController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'siam_product_category_id' => ['required', 'integer', Rule::exists('siam_product_categories', 'id')],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image_file' => ['nullable', 'image', 'max:4096'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $product = new SiamCategoryProduct();
        $product->siam_product_category_id = (int) $validated['siam_product_category_id'];
        $product->title = $validated['title'];
        $product->description = $validated['description'] ?? null;
        $product->display_order = (int) ($validated['display_order'] ?? 0);
        $product->is_active = (bool) ($validated['is_active'] ?? true);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('siam-category-products', 'public');
            $product->image_path = '/storage/'.$path;
        }

        $product->save();

        return redirect()
            ->route('dashboard')
            ->with('success_siam_category_product', 'SIAM category product created.');
    }

    public function update(Request $request, SiamCategoryProduct $siamCategoryProduct): RedirectResponse
    {
        $validated = $request->validate([
            'siam_product_category_id' => ['sometimes', 'integer', Rule::exists('siam_product_categories', 'id')],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image_file' => ['nullable', 'image', 'max:4096'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        if (array_key_exists('siam_product_category_id', $validated)) {
            $siamCategoryProduct->siam_product_category_id = (int) $validated['siam_product_category_id'];
        }

        $siamCategoryProduct->title = $validated['title'];
        $siamCategoryProduct->description = array_key_exists('description', $validated)
            ? ($validated['description'] ?: null)
            : $siamCategoryProduct->description;
        $siamCategoryProduct->display_order = (int) ($validated['display_order'] ?? $siamCategoryProduct->display_order);
        $siamCategoryProduct->is_active = (bool) ($validated['is_active'] ?? $siamCategoryProduct->is_active);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('siam-category-products', 'public');
            $siamCategoryProduct->image_path = '/storage/'.$path;
        }

        $siamCategoryProduct->save();

        return redirect()
            ->route('dashboard')
            ->with('success_siam_category_product', 'SIAM category product updated.');
    }

    public function destroy(SiamCategoryProduct $siamCategoryProduct): RedirectResponse
    {
        $siamCategoryProduct->delete();

        return redirect()
            ->route('dashboard')
            ->with('success_siam_category_product', 'SIAM category product deleted.');
    }
}
