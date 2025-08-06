<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\OutgoingLetter;
use Illuminate\Http\Request;

class LetterRejectionController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, OutgoingLetter $outgoingLetter)
    {
        $request->validate([
            'reason' => 'required|string|max:1000',
        ]);
        
        $user = $request->user();
        
        $canSign = ($user->isSecretary() && $outgoingLetter->status === 'pending_secretary') ||
                   ($user->isChairman() && $outgoingLetter->status === 'pending_chairman');
        
        if (!$canSign) {
            return redirect()->route('outgoing-letters.show', $outgoingLetter)
                ->with('error', 'You are not authorized to reject this letter.');
        }
        
        $outgoingLetter->update([
            'status' => 'rejected',
            'rejection_reason' => $request->reason,
        ]);
        
        return redirect()->route('outgoing-letters.show', $outgoingLetter)
            ->with('success', 'Letter has been rejected.');
    }
}