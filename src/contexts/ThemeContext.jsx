import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const antdConfig = useMemo(() => ({
    token: {
      colorPrimary: '#005f73',
      colorLink: '#0a9396',
      borderRadius: 4,
    },
    algorithm: theme === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm,
  }), [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ConfigProvider theme={antdConfig}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
