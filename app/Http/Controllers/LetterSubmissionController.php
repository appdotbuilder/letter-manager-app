<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\OutgoingLetter;

class LetterSubmissionController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(OutgoingLetter $outgoingLetter)
    {
        if ($outgoingLetter->status !== 'draft') {
            return redirect()->route('outgoing-letters.show', $outgoingLetter)
                ->with('error', 'Letter is not in draft status.');
        }
        
        $outgoingLetter->update([
            'status' => 'pending_secretary',
        ]);
        
        return redirect()->route('outgoing-letters.show', $outgoingLetter)
            ->with('success', 'Letter submitted for approval.');
    }
}