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
        Schema::create('incoming_letters', function (Blueprint $table) {
            $table->id();
            $table->string('letter_number')->unique()->comment('Incoming letter number');
            $table->string('sender')->comment('Letter sender');
            $table->string('subject')->comment('Letter subject');
            $table->date('received_date')->comment('Date when letter was received');
            $table->date('letter_date')->comment('Date on the letter');
            $table->text('description')->nullable()->comment('Letter description');
            $table->string('file_path')->nullable()->comment('Scanned letter file path');
            $table->enum('priority', ['low', 'normal', 'high', 'urgent'])->default('normal');
            $table->enum('status', ['received', 'processing', 'completed', 'archived'])->default('received');
            $table->foreignId('received_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            
            $table->index('letter_number');
            $table->index(['status', 'priority']);
            $table->index('received_date');
            $table->index('received_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incoming_letters');
    }
};