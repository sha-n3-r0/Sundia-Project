<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('topoffroad_products')) {
            return;
        }

        if (!Schema::hasColumn('topoffroad_products', 'category')) {
            Schema::table('topoffroad_products', function (Blueprint $table) {
                $table->string('category', 64)->default('car-accessories')->after('id');
                $table->index(['category', 'is_active', 'display_order']);
            });
        }

        DB::table('topoffroad_products')->whereNull('category')->update(['category' => 'car-accessories']);
    }

    public function down(): void
    {
        if (!Schema::hasTable('topoffroad_products')) {
            return;
        }

        if (Schema::hasColumn('topoffroad_products', 'category')) {
            Schema::table('topoffroad_products', function (Blueprint $table) {
                $table->dropIndex(['category', 'is_active', 'display_order']);
                $table->dropColumn('category');
            });
        }
    }
};
