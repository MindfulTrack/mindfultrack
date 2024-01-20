'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#002E5D', // NAVY
      // light: '#6ec6ff',
      // dark: '#0069c0',
    },
    secondary: {
      main: '#FFFFFF', // WHITE
      // light: '#ff79b0',
      // dark: '#c60055',
    },
    tertiary: {
      main: '#0062B8', // ROYAL
      // light: '#80e27e',
      // dark: '#087f23',
    },
    text: {
      primary: '#141414', // DARK GRAY
      secondary: '#002E5D', // NAVY
      tertiary: '#FFFFFF', // WHITE
    },
    background: {
      default: '#FFFFFF', // WHITE
    },
    error: {
      main: '#A3082A', // RED
    },
    success: {
      main: '#006141', // GREEN
    },
    warning: {
      main: '#8C3A00', // BROWN-RED
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default theme;