import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCutiById, updateCuti } from '../services/api';

const CutiDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cuti, setCuti] = useState(null);
    const [tglCuti, setTglCuti] = useState('');
    const [lamaCuti, setLamaCuti] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [idKaryawan, setIdKaryawan] = useState('');

    useEffect(() => {
        const fetchCuti = async () => {
            try {
                const data = await getCutiById(id);
                const cutiData = data.data.cuti;
                setCuti(cutiData);
                setTglCuti(cutiData.tgl_cuti);
                setLamaCuti(cutiData.lama_cuti);
                setKeterangan(cutiData.keterangan);
                setIdKaryawan(cutiData.id_karyawan);
            } catch (error) {
                console.error('Error fetching cuti details:', error.response?.data?.message || error.message);
            }
        };

        fetchCuti();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedCuti = {
            tgl_cuti: tglCuti,
            lama_cuti: lamaCuti,
            keterangan,
            id_karyawan: idKaryawan,
        };

        try {
            await updateCuti(id, updatedCuti);
            navigate('/cutis',{
                state: { message: 'Leave data updated successfully.', messageType: 'success' }
            });
        } catch (error) {
            console.error('Error updating cuti:', error.response?.data?.message || error.message);
        }
    };

    if (!cuti) return <div>Loading...</div>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Edit Leave Record</h2>
                <form onSubmit={handleUpdate}>
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
                        <label className="block text-sm font-medium text-gray-700">Lama Cuti</label>
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
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CutiDetails;
