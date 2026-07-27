import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('eventtrail_jwt_token') || null);
  const [loading, setLoading] = useState(true);

  // Restore session on application load
  useEffect(() => {
    const restoreSession = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/users/me');
        setUser(response.user);
      } catch (err) {
        console.warn('[AuthContext] Session expired or invalid token. Logging out.', err.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [token]);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { id_token } = response.tokens;
    
    // Store id_token for API Gateway authorizer claims
    localStorage.setItem('eventtrail_jwt_token', id_token);
    setToken(id_token);
    setUser(response.user);
    return response.user;
  };

  const signup = async ({ email, password, name, role, department }) => {
    const response = await api.post('/auth/signup', { email, password, name, role, department });
    return response.user;
  };

  const logout = () => {
    localStorage.removeItem('eventtrail_jwt_token');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (updates) => {
    const response = await api.put('/users/me', updates);
    setUser(response.user);
    return response.user;
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
/* eslint-disable react-refresh/only-export-components */
/* oxlint-disable react/only-export-components */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
