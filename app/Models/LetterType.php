<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\LetterType
 *
 * @property int $id
 * @property string $code
 * @property string $name
 * @property string|null $description
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\LetterTemplate> $templates
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\OutgoingLetter> $outgoingLetters
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|LetterType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LetterType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LetterType query()
 * @method static \Illuminate\Database\Eloquent\Builder|LetterType whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterType whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterType whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterType whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterType active()
 * @method static \Database\Factories\LetterTypeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class LetterType extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'code',
        'name',
        'description',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get the templates for this letter type.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function templates(): HasMany
    {
        return $this->hasMany(LetterTemplate::class);
    }

    /**
     * Get the outgoing letters for this letter type.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function outgoingLetters(): HasMany
    {
        return $this->hasMany(OutgoingLetter::class);
    }

    /**
     * Scope a query to only include active letter types.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}