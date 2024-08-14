import { createContext, useState } from 'react';

const DriverInfoContext = createContext();

const DriverInfoProvider = ({ children }) => {
  const [driverInfo, setDriverInfo] = useState({ /* initial driver info */ });

  return (
    <DriverInfoContext.Provider value={{ driverInfo, setDriverInfo }}>
      {children}
    </DriverInfoContext.Provider>
  );
};

export { DriverInfoProvider, DriverInfoContext };