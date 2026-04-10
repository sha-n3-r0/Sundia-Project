<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trusted_companies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            // Stored as public URL path (e.g. /storage/trusted-companies/xxx.png)
            $table->string('logo_path')->nullable();
            $table->unsignedInteger('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['is_active', 'display_order', 'id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trusted_companies');
    }
};

