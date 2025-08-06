<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IncomingLetterController;
use App\Http\Controllers\LetterRejectionController;
use App\Http\Controllers\LetterSignatureController;
use App\Http\Controllers\LetterSubmissionController;
use App\Http\Controllers\OutgoingLetterController;
use App\Http\Controllers\PublicLetterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public letter verification
Route::get('/verify/{qrCode}', [PublicLetterController::class, 'show'])->name('letter.verify');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Incoming letters
    Route::resource('incoming-letters', IncomingLetterController::class);
    
    // Outgoing letters
    Route::resource('outgoing-letters', OutgoingLetterController::class);
    
    // Letter actions (using separate controllers with REST methods)
    Route::post('outgoing-letters/{outgoingLetter}/signatures', [LetterSignatureController::class, 'store'])->name('outgoing-letters.signatures.store');
    Route::post('outgoing-letters/{outgoingLetter}/rejections', [LetterRejectionController::class, 'store'])->name('outgoing-letters.rejections.store');
    Route::post('outgoing-letters/{outgoingLetter}/submissions', [LetterSubmissionController::class, 'store'])->name('outgoing-letters.submissions.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
