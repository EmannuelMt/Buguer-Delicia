import React, { createContext, useContext, useState, useEffect } from 'react';

const mockUser = {
  id: 1,
  name: 'João Silva',
  email: 'joao@email.com',
  avatar: null,
  preferences: {
    notifications: true,
    newsletter: false
  }
};

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setUser(mockUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (email && password) {
        const token = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('authToken', token);
        setUser(mockUser);
        return { success: true };
      } else {
        return { success: false, error: 'Credenciais inválidas' };
      }
    } catch (error) {
      return { success: false, error: 'Erro ao fazer login' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (userData.email && userData.password) {
        const token = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('authToken', token);
        setUser({
          ...mockUser,
          name: userData.name,
          email: userData.email
        });
        return { success: true };
      } else {
        return { success: false, error: 'Dados inválidos' };
      }
    } catch (error) {
      return { success: false, error: 'Erro ao criar conta' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(prev => ({
        ...prev,
        ...profileData
      }));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro ao atualizar perfil' };
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;