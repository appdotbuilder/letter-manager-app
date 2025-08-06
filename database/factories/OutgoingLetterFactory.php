<?php

namespace Database\Factories;

use App\Models\LetterType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OutgoingLetter>
 */
class OutgoingLetterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $letterType = LetterType::inRandomOrder()->first() ?? LetterType::factory()->create();
        $year = now()->year;
        $month = now()->format('m');
        $count = random_int(1, 999);
        
        return [
            'letter_number' => sprintf('%s-%03d/%s/%d', $letterType->code, $count, $month, $year),
            'letter_type_id' => $letterType->id,
            'recipient' => $this->faker->company(),
            'subject' => $this->faker->sentence(6),
            'content' => $this->faker->paragraphs(3, true),
            'letter_date' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'priority' => $this->faker->randomElement(['low', 'normal', 'high', 'urgent']),
            'status' => $this->faker->randomElement(['draft', 'pending_secretary', 'pending_chairman', 'signed', 'rejected']),
            'created_by' => User::factory(),
        ];
    }

    /**
     * Indicate that the letter is signed.
     */
    public function signed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'signed',
            'secretary_signed_by' => User::factory()->state(['role' => 'secretary']),
            'secretary_signed_at' => now()->subDays(2),
            'chairman_signed_by' => User::factory()->state(['role' => 'chairman']),
            'chairman_signed_at' => now()->subDay(),
            'qr_code' => Str::random(32),
        ]);
    }
}