<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\OutgoingLetter;
use Inertia\Inertia;

class PublicLetterController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(string $qrCode)
    {
        $letter = OutgoingLetter::where('qr_code', $qrCode)
            ->where('status', 'signed')
            ->with(['letterType', 'secretarySigner', 'chairmanSigner'])
            ->first();
        
        if (!$letter) {
            return Inertia::render('public/letter-not-found', [
                'qrCode' => $qrCode,
            ]);
        }
        
        return Inertia::render('public/letter-verification', [
            'letter' => [
                'id' => $letter->id,
                'letter_number' => $letter->letter_number,
                'subject' => $letter->subject,
                'recipient' => $letter->recipient,
                'letter_date' => $letter->letter_date->format('Y-m-d'),
                'content' => $letter->content,
                'letter_type' => $letter->letterType->name,
                'secretary_signer' => $letter->secretarySigner?->name,
                'chairman_signer' => $letter->chairmanSigner?->name,
                'secretary_signed_at' => $letter->secretary_signed_at?->format('Y-m-d H:i:s'),
                'chairman_signed_at' => $letter->chairman_signed_at?->format('Y-m-d H:i:s'),
                'qr_code' => $letter->qr_code,
            ],
            'verified' => true,
        ]);
    }
}