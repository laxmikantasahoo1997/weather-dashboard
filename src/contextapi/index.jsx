// context-api/index.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cityName, setCityName] = useState(localStorage.getItem('city') || "");
  const [weatherDescription, setWeatherDescription] = useState("haze");


  const contextValues = {
    cityName,
    setCityName,
    weatherDescription,
    setWeatherDescription
  };

  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
};


export const UseAppContext = () => {
  return useContext(AppContext);
};
