<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create letter types first
        $this->call([
            LetterTypeSeeder::class,
        ]);

        // Create users with different roles
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'admin@example.com',
            'role' => 'superadmin',
        ]);

        User::factory()->create([
            'name' => 'Chairman',
            'email' => 'chairman@example.com',
            'role' => 'chairman',
        ]);

        User::factory()->create([
            'name' => 'Secretary',
            'email' => 'secretary@example.com',
            'role' => 'secretary',
        ]);

        User::factory()->create([
            'name' => 'Staff User',
            'email' => 'staff@example.com',
            'role' => 'staff',
        ]);
    }
}
