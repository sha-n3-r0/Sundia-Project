<?php

namespace App\Http\Controllers;

use App\Models\SiamProductCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SiamProductCategoryController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $this->discardGhostFileField($request, 'image_file');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'card_description' => ['nullable', 'string'],
            'modal_short_description' => ['nullable', 'string'],
            'image_file' => ['nullable', 'image', 'max:2048'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $category = new SiamProductCategory();
        $category->name = $validated['name'];
        $category->slug = $this->makeUniqueSlug(Str::slug($validated['name']));
        $category->card_description = $validated['card_description'] ?? null;
        $category->modal_short_description = $validated['modal_short_description'] ?? null;
        $category->display_order = (int) ($validated['display_order'] ?? 0);
        $category->is_active = (bool) ($validated['is_active'] ?? true);

        $publicImageUrl = $this->storePublicUpload($request, 'image_file', 'uploads/siam-product-categories');
        if ($publicImageUrl) {
            $category->card_image_path = $publicImageUrl;
        }

        $category->save();

        return redirect()
            ->route('dashboard')
            ->with('success_siam_product_category', 'SIAM product category created.');
    }

    public function update(Request $request, SiamProductCategory $siamProductCategory): RedirectResponse
    {
        $this->discardGhostFileField($request, 'image_file');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'card_description' => ['nullable', 'string'],
            'modal_short_description' => ['nullable', 'string'],
            'image_file' => ['nullable', 'image', 'max:2048'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $siamProductCategory->name = $validated['name'];
        if (trim((string) $siamProductCategory->getOriginal('name')) !== trim($validated['name'])) {
            $siamProductCategory->slug = $this->makeUniqueSlug(
                Str::slug($validated['name']),
                $siamProductCategory->id
            );
        }
        $siamProductCategory->card_description = array_key_exists('card_description', $validated)
            ? ($validated['card_description'] ?: null)
            : $siamProductCategory->card_description;
        $siamProductCategory->modal_short_description = array_key_exists('modal_short_description', $validated)
            ? ($validated['modal_short_description'] ?: null)
            : $siamProductCategory->modal_short_description;
        $siamProductCategory->display_order = (int) ($validated['display_order'] ?? $siamProductCategory->display_order);
        $siamProductCategory->is_active = (bool) ($validated['is_active'] ?? $siamProductCategory->is_active);

        $publicImageUrl = $this->storePublicUpload($request, 'image_file', 'uploads/siam-product-categories');
        if ($publicImageUrl) {
            $siamProductCategory->card_image_path = $publicImageUrl;
        }

        $siamProductCategory->save();

        return redirect()
            ->route('dashboard')
            ->with('success_siam_product_category', 'SIAM product category updated.');
    }

    public function destroy(SiamProductCategory $siamProductCategory): RedirectResponse
    {
        $siamProductCategory->delete();

        return redirect()
            ->route('dashboard')
            ->with('success_siam_product_category', 'SIAM product category deleted.');
    }

    private function makeUniqueSlug(string $base, ?int $exceptId = null): string
    {
        $slug = $base !== '' ? $base : 'category';
        $candidate = $slug;
        $i = 2;
        while (
            SiamProductCategory::query()
                ->where('slug', $candidate)
                ->when($exceptId !== null, fn ($q) => $q->where('id', '!=', $exceptId))
                ->exists()
        ) {
            $candidate = $slug.'-'.$i;
            $i++;
        }

        return $candidate;
    }
}
