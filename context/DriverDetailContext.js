// context/DriverDetailContext.js
import { createContext, useState } from 'react';

export const DriverDetailContext = createContext();

export const DriverDetailProvider = ({ children }) => {
    const [driverDetail, setDriverDetail] = useState({
        source: null,
        destination: null,
    });

    return (
        <DriverDetailContext.Provider value={{ driverDetail, setDriverDetail }}>
            {children}
        </DriverDetailContext.Provider>
    );
};
