<?php

namespace App\Support;

use App\Models\BackgroundPicture;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class BackgroundPictureData
{
    public const DEFAULTS = [
        'Home' => ['/sundia-group-background.JPG'],
        'Siam' => ['/siambackground.JPG'],
        'Tpsmi' => ['/tpsmi.jpg'],
        'Top offroad' => ['/Topoffroad.png?v=2', '/bro.jpg', '/lineup.jpg'],
        'Careers' => ['/careers.jpg'],
    ];

    public static function defaultsFor(string $pageName): array
    {
        return self::DEFAULTS[$pageName] ?? [];
    }

    public static function imageSlotsFor(string $pageName): int
    {
        return count(self::defaultsFor($pageName)) ?: 1;
    }

    public static function normalizeStoredPath(?string $path): ?string
    {
        if (! filled($path)) {
            return null;
        }

        return str_starts_with($path, '/storage/')
            ? $path
            : '/storage/' . ltrim($path, '/');
    }

    public static function rawImagesFromModel(?BackgroundPicture $backgroundPicture, string $pageName): array
    {
        if (! $backgroundPicture) {
            return self::defaultsFor($pageName);
        }

        $stored = [];

        if (is_array($backgroundPicture->image_paths) && count($backgroundPicture->image_paths) > 0) {
            $stored = $backgroundPicture->image_paths;
        } elseif (filled($backgroundPicture->image_path)) {
            $stored = [$backgroundPicture->image_path];
        }

        $slotCount = max(self::imageSlotsFor($pageName), count($stored));
        $defaults = self::defaultsFor($pageName);
        $images = [];

        for ($i = 0; $i < $slotCount; $i++) {
            $images[] = $stored[$i] ?? $defaults[$i] ?? null;
        }

        return $images;
    }

    public static function publicImagesFromModel(?BackgroundPicture $backgroundPicture, string $pageName): array
    {
        return array_values(array_filter(
            array_map(function ($path) {
                if (! filled($path)) {
                    return null;
                }

                $normalized = self::isStoredPath($path)
                    ? self::normalizeStoredPath($path)
                    : $path;

                if (self::isStoredPath($path)) {
                    self::ensurePublicMirror($path);
                }

                return PublicUrl::web($normalized);
            }, self::rawImagesFromModel($backgroundPicture, $pageName)),
            fn ($path) => filled($path)
        ));
    }

    public static function payloadForPage(?BackgroundPicture $backgroundPicture, string $pageName): array
    {
        $rawImages = self::rawImagesFromModel($backgroundPicture, $pageName);
        $images = self::publicImagesFromModel($backgroundPicture, $pageName);

        return [
            'id' => $backgroundPicture?->id,
            'page_name' => $pageName,
            'image_path' => $images[0] ?? null,
            'images' => $images,
            'slot_count' => max(self::imageSlotsFor($pageName), count($rawImages)),
        ];
    }

    public static function adminCollection(Collection $backgroundPictures): Collection
    {
        return collect(self::DEFAULTS)->mapWithKeys(function ($_, string $pageName) use ($backgroundPictures) {
            $backgroundPicture = $backgroundPictures->get($pageName);

            return [
                $pageName => self::payloadForPage($backgroundPicture, $pageName),
            ];
        });
    }

    public static function isStoredPath(?string $path): bool
    {
        return filled($path)
            && ! preg_match('/^(https?:|data:|blob:)/i', $path)
            && ! str_starts_with($path, '/');
    }

    private static function ensurePublicMirror(string $relativePath): void
    {
        $relativePath = ltrim(str_replace('\\', '/', $relativePath), '/');
        $source = Storage::disk('public')->path($relativePath);
        $target = public_path('storage/' . $relativePath);
        $targetDir = dirname($target);

        if (! File::exists($source)) {
            return;
        }

        if (! File::exists($targetDir)) {
            File::makeDirectory($targetDir, 0755, true);
        }

        if (! File::exists($target)) {
            File::copy($source, $target);
        }
    }
}
