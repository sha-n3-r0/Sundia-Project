<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('upcoming_events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('location');
            $table->string('month_label', 12);
            $table->string('day_label', 8);
            $table->unsignedInteger('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['is_active', 'display_order', 'id']);
        });

        if (Schema::hasTable('upcoming_events') && DB::table('upcoming_events')->count() === 0) {
            $now = now();
            DB::table('upcoming_events')->insert([
                [
                    'title' => 'SUNDIA COMPANY OUTING',
                    'location' => 'Lobo Batangas',
                    'month_label' => 'MAR',
                    'day_label' => '30',
                    'display_order' => 0,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'title' => 'SUNDIA COMPANY OUTING',
                    'location' => 'Lobo Batangas',
                    'month_label' => 'MAR',
                    'day_label' => '30',
                    'display_order' => 1,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'title' => 'SUNDIA COMPANY OUTING',
                    'location' => 'Lobo Batangas',
                    'month_label' => 'MAR',
                    'day_label' => '30',
                    'display_order' => 2,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
            ]);
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('upcoming_events');
    }
};
