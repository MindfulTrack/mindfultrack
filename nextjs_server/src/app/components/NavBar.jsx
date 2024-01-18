"use client"
import * as React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { SelfImprovement } from '@mui/icons-material';
import {signIn, signOut, useSession} from "next-auth/react";
import Divider from '@mui/material/Divider';
import byuLogo from '../static/byuLogo/Monogram/PNG/BYU_White.png';
import Image from 'next/legacy/image';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const {data: session, status} = useSession();

  const router = useRouter();
  const handleGoHome = () => {
    router.push('/');
  }
  
  // If the user is authenticated redirect to `/profile`
  if (session) {
    // router.push("profile");
    return(
      <>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{justifyContent: 'space-between'}}>
          
        <div style={{display: 'inline-flex'}}>
            <Typography variant="h4" component="div" sx={{pr: "15px", cursor: 'pointer'}} onClick={handleGoHome}>MindfulTrack</Typography>

            <Divider orientation='vertical' flexItem sx={{backgroundColor: "secondary.main"}}/>

            <div style={{paddingLeft: "15px"}}>

              <Image
                src={byuLogo}
                width={140}
                height={40}
                priority="true"
              />

            </div>
          </div>

          <div>
            <Button 
              color="inherit"
              href="/profile"
              
              // onClick={() => signOut()}
            >
              Profile: {session.user.username}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
    </>
    );
  }
  else{

    return (
      <>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{justifyContent: 'space-between'}}>
          
        <div style={{display: 'inline-flex'}}>
            <Typography variant="h4" component="div" sx={{pr: "15px", cursor: 'pointer'}} onClick={handleGoHome}>MindfulTrack</Typography>

            <Divider orientation='vertical' flexItem sx={{backgroundColor: "secondary.main"}}/>

            <div style={{paddingLeft: "15px"}}>

              <Image
                src={byuLogo}
                width={140}
                height={40}
                priority="true"
              />

            </div>
          </div>

          <div>
          <Button 
              color="inherit"
              onClick={() => signIn(undefined, {callbackUrl: "/profile"})}
            >
              Login
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
      </>
    );
  }
}