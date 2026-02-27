import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// ─── DARK THEME — "Obsidian Market" ───────────────────────────────────────────
export const darkColors = {
  primary: '#6C8EFF',
  primaryLight: '#8FA8FF',
  primaryDark: '#4B6EE8',

  accent: '#F5A623',
  accentLight: '#F7C26B',
  accentDark: '#D4891A',

  background: '#0D0D14',
  cardBackground: '#13131F',
  surface: '#13131F',
  surfaceElevated: '#1C1C2E',

  white: '#13131F',
  black: '#E8E8F0',

  text: '#E8E8F0',
  textSecondary: '#8888AA',
  textTertiary: '#55556A',

  border: '#252540',
  shadow: '#000000',

  lightGray: '#252540',
  gray: '#8888AA',

  success: '#4ADE80',
  error: '#FF5E6D',
  warning: '#F5A623',
};

// ─── LIGHT THEME — "Pearl" ─────────────────────────────────────────────────────
export const lightColors = {
  primary: '#4B6EE8',
  primaryLight: '#6C8EFF',
  primaryDark: '#3451C7',

  accent: '#F5A623',
  accentLight: '#FDE8BF',
  accentDark: '#D4891A',

  background: '#F4F4FB',
  cardBackground: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceElevated: '#EEEEF8',

  white: '#FFFFFF',
  black: '#0D0D14',

  text: '#1A1A2E',
  textSecondary: '#6666AA',
  textTertiary: '#AAAACC',

  border: '#DDDDF0',
  shadow: '#3451C7',

  lightGray: '#DDDDF0',
  gray: '#6666AA',

  success: '#22C55E',
  error: '#EF4444',
  warning: '#F5A623',
};

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  colors: typeof darkColors;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  // Default to dark for premium experience
  const [theme, setTheme] = useState<ThemeType>('dark');

  useEffect(() => {
    if (systemColorScheme === 'dark' || systemColorScheme === 'light') {
      setTheme(systemColorScheme);
    }
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'dark' ? darkColors : lightColors;

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
