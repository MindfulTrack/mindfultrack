import * as React from 'react';
import Link from 'next/link';
import { SessionProvider } from "next-auth/react";
import { AppRouterCacheProvider } from '@mui/material-nextjs/build/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
import theme from '@/theme';
import Sidebar from '@/components/Sidebar.jsx';

export const metadata = {
  title: 'MindfulTrack',
  description: 'MindfulTrack',
};

const DRAWER_WIDTH = 240;

export default function HomeLayout({ children }) {
  return (
    <>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          ml: `${DRAWER_WIDTH}px`,
          mt: ['48px', '56px', '64px'],
          p: 3,
        }}
      >
        {children}
      </Box>
    </>
  );
}