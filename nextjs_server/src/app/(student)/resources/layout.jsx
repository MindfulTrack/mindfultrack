'use client'
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Sidebar from '@/app/components/Sidebar.jsx';

// export const metadata = {
//   title: 'MindfulTrack',
//   description: 'MindfulTrack',
// };

// const DRAWER_WIDTH = 200;


export default function HomeLayout({ children }) {
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
        }}
      >
        <Sidebar />
        {children}
      </Box>
    </>
  );
}