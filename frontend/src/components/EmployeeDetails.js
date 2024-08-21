import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from '../services/api';

const EmployeeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [nama, setNama] = useState('');
    const [alamat, setAlamat] = useState('');
    const [tglLahir, setTglLahir] = useState('');
    const [tglBergabung, setTglBergabung] = useState('');

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const data = await getEmployeeById(id);
                const emp = data.data.employee;
                setEmployee(emp);
                setNama(emp.nama);
                setAlamat(emp.alamat);
                setTglLahir(emp.tgl_lahir);
                setTglBergabung(emp.tgl_bergabung);
            } catch (error) {
                console.error('Error fetching employee details:', error.response?.data?.message || error.message);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedEmployee = {
            nama,
            alamat,
            tgl_lahir: tglLahir,
            tgl_bergabung: tglBergabung,
        };

        try {
            await updateEmployee(id, updatedEmployee);
            navigate('/employees',{
                state: { message: 'Employee updated successfully.', messageType: 'success' }
            });
        } catch (error) {
            console.error('Error updating employee:', error.response?.data?.message || error.message);
        }
    };

    if (!employee) return <div>Loading...</div>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Edit Employee</h2>
                <form onSubmit={handleUpdate}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nama</label>
                        <input
                            type="text"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Alamat</label>
                        <textarea
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                        <input
                            type="date"
                            value={tglLahir}
                            onChange={(e) => setTglLahir(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tanggal Bergabung</label>
                        <input
                            type="date"
                            value={tglBergabung}
                            onChange={(e) => setTglBergabung(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmployeeDetails;
