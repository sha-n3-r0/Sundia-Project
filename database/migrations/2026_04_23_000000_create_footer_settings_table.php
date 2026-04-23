<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('footer_settings', function (Blueprint $table) {
            $table->id();
            $table->text('about_text')->nullable();
            $table->string('contact_email_primary')->nullable();
            $table->string('contact_phone', 64)->nullable();
            $table->string('contact_email_secondary')->nullable();
            $table->string('contact_company_label')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('footer_settings');
    }
};

