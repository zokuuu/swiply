import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export const lightColors = {
  primary: '#8c76b3',
  primaryLight: '#b19cd9',
  primaryDark: '#6b5494',
  accent: '#ffb6c1',
  accentLight: '#ffe4e9',
  background: '#faf9ff',
  cardBackground: '#ffffff',
  white: '#ffffff',
  black: '#2d2d2d',
  gray: '#9a9a9a',
  lightGray: '#e8e6f0',
  success: '#8bc34a',
  error: '#ff6b6b',
  warning: '#ffd54f',
  text: '#2d2d2d',
  textSecondary: '#9a9a9a',
  border: '#e8e6f0',
  shadow: '#6b5494',
};

export const darkColors = {
  primary: '#b19cd9',
  primaryLight: '#d4c2f0',
  primaryDark: '#8c76b3',
  accent: '#ffb6c1',
  accentLight: '#4a3f5a',
  background: '#1a1a2e',
  cardBackground: '#2d2d44',
  white: '#2d2d44',
  black: '#f0f0f0',
  gray: '#a0a0a0',
  lightGray: '#3d3d5c',
  success: '#8bc34a',
  error: '#ff6b6b',
  warning: '#ffd54f',
  text: '#f0f0f0',
  textSecondary: '#a0a0a0',
  border: '#3d3d5c',
  shadow: '#000000',
};

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  colors: typeof lightColors;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    if (systemColorScheme === 'dark' || systemColorScheme === 'light') {
      setTheme(systemColorScheme);
    }
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
      {children}
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
