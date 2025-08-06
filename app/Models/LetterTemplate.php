<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\LetterTemplate
 *
 * @property int $id
 * @property int $letter_type_id
 * @property string $name
 * @property string $content
 * @property array $fields
 * @property int $created_by
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\LetterType $letterType
 * @property-read \App\Models\User $creator
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\OutgoingLetter> $outgoingLetters
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate query()
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereLetterTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereFields($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate active()
 * @method static \Database\Factories\LetterTemplateFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class LetterTemplate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'letter_type_id',
        'name',
        'content',
        'fields',
        'created_by',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'fields' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Get the letter type that owns this template.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function letterType(): BelongsTo
    {
        return $this->belongsTo(LetterType::class);
    }

    /**
     * Get the user who created this template.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the outgoing letters that use this template.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function outgoingLetters(): HasMany
    {
        return $this->hasMany(OutgoingLetter::class, 'template_id');
    }

    /**
     * Scope a query to only include active templates.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}