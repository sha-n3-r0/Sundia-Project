<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_infos', function (Blueprint $table) {
            $table->id();
            // Address | Phone | Email | Hours (stored as string for flexibility)
            $table->string('type', 32);
            $table->string('title')->nullable();
            $table->text('value')->nullable();
            // Identifier for a predefined icon in the UI (e.g. address, phone, email, hours)
            $table->string('icon')->nullable();
            $table->unsignedInteger('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['is_active', 'display_order', 'id']);
            $table->index(['type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_infos');
    }
};

