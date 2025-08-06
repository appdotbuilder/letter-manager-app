<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\OutgoingLetter;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LetterSignatureController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, OutgoingLetter $outgoingLetter)
    {
        $user = $request->user();
        
        $canSign = ($user->isSecretary() && $outgoingLetter->status === 'pending_secretary') ||
                   ($user->isChairman() && $outgoingLetter->status === 'pending_chairman');
        
        if (!$canSign) {
            return redirect()->route('outgoing-letters.show', $outgoingLetter)
                ->with('error', 'You are not authorized to sign this letter.');
        }
        
        if ($user->isSecretary() && $outgoingLetter->status === 'pending_secretary') {
            $outgoingLetter->update([
                'secretary_signed_by' => $user->id,
                'secretary_signed_at' => now(),
                'status' => 'pending_chairman',
            ]);
            $message = 'Letter signed by secretary. Waiting for chairman signature.';
        } elseif ($user->isChairman() && $outgoingLetter->status === 'pending_chairman') {
            // Generate QR code
            $qrCode = Str::random(32);
            
            $outgoingLetter->update([
                'chairman_signed_by' => $user->id,
                'chairman_signed_at' => now(),
                'status' => 'signed',
                'qr_code' => $qrCode,
            ]);
            $message = 'Letter signed by chairman. Letter is now complete.';
        } else {
            return redirect()->route('outgoing-letters.show', $outgoingLetter)
                ->with('error', 'Invalid signing request.');
        }
        
        return redirect()->route('outgoing-letters.show', $outgoingLetter)
            ->with('success', $message);
    }
}