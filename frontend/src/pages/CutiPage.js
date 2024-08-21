import { Route, Routes } from 'react-router-dom';
import CutiList from '../components/CutiList';
import CutiDetails from '../components/CutiDetails';
import CutiForm from '../components/CutiForm';

const CutiPage = () => {
    return (
        <Routes>
            <Route path="/" element={<CutiList />} />
            <Route path=":id" element={<CutiDetails />} />
            <Route path="new" element={<CutiForm />} />
        </Routes>
    );
};

export default CutiPage;
