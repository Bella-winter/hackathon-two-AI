import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // For demo purposes, we'll start with a logged in user
    return {
      name: 'Dr. Smith',
      email: 'dr.smith@example.com',
      role: 'Administrator'
    };
  });
  
  const login = (userData: User) => {
    setUser(userData);
  };
  
  const logout = () => {
    setUser(null);
  };
  
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};