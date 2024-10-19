'use client';

import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [idEmpresa, setIdEmpresa] = useState(null);  // Añadimos idEmpresa

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded = jwtDecode(storedToken);
        setUserId(decoded.id);
        setIdEmpresa(decoded.fkempresa);  // Obtenemos idEmpresa del token decodificado
        const storedRole = localStorage.getItem('userRole');
        setUserRole(storedRole ? parseInt(storedRole) : null);
      } catch (error) {
        console.error("Error decodificando el token:", error);
        setUserId(null);
        setUserRole(null);
        setIdEmpresa(null);
      }
    }
    setLoading(false);
  }, []);

  const saveToken = (newToken, role) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
      localStorage.setItem('userRole', role.toString());
      const decoded = jwtDecode(newToken);
      setUserId(decoded.id);
      setUserRole(role);
      setIdEmpresa(decoded.fkempresa);  // También guardamos idEmpresa
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      setUserId(null);
      setUserRole(null);
      setIdEmpresa(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setToken(null);
    setUserId(null);
    setUserRole(null);
    setIdEmpresa(null);  // También limpiamos idEmpresa
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
        userRole,
        idEmpresa  // Ahora idEmpresa está disponible en todo el contexto
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
