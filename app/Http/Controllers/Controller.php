<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

abstract class Controller
{
    /**
     * Inertia forceFormData encodes absent files as an empty string in the POST body.
     * Remove the key when there is no real upload so "image" validation is not applied to "".
     */
    protected function discardGhostFileField(Request $request, string $field): void
    {
        if (! $request->hasFile($field)) {
            $request->request->remove($field);
        }
    }

    /**
     * Store an uploaded file directly under public/ (same as Sundia logo uploads).
     * Returns a full asset URL from asset(), suitable for persisting in the database.
     */
    protected function storePublicUpload(Request $request, string $field, string $publicDir): ?string
    {
        if (! $request->hasFile($field)) {
            return null;
        }

        $file = $request->file($field);
        if (! $file || ! $file->isValid()) {
            return null;
        }

        $targetDir = public_path($publicDir);
        if (! File::exists($targetDir)) {
            File::makeDirectory($targetDir, 0755, true);
        }

        $ext = strtolower((string) $file->getClientOriginalExtension());
        $filename = (string) Str::uuid().($ext ? ('.'.$ext) : '');
        $file->move($targetDir, $filename);

        $relative = trim($publicDir, '/\\').'/'.$filename;

        return asset($relative);
    }
}
