<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Division;
use App\Models\Employee;

class EmployeesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Employee::create([
            'nama' => 'Agus',
            'alamat' => 'Jln Gaja Mada no 12, Surabaya',
            'tgl_lahir' => '1980-01-11',
            'tgl_bergabung' => '2005-08-07',
            'no_induk' => 'IP06001',
        ]);

        \App\Models\Employee::create([
            'nama' => 'Amin',
            'alamat' => 'Jln Imam Bonjol no 11, Mojokerto',
            'tgl_lahir' => '1977-09-03',
            'tgl_bergabung' => '2005-08-07',
            'no_induk' => 'IP06002',
        ]);

        \App\Models\Employee::create([
            'nama' => 'Yusuf',
            'alamat' => 'Jln A Yani Raya 15 No 14 Malang',
            'tgl_lahir' => '1973-08-09',
            'tgl_bergabung' => '2006-08-06',
            'no_induk' => 'IP06003',
        ]);

        \App\Models\Employee::create([
            'nama' => 'Alyssa',
            'alamat' => 'Jln Bungur Sari V no 166, Bandung',
            'tgl_lahir' => '1983-03-18',
            'tgl_bergabung' => '2006-09-06',
            'no_induk' => 'IP06004',
        ]);

        \App\Models\Employee::create([
            'nama' => 'Maulana',
            'alamat' => 'Jln Candi Agung, No 78 Gg 5, Jakarta',
            'tgl_lahir' => '1978-11-10',
            'tgl_bergabung' => '2006-09-10',
            'no_induk' => 'IP06005',
        ]);

        \App\Models\Employee::create([
            'nama' => 'Agfika',
            'alamat' => '	
            Jln Nangka, Jakarta Timur',
            'tgl_lahir' => '1979-02-07',
            'tgl_bergabung' => '2007-01-02',
            'no_induk' => 'IP06006',
        ]);

        \App\Models\Employee::create([
            'nama' => 'James',
            'alamat' => 'Jln Merpati, 8 Surabaya',
            'tgl_lahir' => '1989-05-18',
            'tgl_bergabung' => '2007-04-07',
            'no_induk' => 'IP06007',
        ]);

        \App\Models\Employee::create([
            'nama' => 'Octavanus',
            'alamat' => 'Jln A Yani 17, B 08 Sidoarjo',
            'tgl_lahir' => '1985-04-14',
            'tgl_bergabung' => '2007-05-19',
            'no_induk' => 'IP06008',
        ]);

        \App\Models\Employee::create([
            'nama' => 'Nugroho',
            'alamat' => 'Jln Duren tiga 167, Jakarta Selatan',
            'tgl_lahir' => '1984-01-01',
            'tgl_bergabung' => '2008-01-16',
            'no_induk' => 'IP06009',
        ]);

        \App\Models\Employee::create([
            'nama' => 'Raisa',
            'alamat' => 'Jln Kelapa Sawit, Jakarta Selatan',
            'tgl_lahir' => '1990-12-17',
            'tgl_bergabung' => '2008-08-16',
            'no_induk' => 'IP06010',
        ]);
    }
}
