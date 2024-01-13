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
import { Container, Paper } from '@mui/material';
import { createSvgIcon, SvgIcon } from '@mui/material';
import { SelfImprovement } from '@mui/icons-material';


export default function RootLayout({ children }) {

  const router = useRouter();
  const handleLoginClick = () => {
    router.push('/login');
  }

  // Will probably move this to it's own component at some point
  function NavBar() {
    const BYU = createSvgIcon(
      <svg id="Layer_1_copy" data-name="Layer 1 copy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 582.61 231.45" width={50}><g id="Vector_Smart_Object" data-name="Vector Smart Object"><path class="cls-1" d="M498.39,76.05c0-3.3.2-5.39,2.41-6.51a30.13,30.13,0,0,1,8.12-2.66l.07,0c.17,0,.18-.51-.07-.51H447.79c-.24,0-.24.47-.07.51h.07a30.84,30.84,0,0,1,8.12,2.66c2.21,1.13,2.4,3.24,2.4,6.53v61.09c0,13.92-8,24.62-23.81,24.62s-23.82-10.7-23.82-24.62V76.09c0-3.3.19-5.43,2.41-6.55a30.13,30.13,0,0,1,8.12-2.66l.07,0c.17,0,.17-.51-.08-.51H363.49c-.25,0-.25.47-.08.51l.07,0a10.06,10.06,0,0,1,4.72,2.36c1.91,1.62,2.4,3.53,2.4,6.83v60c0,28.94,15.83,53.51,63.9,53.51s63.89-24.57,63.89-53.51Z"/><path class="cls-1" d="M122.73,89.19h18.58c12.11,0,19.22,1.88,19.22,12.88,0,7.16-4.42,13.54-18.73,13.54H122.73Zm0,45.13h16.12c10.73,0,23.86,0,23.86,14.86,0,11-9.4,14.85-22.06,14.85H122.73ZM84.16,76.05l0,101.64c0,3.3-.19,5.42-2.4,6.55a30.2,30.2,0,0,1-8.13,2.66l-.07,0c-.16,0-.17.51.07.51h82.21c34.68,0,49.26-13.76,49.26-35.23,0-15.86-7.39-25.69-22-29.34-.08,0-.1-.22,0-.25,9.32-2.91,17.9-9.74,17.9-26.27,0-22.4-15.14-30-48.16-30H73.65c-.24,0-.24.47-.07.51h.07a30.49,30.49,0,0,1,8.12,2.67C84,70.66,84.16,72.75,84.16,76.05Z"/><path class="cls-1" d="M302,66.87c2.06,0,5.23.15,5,5-.18,4.18-21.67,34.62-24.18,39.18-7.54-11.42-24.05-34.64-24.21-39.18-.13-3.73,3-5,5.72-5l.07,0c.16,0,.17-.51-.07-.51H205c-.25,0-.24.47-.07.51H205a21.71,21.71,0,0,1,6.69,2.22,10.79,10.79,0,0,1,1.5,1,30.4,30.4,0,0,1,5.65,6.78l41.87,62V177.7c0,3.29-.18,5.42-2.39,6.54a30.68,30.68,0,0,1-8.13,2.67h-.07c-.17,0-.17.51.07.51h64.46c.24,0,.24-.47.08-.51h-.07a30.57,30.57,0,0,1-8.13-2.67c-2.21-1.12-2.4-3.24-2.4-6.54V139.13l41.94-62.27a30.1,30.1,0,0,1,5.65-6.78,17.35,17.35,0,0,1,1.49-1.15,12.26,12.26,0,0,1,4.74-2.06H358c.16,0,.17-.51-.08-.51H302c-.25,0-.24.46-.08.5Z"/></g></svg>,
      'BYU'
    );

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

            <SelfImprovement sx={{mr: 2, fontSize: 35}}/>

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

    // Will probably move this to it's own component at some point
    function Footer() {
      return (
        <Box sx={{ flexGrow: 1 }}>
          <Paper 
            sx={{position: 'sticky',
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              textAlign: 'center',
              backgroundColor: 'primary.main'
            }} 
            component='footer' 
            square
          >
            <Typography variant='h2' component="div" color="secondary.main" sx={{padding: 5}}>hello this is my foot</Typography>
          </Paper>
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

              <NavBar />
    
              {children}
              
              <Footer />

            </ThemeProvider>
          </SessionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}