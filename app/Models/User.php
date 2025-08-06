<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $role
 * @property mixed $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\LetterTemplate> $letterTemplates
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\IncomingLetter> $receivedLetters
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\OutgoingLetter> $createdOutgoingLetters
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\OutgoingLetter> $secretarySignedLetters
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\OutgoingLetter> $chairmanSignedLetters
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the letter templates created by this user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function letterTemplates(): HasMany
    {
        return $this->hasMany(LetterTemplate::class, 'created_by');
    }

    /**
     * Get the incoming letters received by this user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function receivedLetters(): HasMany
    {
        return $this->hasMany(IncomingLetter::class, 'received_by');
    }

    /**
     * Get the outgoing letters created by this user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function createdOutgoingLetters(): HasMany
    {
        return $this->hasMany(OutgoingLetter::class, 'created_by');
    }

    /**
     * Get the outgoing letters signed by this user as secretary.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function secretarySignedLetters(): HasMany
    {
        return $this->hasMany(OutgoingLetter::class, 'secretary_signed_by');
    }

    /**
     * Get the outgoing letters signed by this user as chairman.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function chairmanSignedLetters(): HasMany
    {
        return $this->hasMany(OutgoingLetter::class, 'chairman_signed_by');
    }

    /**
     * Check if user is superadmin.
     *
     * @return bool
     */
    public function isSuperadmin(): bool
    {
        return $this->role === 'superadmin';
    }

    /**
     * Check if user is chairman.
     *
     * @return bool
     */
    public function isChairman(): bool
    {
        return $this->role === 'chairman';
    }

    /**
     * Check if user is secretary.
     *
     * @return bool
     */
    public function isSecretary(): bool
    {
        return $this->role === 'secretary';
    }

    /**
     * Check if user is staff.
     *
     * @return bool
     */
    public function isStaff(): bool
    {
        return $this->role === 'staff';
    }
}