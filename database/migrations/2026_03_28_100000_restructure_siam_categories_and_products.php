<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('siam_product_categories')) {
            Schema::create('siam_product_categories', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('slug')->unique();
                $table->text('card_description')->nullable();
                $table->string('card_image_path')->nullable();
                $table->text('modal_short_description')->nullable();
                $table->unsignedInteger('display_order')->default(0);
                $table->boolean('is_active')->default(true);
                $table->timestamps();

                $table->index(['is_active', 'display_order', 'id']);
            });
        }

        if (!Schema::hasTable('siam_category_products')) {
            Schema::create('siam_category_products', function (Blueprint $table) {
                $table->id();
                $table->foreignId('siam_product_category_id')
                    ->constrained('siam_product_categories')
                    ->cascadeOnDelete();
                $table->string('title');
                $table->text('description')->nullable();
                $table->string('image_path')->nullable();
                $table->unsignedInteger('display_order')->default(0);
                $table->boolean('is_active')->default(true);
                $table->timestamps();

                $table->index(
                    ['siam_product_category_id', 'is_active', 'display_order', 'id'],
                    'scp_short_idx'
                );
            });
        }

        if (Schema::hasTable('siam_products') && DB::table('siam_product_categories')->count() === 0) {
            $rows = DB::table('siam_products')->orderBy('display_order')->orderBy('id')->get();
            foreach ($rows as $row) {
                $name = $row->title;
                $slug = Str::slug($name);
                $base = $slug;
                $n = 2;
                while (DB::table('siam_product_categories')->where('slug', $slug)->exists()) {
                    $slug = $base.'-'.$n;
                    $n++;
                }

                DB::table('siam_product_categories')->insert([
                    'name' => $name,
                    'slug' => $slug,
                    'card_description' => $row->description,
                    'card_image_path' => $row->image_path,
                    'modal_short_description' => null,
                    'display_order' => (int) $row->display_order,
                    'is_active' => (bool) $row->is_active,
                    'created_at' => $row->created_at ?? now(),
                    'updated_at' => $row->updated_at ?? now(),
                ]);
            }
        }

        if (Schema::hasTable('popup_siam_products') && Schema::hasTable('siam_product_categories')) {
            $popups = DB::table('popup_siam_products')->orderBy('display_order')->orderBy('id')->get();
            foreach ($popups as $popup) {
                $needle = strtolower(trim((string) ($popup->category ?? '')));
                if ($needle === '') {
                    continue;
                }

                $cat = DB::table('siam_product_categories')
                    ->get()
                    ->first(function ($c) use ($needle) {
                        $row = (array) $c;
                        $catName = strtolower(trim((string) ($row['name'] ?? '')));
                        if ($catName === '') {
                            return false;
                        }

                        return $catName === $needle
                            || str_contains($catName, $needle)
                            || str_contains($needle, $catName);
                    });

                if ($cat && !empty($popup->short_description)) {
                    DB::table('siam_product_categories')
                        ->where('id', $cat->id)
                        ->whereNull('modal_short_description')
                        ->update([
                            'modal_short_description' => $popup->short_description,
                            'updated_at' => now(),
                        ]);
                }
            }
        }

        if (Schema::hasTable('siam_products')) {
            Schema::drop('siam_products');
        }
    }

    public function down(): void
    {
        if (!Schema::hasTable('siam_products')) {
            Schema::create('siam_products', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->text('description')->nullable();
                $table->string('image_path')->nullable();
                $table->unsignedInteger('display_order')->default(0);
                $table->boolean('is_active')->default(true);
                $table->timestamps();

                $table->index(['is_active', 'display_order', 'id']);
            });
        }

        if (Schema::hasTable('siam_product_categories') && Schema::hasTable('siam_products')) {
            $cats = DB::table('siam_product_categories')->orderBy('display_order')->orderBy('id')->get();
            foreach ($cats as $c) {
                DB::table('siam_products')->insert([
                    'title' => $c->name,
                    'description' => $c->card_description,
                    'image_path' => $c->card_image_path,
                    'display_order' => $c->display_order,
                    'is_active' => $c->is_active,
                    'created_at' => $c->created_at ?? now(),
                    'updated_at' => $c->updated_at ?? now(),
                ]);
            }
        }

        Schema::dropIfExists('siam_category_products');
        Schema::dropIfExists('siam_product_categories');
    }
};
