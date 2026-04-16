<?php

namespace App\Http\Controllers;

use App\Models\TopoffroadProducts;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\ValidationException;

class TopoffroadProductsController extends Controller
{
    private const CATEGORY_RULE = ['required', 'string', 'in:car-accessories,mags-tires,lights,tints,camping-gears'];

    public function store(Request $request): RedirectResponse
    {
        $this->discardGhostFileField($request, 'image_file');

        $validated = $request->validate([
            'category' => self::CATEGORY_RULE,
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image_file' => ['nullable', 'image', 'max:4096'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $product = new TopoffroadProducts();
        $product->category = $validated['category'];
        $product->title = $validated['title'];
        $product->description = $validated['description'] ?? null;
        $product->display_order = (int) ($validated['display_order'] ?? 0);
        $product->is_active = (bool) ($validated['is_active'] ?? true);

        if (Schema::hasColumn('topoffroad_products', 'topoffroad_product_category_id')) {
            $product->topoffroad_product_category_id = $this->resolveTopoffroadCategoryId($validated['category']);
        }

        $publicImagePath = $this->storePublicUpload($request, 'image_file', 'uploads/topoffroad-products');
        if ($publicImagePath) {
            $product->image_path = $publicImagePath;
        }

        $product->save();

        return redirect()
            ->route('dashboard')
            ->with('success_topoffroad_product', 'TOP OFFROAD product created.');
    }

    public function update(Request $request, TopoffroadProducts $topoffroadProduct): RedirectResponse
    {
        $this->discardGhostFileField($request, 'image_file');

        $validated = $request->validate([
            'category' => self::CATEGORY_RULE,
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image_file' => ['nullable', 'image', 'max:4096'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $topoffroadProduct->category = $validated['category'];
        $topoffroadProduct->title = $validated['title'];
        $topoffroadProduct->description = array_key_exists('description', $validated)
            ? ($validated['description'] ?: null)
            : $topoffroadProduct->description;
        $topoffroadProduct->display_order = (int) ($validated['display_order'] ?? $topoffroadProduct->display_order);
        $topoffroadProduct->is_active = (bool) ($validated['is_active'] ?? $topoffroadProduct->is_active);

        if (Schema::hasColumn('topoffroad_products', 'topoffroad_product_category_id')) {
            $topoffroadProduct->topoffroad_product_category_id = $this->resolveTopoffroadCategoryId($validated['category']);
        }

        $publicImagePath = $this->storePublicUpload($request, 'image_file', 'uploads/topoffroad-products');
        if ($publicImagePath) {
            $topoffroadProduct->image_path = $publicImagePath;
        }

        $topoffroadProduct->save();

        return redirect()
            ->route('dashboard')
            ->with('success_topoffroad_product', 'TOP OFFROAD product updated.');
    }

    public function destroy(TopoffroadProducts $topoffroadProduct): RedirectResponse
    {
        $topoffroadProduct->delete();

        return redirect()
            ->route('dashboard')
            ->with('success_topoffroad_product', 'TOP OFFROAD product deleted.');
    }

    private function resolveTopoffroadCategoryId(string $categorySlug): int
    {
        if (!Schema::hasTable('topoffroad_product_categories')) {
            throw ValidationException::withMessages([
                'category' => 'TOP OFFROAD category table is missing.',
            ]);
        }

        $categoryId = DB::table('topoffroad_product_categories')
            ->where('slug', $categorySlug)
            ->value('id');

        if ($categoryId === null) {
            throw ValidationException::withMessages([
                'category' => 'Selected TOP OFFROAD category is not configured in the database.',
            ]);
        }

        return (int) $categoryId;
    }
}
