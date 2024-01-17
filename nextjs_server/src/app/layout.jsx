import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { AppRouterCacheProvider } from '@mui/material-nextjs/build/v14-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Box from '@mui/material/Box';

export default async function RootLayout({children}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />

              <Box display="flex" flexDirection="column" minHeight="100vh">
                <NavBar />
      
                {children}
                
                <Footer />
              </Box>

            </ThemeProvider>
          </SessionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}