import { useState, useEffect } from 'react';
import { createCuti, fetchEmployees } from '../services/api'; // Import the API functions
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CutiForm = () => {
    const [tglCuti, setTglCuti] = useState('');
    const [lamaCuti, setLamaCuti] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [idKaryawan, setIdKaryawan] = useState('');
    const [employees, setEmployees] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); 
    
    useEffect(() => {
        const fetchEmployeeList = async (all=true) => {
            try {
                const response = await fetchEmployees(null,null,null,all);
                setEmployees(response.data.employees);
            } catch (error) {
                console.error('Error fetching employees:', error.response?.data?.message || error.message);
            }
        };

        fetchEmployeeList();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('tgl_cuti', tglCuti);
        formData.append('lama_cuti', lamaCuti);
        formData.append('keterangan', keterangan);
        formData.append('id_karyawan', idKaryawan);

        try {
            await createCuti(formData);
            // Reset the form after successful submission
            setTglCuti('');
            setLamaCuti('');
            setKeterangan('');
            setIdKaryawan('');
            setErrorMessage('');

            // Navigate back to the leave list page
            navigate('/cutis',{
                state: { message: 'Leave data created successfully.', messageType: 'success' }
            });
        } catch (error) {
            setErrorMessage(error.message || 'An error occurred while saving the data.');
            console.error('Error saving data:', error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Add New Leave</h2>
                {errorMessage && (
                    <div className="mb-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded-md">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tanggal Cuti</label>
                        <input
                            type="date"
                            value={tglCuti}
                            onChange={(e) => setTglCuti(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Lama Cuti (Days)</label>
                        <input
                            type="number"
                            value={lamaCuti}
                            onChange={(e) => setLamaCuti(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Keterangan</label>
                        <textarea
                            value={keterangan}
                            onChange={(e) => setKeterangan(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Employee</label>
                        <select
                            value={idKaryawan}
                            onChange={(e) => setIdKaryawan(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        >
                            <option value="" disabled>Select an employee</option>
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.nama}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CutiForm;
