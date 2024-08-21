<?php

// app/Models/Employee.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Employee extends Model
{
    use HasFactory;

    // Menentukan nama tabel jika tidak sesuai dengan penamaan konvensi Laravel
    protected $table = 'employees';

    // Menentukan kolom-kolom yang dapat diisi secara massal
    protected $fillable = [
        'nama',
        'alamat',
        'tgl_lahir',
        'tgl_bergabung',
        'no_induk',
    ];

    public function cuti()
    {
        return $this->hasMany(Cuti::class, 'id_karyawan');
    }

    public function getTotalCuti()
    {
        return $this->cuti()->sum('lama_cuti');
    }

    /**
     * Relasi dengan model Division
     * @return BelongsTo
     */
}

