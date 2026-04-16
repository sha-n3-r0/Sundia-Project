<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CareerCultureCard;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CareerCultureCardController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $this->discardGhostFileField($request, 'image_file');

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'image_path' => ['nullable', 'string', 'max:500'],
            'image_file' => ['nullable', 'image', 'max:6144'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $pathFilled = filled($validated['image_path'] ?? '');
        $fileUploaded = $request->hasFile('image_file');

        if (! $pathFilled && ! $fileUploaded) {
            throw ValidationException::withMessages([
                'image_path' => 'Enter an image path or upload an image file.',
            ]);
        }

        $card = new CareerCultureCard;
        $card->title = $validated['title'];
        $card->body = $validated['body'];
        $card->display_order = (int) ($validated['display_order'] ?? 0);
        $card->is_active = $request->boolean('is_active', true);

        $publicImage = $this->storePublicUpload($request, 'image_file', 'uploads/career-culture-cards');
        if ($publicImage) {
            $card->image_path = $publicImage;
        } else {
            $card->image_path = $validated['image_path'] ?: null;
        }

        $card->save();

        return redirect()
            ->route('dashboard')
            ->with('success_careers', 'Culture card created.');
    }

    public function update(Request $request, CareerCultureCard $career_culture_card): RedirectResponse
    {
        $this->discardGhostFileField($request, 'image_file');

        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'body' => ['nullable', 'string'],
            'image_path' => ['nullable', 'string', 'max:500'],
            'image_file' => ['nullable', 'image', 'max:6144'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        if (array_key_exists('title', $validated) && $validated['title'] !== null) {
            $career_culture_card->title = $validated['title'];
        }
        if (array_key_exists('body', $validated) && $validated['body'] !== null) {
            $career_culture_card->body = $validated['body'];
        }
        if (array_key_exists('display_order', $validated)) {
            $career_culture_card->display_order = (int) ($validated['display_order'] ?? $career_culture_card->display_order);
        }
        $career_culture_card->is_active = $request->boolean(
            'is_active',
            (bool) $career_culture_card->is_active,
        );

        $publicImage = $this->storePublicUpload($request, 'image_file', 'uploads/career-culture-cards');
        if ($publicImage) {
            $career_culture_card->image_path = $publicImage;
        } elseif (array_key_exists('image_path', $validated)) {
            $career_culture_card->image_path = $validated['image_path'] ?: null;
        }

        $career_culture_card->save();

        return redirect()
            ->route('dashboard')
            ->with('success_careers', 'Culture card updated.');
    }

    public function destroy(CareerCultureCard $career_culture_card): RedirectResponse
    {
        $career_culture_card->delete();

        return redirect()
            ->route('dashboard')
            ->with('success_careers', 'Culture card deleted.');
    }
}
