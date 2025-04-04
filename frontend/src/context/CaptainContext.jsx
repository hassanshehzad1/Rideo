import React, { createContext, useState } from 'react'


export const CaptainDataContext = createContext();
const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(() => {
        const savedCaptain = localStorage.getItem("captain");
        return savedCaptain ? JSON.parse(savedCaptain) : null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const updateCaptain = (data) => {
        setCaptain(data);
        setIsLoading(false);
    }

    const value = {
        captain,
        isLoading,
        setIsLoading,
        setCaptain,
        error,
        setError,
        updateCaptain

    }


    return (
        <CaptainDataContext.Provider value={value}>
            {children}

        </CaptainDataContext.Provider>
    )
}

export default CaptainContext