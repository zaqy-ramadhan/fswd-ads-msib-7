<?php

namespace App\Http\Controllers;

use App\Models\Cuti;
use App\Models\Employee;
use Illuminate\Http\Request;

class CutiController extends Controller
{
    public function index(Request $request)
    {
        $query = Cuti::with('employee');
    
        if ($request->has('name')) {
            $query->whereHas('employee', function($q) use ($request) {
                $q->where('nama', 'like', '%' . $request->input('name') . '%');
            });
        }
    
        if ($request->has('all') && $request->input('all') == 'true') {
            $cutis = $query->get();
            $pagination = null;
        } else {
            $cutis = $query->paginate(10);
            $pagination = [
                'total' => $cutis->total(),
                'current_page' => $cutis->currentPage(),
                'per_page' => $cutis->perPage(),
                'last_page' => $cutis->lastPage(),
                'next_page_url' => $cutis->nextPageUrl(),
                'prev_page_url' => $cutis->previousPageUrl(),
            ];
        }
    
        $transformedData = $cutis->map(function ($cuti) {
            return [
                'id' => $cuti->id,
                'tgl_cuti' => $cuti->tgl_cuti,
                'lama_cuti' => $cuti->lama_cuti,
                'keterangan' => $cuti->keterangan,
                'employee' => [
                    'id' => $cuti->employee->id,
                    'nama' => $cuti->employee->nama,
                ],
            ];
        });
    
        return response()->json([
            'status' => 'success',
            'message' => 'Data retrieved successfully',
            'data' => [
                'cutis' => $transformedData,
            ],
            'pagination' => $pagination,
        ]);
    }
    

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'tgl_cuti' => 'required|date',
            'lama_cuti' => 'required|integer|min:1',
            'keterangan' => 'nullable|string',
            'id_karyawan' => 'required|exists:employees,id',
        ]);
    
        $currentYear = now()->year;
    
        $totalLeaveDays = Cuti::where('id_karyawan', $validatedData['id_karyawan'])
            ->whereYear('tgl_cuti', $currentYear)
            ->sum('lama_cuti');
    
        if ($totalLeaveDays + $validatedData['lama_cuti'] > 12) {
            return response()->json([
                'status' => 'error',
                'message' => 'Jatah cuti melebihi untuk tahun ini.',
            ], 400);
        }
    
        $cuti = Cuti::create($validatedData);
    
        return response()->json([
            'status' => 'success',
            'message' => 'Cuti created successfully',
            'data' => $cuti,
        ], 201);
    }
    

    public function show($id)
    {
        $cuti = Cuti::with('employee')->find($id);

        if (!$cuti) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cuti not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Data retrieved successfully',
            'data' => [
                'cuti' => $cuti,
            ],
        ]);
    }

    public function update(Request $request, $id)
    {
    $cuti = Cuti::findOrFail($id);
    $validatedData = $request->validate([
        'tgl_cuti' => 'required|date',
        'lama_cuti' => 'required|integer',
        'keterangan' => 'nullable|string',
        'id_karyawan' => 'required|exists:employees,id',
    ]);

        // Fetch all leave records for the employee
        $employeeId = $validatedData['id_karyawan'];
        $totalLeave = Cuti::where('id_karyawan', $employeeId)
            ->where('id', '!=', $id) // Exclude the current record
            ->sum('lama_cuti');

        // Add the updated leave record's days
        $totalLeave += $validatedData['lama_cuti'];

        if ($totalLeave > 12) {
            return response()->json([
                'status' => 'error',
                'message' => 'Total leave days for this employee exceed the annual limit of 12 days.',
            ], 400);
        }

        // Update the leave record
        $cuti->update($validatedData);

        return response()->json([
            'status' => 'success',
            'message' => 'Cuti updated successfully',
            'data' => $cuti,
        ]);
    }


    public function destroy($id)
    {
        $cuti = Cuti::find($id);

        if (!$cuti) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cuti not found',
            ], 404);
        }

        $cuti->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Cuti deleted successfully',
        ]);
    }
}
