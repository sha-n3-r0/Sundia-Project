<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

/**
 * Some databases had `siam_product_categories` created with an older shape
 * (title, short_description, image_path, …) while the app expects
 * name, card_description, card_image_path, modal_short_description.
 */
return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('siam_product_categories')) {
            return;
        }

        Schema::table('siam_product_categories', function (Blueprint $table) {
            if (!Schema::hasColumn('siam_product_categories', 'name')) {
                $table->string('name')->nullable()->after('id');
            }
            if (!Schema::hasColumn('siam_product_categories', 'slug')) {
                $table->string('slug')->nullable();
            }
            if (!Schema::hasColumn('siam_product_categories', 'card_description')) {
                $table->text('card_description')->nullable();
            }
            if (!Schema::hasColumn('siam_product_categories', 'card_image_path')) {
                $table->string('card_image_path')->nullable();
            }
            if (!Schema::hasColumn('siam_product_categories', 'modal_short_description')) {
                $table->text('modal_short_description')->nullable();
            }
        });

        $rows = DB::table('siam_product_categories')->orderBy('id')->get();

        foreach ($rows as $row) {
            $r = (array) $row;
            $updates = [];

            $title = $r['title'] ?? null;
            $name = $r['name'] ?? null;
            if (($name === null || $name === '') && $title !== null && $title !== '') {
                $updates['name'] = $title;
            }

            if (empty($r['slug'] ?? null)) {
                $baseName = $updates['name'] ?? $name ?? $title ?? 'category';
                $slug = Str::slug((string) $baseName);
                $candidate = $slug;
                $n = 2;
                while (
                    DB::table('siam_product_categories')
                        ->where('slug', $candidate)
                        ->where('id', '!=', $row->id)
                        ->exists()
                ) {
                    $candidate = $slug.'-'.$n;
                    $n++;
                }
                $updates['slug'] = $candidate;
            }

            if (($r['card_description'] ?? null) === null || $r['card_description'] === '') {
                if (isset($r['short_description']) && $r['short_description'] !== '') {
                    $updates['card_description'] = $r['short_description'];
                }
            }

            if (($r['modal_short_description'] ?? null) === null || $r['modal_short_description'] === '') {
                if (isset($r['page_intro']) && $r['page_intro'] !== '') {
                    $updates['modal_short_description'] = $r['page_intro'];
                } elseif (isset($r['short_description']) && $r['short_description'] !== '') {
                    $updates['modal_short_description'] = $r['short_description'];
                }
            }

            if (($r['card_image_path'] ?? null) === null || $r['card_image_path'] === '') {
                if (isset($r['image_path']) && $r['image_path'] !== '') {
                    $updates['card_image_path'] = $r['image_path'];
                }
            }

            if ($updates !== []) {
                DB::table('siam_product_categories')->where('id', $row->id)->update($updates);
            }
        }

        Schema::table('siam_product_categories', function (Blueprint $table) {
            if (Schema::hasColumn('siam_product_categories', 'title')) {
                $table->dropColumn('title');
            }
            if (Schema::hasColumn('siam_product_categories', 'short_description')) {
                $table->dropColumn('short_description');
            }
            if (Schema::hasColumn('siam_product_categories', 'page_intro')) {
                $table->dropColumn('page_intro');
            }
            if (Schema::hasColumn('siam_product_categories', 'image_path')) {
                $table->dropColumn('image_path');
            }
        });
    }

    public function down(): void
    {
        // Non-reversible without knowing prior schema; left empty.
    }
};
