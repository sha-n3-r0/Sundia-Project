<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('title')->nullable();
            $table->string('company')->nullable();
            // Stored as public URL path (e.g. /storage/team-members/xxx.jpg) like other admin uploads.
            $table->string('profile_image_path')->nullable();
            // Logo key identifier (e.g. sundia, tpsmi, top) or a URL/path if you later extend it.
            $table->string('company_logo')->nullable();
            $table->unsignedInteger('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['is_active', 'display_order', 'id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_members');
    }
};

