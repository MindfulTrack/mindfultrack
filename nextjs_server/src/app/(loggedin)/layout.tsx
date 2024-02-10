'use client'
import React, { ReactNode } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import SideNavBar from '../components/Sidebar';
import { Container } from '@mui/material';
import {useSession} from "next-auth/react";

interface LoggedInLayoutProps {
  children: ReactNode

}

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({ children }) => {
  
  const {data: session, status} : any = useSession({required: true});
  
  const loading = status === 'loading'

  if (loading) {
    return <div>Loading...</div>  // Or a loading spinner
  }
  
  let roleList = ['Admin'] || session.user.groups;
  let role = roleList[0];
  // console.log(role)
  return (
    <>
      <SideNavBar userRole={role}/>
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