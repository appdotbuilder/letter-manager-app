<?php

namespace Database\Seeders;

use App\Models\LetterType;
use Illuminate\Database\Seeder;

class LetterTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $letterTypes = [
            [
                'code' => 'SR',
                'name' => 'Surat Rutin',
                'description' => 'Surat untuk keperluan administratif rutin organisasi',
            ],
            [
                'code' => 'SK',
                'name' => 'Surat Keputusan',
                'description' => 'Surat yang berisi keputusan resmi organisasi',
            ],
            [
                'code' => 'SM',
                'name' => 'Surat Mandat',
                'description' => 'Surat pemberian wewenang atau mandat',
            ],
            [
                'code' => 'ST',
                'name' => 'Surat Tugas',
                'description' => 'Surat penugasan untuk anggota organisasi',
            ],
            [
                'code' => 'SU',
                'name' => 'Surat Rekomendasi Umum',
                'description' => 'Surat rekomendasi untuk keperluan umum',
            ],
            [
                'code' => 'SI',
                'name' => 'Surat Instruksi',
                'description' => 'Surat yang berisi instruksi atau perintah',
            ],
            [
                'code' => 'SE',
                'name' => 'Surat Edaran',
                'description' => 'Surat pemberitahuan yang diedarkan',
            ],
        ];

        foreach ($letterTypes as $type) {
            LetterType::create($type);
        }
    }
}