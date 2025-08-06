<?php

namespace App\Http\Controllers;

use App\Models\IncomingLetter;
use App\Models\OutgoingLetter;
use App\Models\LetterType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get statistics based on user role
        $stats = [];
        
        if ($user->isSuperadmin() || $user->isSecretary() || $user->isStaff()) {
            $stats['incoming_letters'] = IncomingLetter::count();
            $stats['outgoing_letters'] = OutgoingLetter::count();
            $stats['pending_approval'] = OutgoingLetter::whereIn('status', ['pending_secretary', 'pending_chairman'])->count();
            $stats['signed_letters'] = OutgoingLetter::where('status', 'signed')->count();
        }
        
        if ($user->isChairman()) {
            $stats['pending_my_signature'] = OutgoingLetter::where('status', 'pending_chairman')->count();
            $stats['signed_by_me'] = OutgoingLetter::where('chairman_signed_by', $user->id)->count();
        }

        // Recent activities
        $recentIncoming = IncomingLetter::with('receiver')
            ->latest()
            ->limit(5)
            ->get();
            
        $recentOutgoing = OutgoingLetter::with(['letterType', 'creator'])
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentIncoming' => $recentIncoming,
            'recentOutgoing' => $recentOutgoing,
            'userRole' => $user->role,
        ]);
    }
}