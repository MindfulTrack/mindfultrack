import React, { ReactNode } from 'react';
import SessionProvider from './components/SessionProvider'
import { getServerSession } from "next-auth";
import { AppRouterCacheProvider } from '@mui/material-nextjs/build/v14-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import NavBar from './components/NavBar';

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = async ({children}) => {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />

              <NavBar />
    
              {children}

            </ThemeProvider>
          </SessionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

export default RootLayout;