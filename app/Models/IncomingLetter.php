<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\IncomingLetter
 *
 * @property int $id
 * @property string $letter_number
 * @property string $sender
 * @property string $subject
 * @property \Illuminate\Support\Carbon $received_date
 * @property \Illuminate\Support\Carbon $letter_date
 * @property string|null $description
 * @property string|null $file_path
 * @property string $priority
 * @property string $status
 * @property int $received_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $receiver
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter query()
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereLetterNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereSender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereReceivedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereLetterDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereReceivedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereUpdatedAt($value)
 * @method static \Database\Factories\IncomingLetterFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class IncomingLetter extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'letter_number',
        'sender',
        'subject',
        'received_date',
        'letter_date',
        'description',
        'file_path',
        'priority',
        'status',
        'received_by',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'received_date' => 'date',
        'letter_date' => 'date',
    ];

    /**
     * Get the user who received this letter.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'received_by');
    }
}