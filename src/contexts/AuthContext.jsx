import React, { createContext, useState, useEffect, useContext } from 'react';
import * as authService from 'src/features/auth/authService';
import { getProfile } from 'src/services/usuarioService';
import { Spin } from 'antd';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setupAuthListener = () => {
      const unsubscribe = authService.onAuthStateChange(async (session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);

        if (currentUser) {
          try {
            const userProfile = await getProfile(currentUser.id);
            setProfile(userProfile);
          } catch (error) {
            console.error('Error fetching profile:', error);
            setProfile(null);
          }
        } else {
          setProfile(null);
        }
        setLoading(false);
      });
      return unsubscribe;
    };

    const unsubscribe = setupAuthListener();

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (credentials) => {
    const { user } = await authService.login(credentials);
    setUser(user);
    const userProfile = await getProfile(user.id);
    setProfile(userProfile);
    return user;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setProfile(null);
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Spin size="large" /></div>;
  }

  return (
    <AuthContext.Provider value={{ user, profile, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};