import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut} from 'react-icons/fi';
import { logout} from '../services/api';

const Navigation = ({ onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            onLogout();
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error.message);
            alert('Failed to logout. Please try again.');
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-gray-800 text-white p-4 shadow-md">
            <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-xl font-semibold hover:text-gray-300">
                        Home
                    </Link>
                    <Link to="/employees" className="hover:text-gray-300">
                        Employees
                    </Link>
                    <Link to="/cutis" className="hover:text-gray-300">
                        Leave
                    </Link>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                >
                    <span>Logout</span>
                    <FiLogOut size={20} />
                </button>
            </div>
        </nav>
    );
};

export default Navigation;
