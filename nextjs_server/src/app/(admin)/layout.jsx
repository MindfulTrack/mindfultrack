import * as React from 'react';
import Link from 'next/link';
import { SessionProvider } from "next-auth/react";
import { AppRouterCacheProvider } from '@mui/material-nextjs/build/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
import theme from '@/theme';
import { Card, CardContent } from '@mui/material';

export const metadata = {
  title: 'Login',
  description: 'Login to Mindfultrack',
};

const DRAWER_WIDTH = 240;

const LINKS = [
  { text: 'Home', href: '/', icon: HomeIcon },
  { text: 'Starred', href: '/starred', icon: StarIcon },
  { text: 'Tasks', href: '/tasks', icon: ChecklistIcon },
  { text: 'Logout', icon: LogoutIcon, href: '/login' },
];

const PLACEHOLDER_LINKS = [
  { text: 'Settings', icon: SettingsIcon, href: '/setting' },
  { text: 'Support', icon: SupportIcon, href: '/support' },
  { text: 'Logout', icon: LogoutIcon, href: '/login' },
];

export default function RootLayout(props) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <SessionProvider session={props.session}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <AppBar position="fixed" sx={{ zIndex: 2000 }}>
                <Toolbar sx={{ backgroundColor: 'background.paper' }}>
                  <DashboardIcon sx={{ color: '#444', mr: 2, transform: 'translateY(-2px)' }} />
                  <Typography variant="h6" noWrap component="div" color="black">
                    TEST HERE
                  </Typography>
                </Toolbar>
              </AppBar>
              <Drawer
                sx={{
                  width: DRAWER_WIDTH,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: DRAWER_WIDTH,
                    boxSizing: 'border-box',
                    top: ['48px', '56px', '64px'],
                    height: 'auto',
                    bottom: 0,
                  },
                }}
                variant="permanent"
                anchor="left"
              >
                <Divider />
                <List>
                  {LINKS.map(({ text, href, icon: Icon }) => (
                    <ListItem key={href} disablePadding>
                      <ListItemButton component={Link} href={href}>
                        <ListItemIcon>
                          <Icon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ mt: 'auto' }} />
                <List>
                  {PLACEHOLDER_LINKS.map(({ text, href, icon: Icon }) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton href={href}>
                        <ListItemIcon>
                          <Icon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Drawer>
              
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  bgcolor: 'background.default',
                  mt: ['48px', '56px', '64px'],
                  ml: `${DRAWER_WIDTH}px`,
                  p: 3,
                }}
              >
              {props.children}
              </Box>
            </ThemeProvider>
          </SessionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}