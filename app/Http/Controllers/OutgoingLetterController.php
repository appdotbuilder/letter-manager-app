<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOutgoingLetterRequest;
use App\Http\Requests\UpdateOutgoingLetterRequest;
use App\Models\OutgoingLetter;
use App\Models\LetterType;
use App\Models\LetterTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OutgoingLetterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = OutgoingLetter::with(['letterType', 'creator', 'secretarySigner', 'chairmanSigner']);
        
        // Role-based filtering
        $user = $request->user();
        if ($user->isChairman()) {
            // Chairman sees letters pending their signature or signed by them
            $query->where(function ($q) use ($user) {
                $q->where('status', 'pending_chairman')
                  ->orWhere('chairman_signed_by', $user->id);
            });
        }
        
        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('letter_number', 'like', "%{$search}%")
                  ->orWhere('recipient', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%");
            });
        }
        
        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        
        // Filter by letter type
        if ($request->filled('letter_type')) {
            $query->where('letter_type_id', $request->letter_type);
        }
        
        $letters = $query->latest()->paginate(15);
        $letterTypes = LetterType::active()->get();
        
        return Inertia::render('letters/outgoing/index', [
            'letters' => $letters,
            'letterTypes' => $letterTypes,
            'filters' => $request->only(['search', 'status', 'letter_type']),
            'userRole' => $user->role,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $letterTypes = LetterType::active()->with('templates')->get();
        
        return Inertia::render('letters/outgoing/create', [
            'letterTypes' => $letterTypes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOutgoingLetterRequest $request)
    {
        $letterType = LetterType::findOrFail($request->letter_type_id);
        
        // Generate letter number
        $year = now()->year;
        $month = now()->format('m');
        $count = OutgoingLetter::where('letter_type_id', $request->letter_type_id)
                               ->whereYear('created_at', $year)
                               ->count() + 1;
        
        $letterNumber = sprintf('%s-%03d/%s/%d', $letterType->code, $count, $month, $year);
        
        $letter = OutgoingLetter::create([
            ...$request->validated(),
            'letter_number' => $letterNumber,
            'created_by' => $request->user()->id,
        ]);

        return redirect()->route('outgoing-letters.show', $letter)
            ->with('success', 'Outgoing letter created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(OutgoingLetter $outgoingLetter)
    {
        $outgoingLetter->load(['letterType', 'template', 'creator', 'secretarySigner', 'chairmanSigner']);
        
        $user = request()->user();
        $canSign = ($user->isSecretary() && $outgoingLetter->status === 'pending_secretary') ||
                   ($user->isChairman() && $outgoingLetter->status === 'pending_chairman');
        
        return Inertia::render('letters/outgoing/show', [
            'letter' => $outgoingLetter,
            'canSign' => $canSign,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OutgoingLetter $outgoingLetter)
    {
        // Only allow editing if letter is in draft status
        if ($outgoingLetter->status !== 'draft') {
            return redirect()->route('outgoing-letters.show', $outgoingLetter)
                ->with('error', 'Cannot edit letter that is no longer in draft status.');
        }
        
        $letterTypes = LetterType::active()->with('templates')->get();
        
        return Inertia::render('letters/outgoing/edit', [
            'letter' => $outgoingLetter,
            'letterTypes' => $letterTypes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOutgoingLetterRequest $request, OutgoingLetter $outgoingLetter)
    {
        // Only allow updating if letter is in draft status
        if ($outgoingLetter->status !== 'draft') {
            return redirect()->route('outgoing-letters.show', $outgoingLetter)
                ->with('error', 'Cannot update letter that is no longer in draft status.');
        }
        
        $outgoingLetter->update($request->validated());

        return redirect()->route('outgoing-letters.show', $outgoingLetter)
            ->with('success', 'Outgoing letter updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OutgoingLetter $outgoingLetter)
    {
        // Only allow deletion if letter is in draft status
        if ($outgoingLetter->status !== 'draft') {
            return redirect()->route('outgoing-letters.show', $outgoingLetter)
                ->with('error', 'Cannot delete letter that is no longer in draft status.');
        }
        
        $outgoingLetter->delete();

        return redirect()->route('outgoing-letters.index')
            ->with('success', 'Outgoing letter deleted successfully.');
    }




}