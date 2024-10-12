// context/TokenContext.js
'use client';

import React, {createContext, useState, useEffect} from 'react';

export const TokenContext = createContext();

const TokenProvider = ({children}) => {
  const [token, setToken] = useState(null); // Inicialmente 'null' para verificarlo más tarde
  const [loading, setLoading] = useState(true); // Estado de carga mientras se verifica el token

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false); // Marcamos que terminó de cargar una vez se revisa el token
  }, []);

  const saveToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return (
    <TokenContext.Provider
      value={{
        token,
        saveToken,
        isLoggedIn: !!token,
        loading, // Añadimos el estado de carga
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
