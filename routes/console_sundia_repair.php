<?php

use App\Models\Sundia;
use Illuminate\Support\Facades\Artisan;

Artisan::command('sundia:repair-content', function () {
    /** @var \App\Models\Sundia|null $sundia */
    $sundia = Sundia::first();

    if (!$sundia) {
        $this->error('No sundia row found.');
        return 1;
    }

    $raw = $sundia->getRawOriginal('content');

    $normalizeToArray = function ($value): array {
        if ($value === null || $value === '') {
            return [];
        }

        if (is_string($value)) {
            $decoded = json_decode($value, true);
            return is_array($decoded) ? $decoded : [];
        }

        return is_array($value) ? $value : [];
    };

    $rebuildJsonFromChars = function (array $arr): ?string {
        if ($arr === []) {
            return null;
        }

        // List of single-character strings
        if (array_is_list($arr) && is_string($arr[0] ?? null)) {
            $out = '';
            foreach ($arr as $v) {
                if (is_string($v)) {
                    $out .= $v;
                }
            }
            return $out !== '' ? $out : null;
        }

        // Assoc array with numeric keys => characters
        $allNumeric = true;
        foreach (array_keys($arr) as $k) {
            if (!is_numeric($k)) {
                $allNumeric = false;
                break;
            }
        }

        if ($allNumeric) {
            ksort($arr, SORT_NUMERIC);
            $out = '';
            foreach ($arr as $v) {
                if (is_string($v)) {
                    $out .= $v;
                }
            }
            return $out !== '' ? $out : null;
        }

        return null;
    };

    $content = $normalizeToArray($raw);

    // Attempt to reconstruct a valid JSON payload if content is in the "chars/numeric keys" broken format.
    $maybeJson = $rebuildJsonFromChars($content);
    if ($maybeJson !== null) {
        $decoded = json_decode($maybeJson, true);
        if (is_array($decoded)) {
            $content = $decoded;
        }
    }

    // Force a clean, expected shape for the "What we do" section (drop numeric-key corruption).
    $clean = [
        'stats_title_line1' => is_string($content['stats_title_line1'] ?? null) ? $content['stats_title_line1'] : 'WHAT',
        'stats_title_line2' => is_string($content['stats_title_line2'] ?? null) ? $content['stats_title_line2'] : 'WE',
        'stats_title_line3' => is_string($content['stats_title_line3'] ?? null) ? $content['stats_title_line3'] : 'DO?',
        'stats_items' => is_array($content['stats_items'] ?? null) ? $content['stats_items'] : [
            ['value' => '25+', 'label' => 'Years Experience'],
            ['value' => '5', 'label' => 'Affiliated Companies'],
            ['value' => '500+', 'label' => 'Team Members'],
            ['value' => '1000+', 'label' => 'Projects Completed'],
        ],
    ];

    // Preserve video settings if they exist as an array.
    if (is_array($content['video'] ?? null)) {
        $clean['video'] = $content['video'];
    }

    $sundia->content = $clean;
    $sundia->save();

    $this->info('Repaired `sundias.content` for sundia id ' . $sundia->id);
    $this->line(json_encode([
        'stats_title' => [
            $clean['stats_title_line1'],
            $clean['stats_title_line2'],
            $clean['stats_title_line3'],
        ],
        'stats_items' => $clean['stats_items'],
    ], JSON_PRETTY_PRINT));

    return 0;
})->purpose('Repair corrupted Sundia.content JSON');

