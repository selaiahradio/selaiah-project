// ========================================
// SELAIAH RADIO - AUTH CONTEXT
// iHostCast Ltd © 2025
// ========================================

import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

// Helper functions para localStorage
const getToken = () => localStorage.getItem('token');
const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
const setToken = (token) => localStorage.setItem('token', token);
const setUserData = (user) => localStorage.setItem('user', JSON.stringify(user));
const removeToken = () => localStorage.removeItem('token');
const removeUser = () => localStorage.removeItem('user');

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    try {
      const token = getToken();
      const userData = getUser();

      if (token && userData) {
        setUserState(userData);
        setIsAuthenticated(true);
        
        // Verificar que el token sea válido
        try {
          const response = await authAPI.getCurrentUser();
          if (response.data) {
            setUserState(response.data);
            setUserData(response.data);
          }
        } catch (error) {
          // Token inválido, limpiar
          logout();
        }
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = (token, userData, greeting) => {
    setToken(token);
    setUserData(userData);
    setUserState(userData);
    setIsAuthenticated(true);
    
    if (greeting) {
      toast.success(greeting.message || greeting);
    }
  };

  const logout = () => {
    removeToken();
    removeUser();
    setUserState(null);
    setIsAuthenticated(false);
    toast.info('Sesión cerrada');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
