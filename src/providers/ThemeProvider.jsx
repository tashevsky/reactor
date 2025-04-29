import React, {useEffect, useMemo, useState} from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#ffffff', paper: '#f5f5f5' },
  },
});

// See https://m2.material.io/design/color/dark-theme.html#properties
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#bb86fc' },
    secondary: { main: '#03dac6' },
    background: { default: '#121212', paper: '#333333' },
  },
});

// Default theme preference for new page visitors
const defaultThemePreference = () => {
  if (window.matchMedia) {
    // Check if the dark-mode Media-Query matches
    if (window.matchMedia('(prefers-color-scheme: dark)').matches){
      return 'dark'
    } else {
      return 'light'
    }
  }
  
  // Default (when Media-Queries are not supported)
  return 'light'
}

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedThemePreference = localStorage.getItem('savedThemePreference');
    return savedThemePreference || defaultThemePreference();
  });

  // Theme Setter
  useEffect(() => {
    localStorage.setItem('savedThemePreference', mode);
  }, [mode]);

  const theme = useMemo(() => (
    mode === 'light' ? lightTheme : darkTheme
  ), [mode]);

  theme.toggleTheme = () => setMode((prevMode) => (
    prevMode === 'light' ? 'dark' : 'light'
  ));

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;