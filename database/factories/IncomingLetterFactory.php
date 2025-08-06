<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\IncomingLetter>
 */
class IncomingLetterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $letterDate = $this->faker->dateTimeBetween('-6 months', '-1 day');
        $receivedDate = $this->faker->dateTimeBetween($letterDate, 'now');
        
        return [
            'letter_number' => 'IN-' . $this->faker->unique()->numberBetween(1000, 9999) . '/' . now()->year,
            'sender' => $this->faker->company(),
            'subject' => $this->faker->sentence(6),
            'received_date' => $receivedDate,
            'letter_date' => $letterDate,
            'description' => $this->faker->paragraph(),
            'priority' => $this->faker->randomElement(['low', 'normal', 'high', 'urgent']),
            'status' => $this->faker->randomElement(['received', 'processing', 'completed', 'archived']),
            'received_by' => User::factory(),
        ];
    }
}