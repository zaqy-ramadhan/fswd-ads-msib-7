<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cuti extends Model
{
    use HasFactory;
    protected $fillable = [
        'tgl_cuti',
        'id_karyawan',
        'lama_cuti',
        'keterangan',
    ];

    public function Employee()
    {
        return $this->belongsTo(Employee::class, 'id_karyawan');
    }
}
