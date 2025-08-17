import React, { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
        try {
            const decoded = jwtDecode(JSON.parse(storedUser).token);
            if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem('userInfo');
            } else {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            localStorage.removeItem('userInfo');
        }
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  // Stabilize the refreshUser function with useCallback
  const refreshUser = useCallback(async () => {
    if (!user?.token) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me?t=${new Date().getTime()}`, config);
      login({ ...data, token: user.token });
    } catch (error) {
      console.error("Failed to refresh user data", error);
    }
  }, [user?.token]); // Dependency array ensures function is stable

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
