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
        Schema::create('letter_types', function (Blueprint $table) {
            $table->id();
            $table->string('code', 10)->unique()->comment('Letter type code (SR, SK, SM, etc.)');
            $table->string('name')->comment('Full letter type name');
            $table->text('description')->nullable()->comment('Letter type description');
            $table->boolean('is_active')->default(true)->comment('Whether this letter type is active');
            $table->timestamps();
            
            $table->index('code');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('letter_types');
    }
};