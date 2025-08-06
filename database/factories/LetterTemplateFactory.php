<?php

namespace Database\Factories;

use App\Models\LetterType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LetterTemplate>
 */
class LetterTemplateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'letter_type_id' => LetterType::factory(),
            'name' => $this->faker->sentence(3),
            'content' => $this->faker->paragraphs(3, true),
            'fields' => [
                'recipient' => 'text',
                'date' => 'date',
                'subject' => 'text',
            ],
            'created_by' => User::factory()->state(['role' => 'secretary']),
            'is_active' => true,
        ];
    }
}