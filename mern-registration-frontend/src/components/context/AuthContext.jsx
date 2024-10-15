import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = JSON.parse(localStorage.getItem('user'));
          setUser(userData);
        } catch (error) {
          console.error(error);
        }
      }
    };
    loadUser();
  }, []);

  const register = async (formData) => {
    try {
      const response = await API.post('/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      return { success: true };
    } catch (error) {
      console.error(error.response.data.message);
      return { success: false, message: error.response.data.message };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await API.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      return { success: true };
    } catch (error) {
      console.error(error.response.data.message);
      return { success: false, message: error.response.data.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateProfile = async (id, formData) => {
    try {
      const response = await API.put(`/user/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      return { success: true };
    } catch (error) {
      console.error(error.response.data.message);
      return { success: false, message: error.response.data.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
