'use client';
import { Roboto } from 'next/font/google';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Public_Sans } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const publicSans = Public_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

let theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#002E5D",
      light: "#0079ff",
      dark: "#0079ff",
    },
    secondary: {
      main: "#0062B8", // ROYAL
    },
    tertiary: {
      main: '#FFFFFF', // WHITE
      // light: '#ff79b0',
      // dark: '#c60055',
    },
    background: {
      default: "#ffffff",
      paper: "#FFFFFF",
    },
    text: {
      primary: '#141414', // DARK GRAY
      secondary: '#002E5D', // NAVY
      tertiary: '#FFFFFF', // WHITE
    },
    warning: {
      main: '#ffb700'
    },
    info: {
      main: '#FFB700'
    },
    input: {
      main: '#141414'
    }
  },
  typography: {
    fontFamily: publicSans.style.fontFamily,
    h1: {
      fontWeight: 400,
      fontSize: 72,
      lineHeight: 1.08,
      letterSpacing: -1,
    },
    h2: {
      fontSize: 40,
      fontWeight: 700,
      lineHeight: 1.16,
    },
    h3: {
      fontSize: 18,
      fontWeight: 700,
      lineHeight: 1.77,
    },
    h4: {
      fontSize: 16,
      fontWeight: 700,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: 18,
      lineHeight: 1.78,
      letterSpacing: ".1px",
    },
    body2: {
      fontSize: 16,
      lineHeight: 1.62,
      letterSpacing: "2.5px",
      color: "#49566D",
      textTransform: "uppercase",
    },
    body3: {
      fontSize: 14,
    },
    subtitle1: {
      fontSize: 20,
      lineHeight: 1.75,
      fontWeight: 400,
      letterSpacing: ".1px",
      color: "#F3EDE7",
    },
    subtitle2: {
      fontSize: 16,
      lineHeight: 1.75,
      fontWeight: 400,
      letterSpacing: ".1px",
      color: "#F3EDE7",
    },
    button: {
      fontSize: 18,
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 15,
  },
});

theme = responsiveFontSizes(theme);
export default theme;