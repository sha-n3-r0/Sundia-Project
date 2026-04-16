<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BackgroundPicture;
use App\Support\BackgroundPictureData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class BackgroundPictureController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'page_name' => 'required|string|in:Home,Siam,Tpsmi,Top offroad,Careers',
            'image_file' => 'nullable|image',
            'slot' => 'nullable|integer|min:0|max:9',
        ]);

        $background = BackgroundPicture::firstOrNew(['page_name' => $request->page_name]);
        $slot = (int) $request->integer('slot', 0);
        $slot = max(0, min($slot, 9));
        $defaultSlotCount = BackgroundPictureData::imageSlotsFor($request->page_name);
        $images = $background->image_paths;

        if (! is_array($images) || count($images) === 0) {
            $images = filled($background->image_path) ? [$background->image_path] : [];
        }

        $currentPath = $images[$slot] ?? null;

        if ($request->hasFile('image_file')) {
            if (BackgroundPictureData::isStoredPath($currentPath)) {
                Storage::disk('public')->delete($currentPath);
                $this->deletePublicMirror($currentPath);
            }
            $storedPath = $request->file('image_file')->store('backgrounds', 'public');
            $this->ensurePublicMirror($storedPath);
            $images[$slot] = $storedPath;
        } elseif ($request->boolean('remove_image')) {
            if (BackgroundPictureData::isStoredPath($currentPath)) {
                Storage::disk('public')->delete($currentPath);
                $this->deletePublicMirror($currentPath);
            }
            $images[$slot] = null;
        }

        $targetSlotCount = max($defaultSlotCount, count($images), $slot + 1);
        $background->image_paths = array_pad($images, $targetSlotCount, null);
        $background->image_path = $background->image_paths[0] ?? null;

        $background->save();

        return redirect()->back()->with('success_background', 'Background picture for ' . $request->page_name . ' updated successfully.');
    }

    private function ensurePublicMirror(string $relativePath): void
    {
        $source = Storage::disk('public')->path($relativePath);
        $target = public_path('storage/' . ltrim(str_replace('\\', '/', $relativePath), '/'));
        $targetDir = dirname($target);

        if (! File::exists($source)) {
            return;
        }

        if (! File::isDirectory($targetDir)) {
            File::makeDirectory($targetDir, 0755, true);
        }

        File::copy($source, $target);
    }

    private function deletePublicMirror(string $relativePath): void
    {
        $target = public_path('storage/' . ltrim(str_replace('\\', '/', $relativePath), '/'));
        if (File::exists($target)) {
            File::delete($target);
        }
    }
}
