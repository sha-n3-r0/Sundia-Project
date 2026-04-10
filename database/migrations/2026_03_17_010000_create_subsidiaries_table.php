<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subsidiaries', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->text('description')->nullable();

            // Stored as public paths like "/storage/...".
            $table->string('logo_path')->nullable();
            $table->string('background_path')->nullable();

            // "dark" cards use background image + overlay; "light" cards are plain.
            $table->string('display_style')->default('light'); // dark|light

            $table->unsignedInteger('display_order')->default(0)->index();

            // Status (active/inactive)
            $table->boolean('is_active')->default(true)->index();

            $table->timestamps();

            $table->index(['is_active', 'display_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subsidiaries');
    }
};

