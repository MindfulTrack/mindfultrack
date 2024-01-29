'use client'
import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';


interface LoggedInLayoutProps {
  children: ReactNode
}

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({ children }) => {

  return (
    <>
      <Box
        component="div"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          ml: '93px',
          mt: ['48px', '56px', '94px'],
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