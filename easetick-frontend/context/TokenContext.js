'use client';

import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded = jwtDecode(storedToken);
        setUserId(decoded.id);
        const storedRole = localStorage.getItem('userRole');
        setUserRole(storedRole ? parseInt(storedRole) : null);
      } catch (error) {
        console.error("Error decodificando el token:", error);
        setUserId(null);
        setUserRole(null);
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
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      setUserId(null);
      setUserRole(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setToken(null);
    setUserId(null);
    setUserRole(null);
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
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;