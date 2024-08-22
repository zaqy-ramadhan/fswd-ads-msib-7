import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import EmployeePage from './pages/EmployeePage';
import CutiPage from './pages/CutiPage';
import Navigation from './components/Navigation';

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        document.title = 'ADS Leave System';
    }, []);

    const handleLogin = (user) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    return (
        <Router>
            {user && <Navigation user={user} onLogout={handleLogout} />}
            <Routes>
                <Route
                    path="/"
                    element={user ? <Navigate to="/employees" /> : <LoginPage onLogin={handleLogin} />}
                />
                <Route
                    path="/login"
                    element={user ? <Navigate to="/employees" /> : <LoginPage onLogin={handleLogin} />}
                />
                <Route
                    path="/employees/*"
                    element={user ? <EmployeePage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/cutis/*"
                    element={user ? <CutiPage /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;
