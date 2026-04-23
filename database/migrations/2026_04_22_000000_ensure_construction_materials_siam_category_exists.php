<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('siam_product_categories')) {
            return;
        }

        $name = 'CONSTRUCTION MATERIALS';
        $slug = Str::slug($name);

        $alreadyExists = DB::table('siam_product_categories')
            ->where('slug', $slug)
            ->orWhereRaw('LOWER(name) = ?', [strtolower($name)])
            ->exists();

        if ($alreadyExists) {
            return;
        }

        $nextDisplayOrder = (int) DB::table('siam_product_categories')->max('display_order') + 1;

        DB::table('siam_product_categories')->insert([
            'name' => $name,
            'slug' => $slug,
            'card_description' => 'Quality materials built for strength, safety, and reliable construction projects.',
            'card_image_path' => 'https://placehold.co/350x269',
            'modal_short_description' => null,
            'display_order' => $nextDisplayOrder,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        if (!Schema::hasTable('siam_product_categories')) {
            return;
        }

        DB::table('siam_product_categories')
            ->where('slug', 'construction-materials')
            ->delete();
    }
};
