import * as React from 'react';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
import Sidebar from '@/app/components/Sidebar';

export const metadata = {
  title: 'Login',
  description: 'Login to Mindfultrack',
};

export default function AdminLayout(props) {
  const drawerWidth = 173;
  return (
    <>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          ml: `${drawerWidth}px`,
          mt: ['48px', '56px', '64px'],
          p: 3,
        }}
      >
        {props.children}
      </Box>
    </>
  );
}