'use client'

import * as React from 'react';
import { SessionProvider } from "next-auth/react";
import { AppRouterCacheProvider } from '@mui/material-nextjs/build/v14-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import theme from '@/theme';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';


const DRAWER_WIDTH = 240;

export default function RootLayout({ children }) {

  const router = useRouter();
  const handleLoginClick = () => {
    router.push('/login');
  }

  // Will probably move this to it's own component at some point
  function ButtonAppBar() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MindfulTrack
            </Typography>
            <Button 
              color="inherit"
              onClick={handleLoginClick}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  // This is the main return of this component
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <SessionProvider>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />

              <ButtonAppBar />
    
              {children}

            </ThemeProvider>
          </SessionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}