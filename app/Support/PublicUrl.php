<?php

namespace App\Support;

/**
 * Turn stored web paths (/storage/..., /foo.png) into absolute URLs so they work
 * under subfolders (e.g. XAMPP) and with APP_URL.
 */
final class PublicUrl
{
    public static function web(?string $path): ?string
    {
        if ($path === null || $path === '') {
            return null;
        }

        $path = trim($path);
        if (preg_match('#^https?://#i', $path)) {
            return $path;
        }

        return asset(ltrim($path, '/'));
    }
}
