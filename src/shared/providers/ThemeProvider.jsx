import { createContext, useContext } from 'react';
import useTheme from '../hooks/useTheme';

const ThemeContext = createContext(null);

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return ctx;
};

const ThemeProvider = ({ children }) => {
  const theme = useTheme();
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
