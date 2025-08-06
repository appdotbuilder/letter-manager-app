<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LetterType>
 */
class LetterTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => $this->faker->unique()->randomElement(['SR', 'SK', 'SM', 'ST', 'SU', 'SI', 'SE']),
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'is_active' => true,
        ];
    }
}