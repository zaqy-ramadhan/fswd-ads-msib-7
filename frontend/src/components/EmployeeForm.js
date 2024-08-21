import { useState } from 'react';
import { createEmployee } from '../services/api'; // Import the API function
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const EmployeeForm = () => {
    const [nama, setNama] = useState('');
    const [alamat, setAlamat] = useState('');
    const [tglLahir, setTglLahir] = useState('');
    const [tglBergabung, setTglBergabung] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('alamat', alamat);
        formData.append('tgl_lahir', tglLahir);
        formData.append('tgl_bergabung', tglBergabung);

        try {
            await createEmployee(formData);
            // Reset the form after successful submission
            setNama('');
            setAlamat('');
            setTglLahir('');
            setTglBergabung('');
            setErrorMessage('');

            // Navigate back to the employee list page
            navigate('/employees',{
                state: { message: 'Employee created successfully.', messageType: 'success' }
            });
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'An error occurred while saving the employee.');
            console.error('Error saving employee:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Add New Employee</h2>
                {errorMessage && (
                    <div className="mb-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded-md">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nama</label>
                        <input
                            type="text"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Alamat</label>
                        <input
                            type="text"
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                        <input
                            type="date"
                            value={tglLahir}
                            onChange={(e) => setTglLahir(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tanggal Bergabung</label>
                        <input
                            type="date"
                            value={tglBergabung}
                            onChange={(e) => setTglBergabung(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
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

export default EmployeeForm;
