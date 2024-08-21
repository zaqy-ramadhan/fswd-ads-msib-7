<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class EmployeesController extends Controller
{
    public function index(Request $request)
    {        
        $query = Employee::with('cuti');
    
        if ($request->has('name')) {
            $query->where('nama', 'like', '%' . $request->input('name') . '%');
        }
    
        if ($request->has('all') && $request->input('all') == 'true') {
            $employees = $query->get();
            $pagination = null;
        } else {
            $employees = $query->paginate(10);
            $pagination = [
                'total' => $employees->total(),
                'current_page' => $employees->currentPage(),
                'per_page' => $employees->perPage(),
                'last_page' => $employees->lastPage(),
                'next_page_url' => $employees->nextPageUrl(),
                'prev_page_url' => $employees->previousPageUrl(),
            ];
        }
    
        $transformedData = $employees->map(function ($employee) {
            $cuti = $employee->getTotalCuti();
            return [
                'id' => $employee->id,
                'nama' => $employee->nama,
                'alamat' => $employee->alamat,
                'tgl_lahir' => $employee->tgl_lahir,
                'tgl_bergabung' => $employee->tgl_bergabung,
                'no_induk' => $employee->no_induk,
                'sisa_cuti' => 12 - $cuti,
            ];
        });
    
        return response()->json([
            'status' => 'success',
            'message' => 'Data retrieved successfully',
            'data' => [
                'employees' => $transformedData,
            ],
            'pagination' => $pagination,
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string|max:500',
            'tgl_lahir' => 'required|date',
            'tgl_bergabung' => 'required|date',
        ]);

        $karyawan = Employee::create([
            'nama' => $validatedData['nama'],
            'alamat' => $validatedData['alamat'],
            'tgl_lahir' => $validatedData['tgl_lahir'],
            'tgl_bergabung' => $validatedData['tgl_bergabung'],
            'no_induk' => $this->generateNoInduk(),
        ]);

        return response()->json([
            'message' => 'Data Berhasil Ditambahkan!',
            'data' => $karyawan,
        ], 201);
    }

    private function generateNoInduk()
    {
        $lastEmployee = Employee::orderBy('no_induk', 'desc')->first();
    
        if ($lastEmployee) {
            $lastNumber = (int) substr($lastEmployee->no_induk, 4);
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }
    
        return 'IP06' . sprintf('%03d', $newNumber);
    }
    
    public function show($id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json([
                'status' => 'error',
                'message' => 'Employee not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Data retrieved successfully',
            'data' => [
                'employee' => $employee,
            ],
        ]);
    }

    // Mengupdate data karyawan
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string|max:500',
            'tgl_lahir' => 'required|date',
            'tgl_bergabung' => 'required|date',
        ]);

        $employee = Employee::findOrFail($id);

        // Update employee details
        $employee->nama = $validatedData['nama'];
        $employee->alamat = $validatedData['alamat'];
        $employee->tgl_bergabung = $validatedData['tgl_bergabung'];
        $employee->tgl_lahir = $validatedData['tgl_lahir'];
        $employee->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Employee updated successfully',
        ]);
    }


    // Menghapus data karyawan
    public function destroy($id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json([
                'status' => 'error',
                'message' => 'Employee not found',
            ], 404);
        }

        $employee->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Employee deleted successfully',
        ]);
    }
}

