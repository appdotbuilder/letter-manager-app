<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\OutgoingLetter
 *
 * @property int $id
 * @property string $letter_number
 * @property int $letter_type_id
 * @property int|null $template_id
 * @property string $recipient
 * @property string $subject
 * @property string $content
 * @property array|null $template_data
 * @property \Illuminate\Support\Carbon $letter_date
 * @property string $priority
 * @property string $status
 * @property string|null $rejection_reason
 * @property int $created_by
 * @property int|null $secretary_signed_by
 * @property \Illuminate\Support\Carbon|null $secretary_signed_at
 * @property int|null $chairman_signed_by
 * @property \Illuminate\Support\Carbon|null $chairman_signed_at
 * @property string|null $qr_code
 * @property string|null $pdf_path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\LetterType $letterType
 * @property-read \App\Models\LetterTemplate|null $template
 * @property-read \App\Models\User $creator
 * @property-read \App\Models\User|null $secretarySigner
 * @property-read \App\Models\User|null $chairmanSigner
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter query()
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereLetterNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereLetterTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereTemplateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereRecipient($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereTemplateData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereLetterDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereRejectionReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereSecretarySignedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereSecretarySignedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereChairmanSignedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereChairmanSignedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereQrCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter wherePdfPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereUpdatedAt($value)
 * @method static \Database\Factories\OutgoingLetterFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class OutgoingLetter extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'letter_number',
        'letter_type_id',
        'template_id',
        'recipient',
        'subject',
        'content',
        'template_data',
        'letter_date',
        'priority',
        'status',
        'rejection_reason',
        'created_by',
        'secretary_signed_by',
        'secretary_signed_at',
        'chairman_signed_by',
        'chairman_signed_at',
        'qr_code',
        'pdf_path',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'template_data' => 'array',
        'letter_date' => 'date',
        'secretary_signed_at' => 'datetime',
        'chairman_signed_at' => 'datetime',
    ];

    /**
     * Get the letter type for this outgoing letter.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function letterType(): BelongsTo
    {
        return $this->belongsTo(LetterType::class);
    }

    /**
     * Get the template used for this letter.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function template(): BelongsTo
    {
        return $this->belongsTo(LetterTemplate::class);
    }

    /**
     * Get the user who created this letter.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who signed as secretary.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function secretarySigner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'secretary_signed_by');
    }

    /**
     * Get the user who signed as chairman.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function chairmanSigner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'chairman_signed_by');
    }
}