<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreIncomingLetterRequest;
use App\Http\Requests\UpdateIncomingLetterRequest;
use App\Models\IncomingLetter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IncomingLetterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = IncomingLetter::with('receiver');
        
        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('letter_number', 'like', "%{$search}%")
                  ->orWhere('sender', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%");
            });
        }
        
        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        
        // Filter by priority
        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }
        
        $letters = $query->latest('received_date')->paginate(15);
        
        return Inertia::render('letters/incoming/index', [
            'letters' => $letters,
            'filters' => $request->only(['search', 'status', 'priority']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('letters/incoming/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreIncomingLetterRequest $request)
    {
        $letter = IncomingLetter::create([
            ...$request->validated(),
            'received_by' => $request->user()->id,
        ]);

        return redirect()->route('incoming-letters.show', $letter)
            ->with('success', 'Incoming letter recorded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(IncomingLetter $incomingLetter)
    {
        $incomingLetter->load('receiver');
        
        return Inertia::render('letters/incoming/show', [
            'letter' => $incomingLetter,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(IncomingLetter $incomingLetter)
    {
        return Inertia::render('letters/incoming/edit', [
            'letter' => $incomingLetter,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateIncomingLetterRequest $request, IncomingLetter $incomingLetter)
    {
        $incomingLetter->update($request->validated());

        return redirect()->route('incoming-letters.show', $incomingLetter)
            ->with('success', 'Incoming letter updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(IncomingLetter $incomingLetter)
    {
        $incomingLetter->delete();

        return redirect()->route('incoming-letters.index')
            ->with('success', 'Incoming letter deleted successfully.');
    }
}