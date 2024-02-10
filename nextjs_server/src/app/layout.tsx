
import React, { ReactNode } from 'react';
import SessionProvider from './components/SessionProvider'
import { getServerSession } from "next-auth";
import { AppRouterCacheProvider } from '@mui/material-nextjs/build/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import NavBar from './components/NavBar';
import MyProvider from './MyProvider';
import { authOptions } from './api/auth/[...nextauth]/authOptions.js';
import { headers } from 'next/headers';
import { Suspense } from 'react';
import Loading from './components/loading';


interface RootLayoutProps {
  children: ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = async ({children}) => {
  const headersList = headers();
  const currentUrl = headersList.get('next-url')
 
  if(currentUrl != '/test'){
    const op : any = authOptions;
    const session : any = await getServerSession(op);
    console.log("STATUS")
    console.log(session)
    
    return (
      <html lang="en">
        <body>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <Suspense fallback={<Loading />}>
              <SessionProvider session={session}>

                <ThemeProvider theme={theme}>
                  <MyProvider>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />

                    <NavBar />

                    {children}
                  </MyProvider>
                </ThemeProvider>

              </SessionProvider>
            </Suspense>
          </AppRouterCacheProvider>
        </body>
      </html>
    );
  }
  else{
    return
  }
}

export default RootLayout;