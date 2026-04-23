<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceCard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ServiceCardController extends Controller
{
    private function mirrorImageToPublicStorage(?string $relativePath): void
    {
        if (!$relativePath) {
            return;
        }

        $relativePath = str_replace('\\', '/', ltrim($relativePath, '/'));
        $source = storage_path('app/public/' . $relativePath);
        $destination = public_path('storage/' . $relativePath);

        if (!is_file($source)) {
            return;
        }

        $directory = dirname($destination);
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        @copy($source, $destination);
    }

    private function removeMirroredImage(?string $relativePath): void
    {
        if (!$relativePath) {
            return;
        }

        $relativePath = str_replace('\\', '/', ltrim($relativePath, '/'));
        $mirroredPath = public_path('storage/' . $relativePath);

        if (is_file($mirroredPath)) {
            @unlink($mirroredPath);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $serviceCards = ServiceCard::ordered()->get();

        return Inertia::render('Admin/ServiceCards/Index', [
            'serviceCards' => $serviceCards,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/ServiceCards/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'alt_text' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $imagePath = null;
        if ($request->hasFile('image_file')) {
            $imagePath = $request->file('image_file')->store('service-cards', 'public');
        }

        $this->mirrorImageToPublicStorage($imagePath);

        ServiceCard::create([
            'title' => $request->title,
            'description' => $request->description,
            'image_path' => $imagePath,
            'alt_text' => $request->alt_text ?: $request->title,
            'sort_order' => $request->sort_order ?? 0,
            'is_active' => $request->is_active ?? true,
        ]);

        return redirect()->route('dashboard', ['company' => 'SIAM'])->with('success', 'Service card created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $serviceCard = ServiceCard::findOrFail($id);

        return Inertia::render('Admin/ServiceCards/Show', [
            'serviceCard' => $serviceCard,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $serviceCard = ServiceCard::findOrFail($id);

        return Inertia::render('Admin/ServiceCards/Edit', [
            'serviceCard' => $serviceCard,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $serviceCard = ServiceCard::findOrFail($id);

        $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'alt_text' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $imagePath = $serviceCard->image_path;
        if ($request->hasFile('image_file')) {
            // Delete old image
            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
            $this->removeMirroredImage($imagePath);
            $imagePath = $request->file('image_file')->store('service-cards', 'public');
            $this->mirrorImageToPublicStorage($imagePath);
        }

        $serviceCard->update([
            'title' => $request->title,
            'description' => $request->description,
            'image_path' => $imagePath,
            'alt_text' => $request->alt_text ?: $request->title,
            'sort_order' => $request->sort_order ?? 0,
            'is_active' => $request->is_active ?? true,
        ]);

        return redirect()->route('dashboard', ['company' => 'SIAM'])->with('success', 'Service card updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $serviceCard = ServiceCard::findOrFail($id);

        // Delete image file
        if ($serviceCard->image_path && Storage::disk('public')->exists($serviceCard->image_path)) {
            Storage::disk('public')->delete($serviceCard->image_path);
        }
        $this->removeMirroredImage($serviceCard->image_path);

        $serviceCard->delete();

        return redirect()->route('dashboard', ['company' => 'SIAM'])->with('success', 'Service card deleted successfully.');
    }
}
