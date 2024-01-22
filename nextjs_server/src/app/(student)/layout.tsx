'use client'
import React, { ReactNode} from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import SideNavBar from '../components/Sidebar';

interface LoggedInLayoutProps {
  children: ReactNode
}

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({children}) => {

  const drawerWidth = 173;
  
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          ml: `${drawerWidth}px`,
          mt: ['48px', '56px', '64px'],
          p: 3,
          paddingTop: 0
        }}
      >
        <SideNavBar />
        {children}
      </Box>
    </>
  );
};

export default LoggedInLayout;