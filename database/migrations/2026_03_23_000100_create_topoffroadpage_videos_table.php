<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('topoffroadpage_videos', function (Blueprint $table) {
            $table->id();

            $table->string('title')->nullable();
            $table->string('video_url')->nullable();
            $table->string('video_path')->nullable();
            $table->string('thumbnail_path')->nullable();
            $table->boolean('overlay_enabled')->default(true);
            $table->string('overlay_image_path')->nullable();
            $table->boolean('is_active')->default(true)->index();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('topoffroadpage_videos');
    }
};

