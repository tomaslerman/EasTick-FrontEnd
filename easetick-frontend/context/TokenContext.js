// context/TokenContext.js
'use client';

import React, { createContext, useState, useEffect } from 'react';

export const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false); // Fin del estado de carga una vez verificado el token
  }, []);

  const saveToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token'); // Eliminar token del localStorage
    setToken(null); // Actualizar el estado del token
  };

  return (
    <TokenContext.Provider
      value={{
        token,
        saveToken,
        logout, // Asegúrate de que la función logout esté disponible en el contexto
        isLoggedIn: !!token,
        loading,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
