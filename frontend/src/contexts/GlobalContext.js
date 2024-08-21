import React, { createContext, useState, useEffect } from 'react';

// Membuat context
export const GlobalContext = createContext();

// Fungsi untuk mendapatkan globalState dari localStorage
const getInitialGlobalState = () => {
    const savedState = localStorage.getItem('globalState');
    return savedState ? JSON.parse(savedState) : {}; // Default to empty object if not found
};

// Membuat provider untuk membungkus komponen-komponen yang membutuhkan akses ke variabel global
export const GlobalProvider = ({ children }) => {
    const [globalState, setGlobalState] = useState(getInitialGlobalState);

    // Simpan globalState ke localStorage setiap kali globalState berubah
    useEffect(() => {
        localStorage.setItem('globalState', JSON.stringify(globalState));
    }, [globalState]);

    // Update admin data
    const updateAdminData = (adminData) => {
        setGlobalState(prevState => ({
            ...prevState,
            admin: adminData
        }));
    };

    return (
        <GlobalContext.Provider value={{ globalState, updateAdminData }}>
            {children}
        </GlobalContext.Provider>
    );
};
