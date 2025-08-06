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
        Schema::create('outgoing_letters', function (Blueprint $table) {
            $table->id();
            $table->string('letter_number')->unique()->comment('Generated letter number');
            $table->foreignId('letter_type_id')->constrained()->onDelete('cascade');
            $table->foreignId('template_id')->nullable()->constrained('letter_templates')->nullOnDelete();
            $table->string('recipient')->comment('Letter recipient');
            $table->string('subject')->comment('Letter subject');
            $table->text('content')->comment('Letter content');
            $table->json('template_data')->nullable()->comment('Template field values');
            $table->date('letter_date')->comment('Letter date');
            $table->enum('priority', ['low', 'normal', 'high', 'urgent'])->default('normal');
            $table->enum('status', ['draft', 'pending_secretary', 'pending_chairman', 'signed', 'rejected'])->default('draft');
            $table->text('rejection_reason')->nullable()->comment('Reason for rejection');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('secretary_signed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('secretary_signed_at')->nullable();
            $table->foreignId('chairman_signed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('chairman_signed_at')->nullable();
            $table->string('qr_code')->nullable()->comment('QR code for verification');
            $table->string('pdf_path')->nullable()->comment('Generated PDF path');
            $table->timestamps();
            
            $table->index('letter_number');
            $table->index(['letter_type_id', 'status']);
            $table->index(['status', 'created_at']);
            $table->index('created_by');
            $table->index('qr_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('outgoing_letters');
    }
};