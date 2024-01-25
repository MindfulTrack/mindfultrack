'use client'
import React, { ReactNode} from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import SideNavBar from '../components/Sidebar';
import { Container } from '@mui/material';

interface LoggedInLayoutProps {
  children: ReactNode
}

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({children}) => {

  return (
    <>
        <SideNavBar />
      <Box
        component="div"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          ml: '105px',
          mt: ['48px', '56px', '64px'],
          p: 3,
          paddingTop: 1
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default LoggedInLayout;