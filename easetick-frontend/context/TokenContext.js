'use client';

import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded = jwtDecode(storedToken);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Error decodificando el token:", error);
        setUserId(null); // Si hay un error, asegurarse de que userId sea nulo
      }
    }
    setLoading(false); // Fin del estado de carga una vez verificado el token
  }, []);

  const saveToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
      const decoded = jwtDecode(newToken);
      setUserId(decoded.id);
    } else {
      localStorage.removeItem('token');
      setUserId(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUserId(null); // Asegúrate de que userId se limpie al cerrar sesión
  };

  return (
    <TokenContext.Provider
      value={{
        token,
        saveToken,
        logout,
        isLoggedIn: !!token,
        loading,
        userId,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
