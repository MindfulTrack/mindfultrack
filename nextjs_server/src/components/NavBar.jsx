"use client"
import * as React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { SelfImprovement } from '@mui/icons-material';
import {signIn, signOut, useSession} from "next-auth/react";
import CircularProgress from '@mui/material/CircularProgress';

export default function NavBar() {
  const {data: session, status} = useSession();

  // if (status == "loading") {
  //   return <CircularProgress size="lg"/>;
  // }

  // If the user is authenticated redirect to `/profile`
  if (session) {
    // router.push("profile");
    return(
      <>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <SelfImprovement sx={{mr: 2, fontSize: 35}} onClick={() => window.location.href='/'}/>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MindfulTrack
          </Typography>
          <Button 
            color="inherit"
            href="/profile"
            // onClick={() => signOut()}
          >
            Profile: {session.user.username}
          </Button>
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
        <AppBar position="static">
          <Toolbar>
            
            <SelfImprovement sx={{mr: 2, fontSize: 35}} onClick={() => window.location.href='/'}/>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MindfulTrack
            </Typography>
            <Button 
              color="inherit"
              onClick={() => signIn(undefined, {callbackUrl: "/profile"})}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      </>
    );
  }
}