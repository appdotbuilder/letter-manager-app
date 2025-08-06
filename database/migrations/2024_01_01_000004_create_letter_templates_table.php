<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('letter_templates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('letter_type_id')->constrained()->onDelete('cascade');
            $table->string('name')->comment('Template name');
            $table->text('content')->comment('Template content with placeholders');
            $table->json('fields')->comment('Template fields configuration');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->boolean('is_active')->default(true)->comment('Whether this template is active');
            $table->timestamps();
            
            $table->index(['letter_type_id', 'is_active']);
            $table->index('created_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('letter_templates');
    }
};