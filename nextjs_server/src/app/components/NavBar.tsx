"use client"
import * as React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Link } from '@mui/material';
import { SelfImprovement } from '@mui/icons-material';
import { signIn, signOut, useSession } from "next-auth/react";
import Divider from '@mui/material/Divider';
import BYU_White from '../static/byuLogo/Monogram/PNG/BYU_White.png';
import Image from 'next/legacy/image';
import { useRouter } from 'next/navigation';

interface NavBarProps {

};

const NavBar: React.FC<NavBarProps> = () => {

  const { data: session, status } = useSession();

  const router = useRouter();
  const handleGoHome = () => {
    router.push('/');
  }

  // If the user is authenticated redirect to `/profile`
  if (session) {
    // router.push("profile");
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed">
            <Toolbar sx={{ justifyContent: 'space-between' }}>

              <div style={{ display: 'inline-flex' }}>
                <Typography variant="h4" component="div" sx={{ pr: "15px", cursor: 'pointer' }} onClick={handleGoHome}>MindfulTrack</Typography>

                <Divider orientation='vertical' flexItem sx={{ backgroundColor: "secondary.main" }} />

                <div style={{ paddingLeft: "15px" }}>

                  <Link href="https://byu.edu" target="_blank">
                    <Image
                      src={BYU_White}
                      width={140}
                      height={40}
                      priority={true}
                      style={{ cursor: 'pointer' }}
                    />
                  </Link>

                </div>
              </div>

              <div>
                <Button href='https://caps.byu.edu/for-students-in-crisis' target='_blank' variant='contained' sx={{ cursor: "pointer", marginRight: "1rem" }} color='tertiary'>In a crisis?</Button>
                <Button
                  color="inherit"
                  sx={{ cursor: "pointer" }}
                  onClick={() => signOut()}
                >
                  {session.user?.email}
                </Button>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      </>
    );
  }
  else {

    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" >
            <Toolbar sx={{ justifyContent: 'space-between' }}>

              <div style={{ display: 'inline-flex' }}>
                <Typography variant="h4" component="div" fontWeight={'700'} sx={{ pr: "15px", cursor: 'pointer' }} onClick={handleGoHome}>MindfulTrack</Typography>

                <Divider orientation='vertical' flexItem sx={{ backgroundColor: "secondary.main" }} />

                <div style={{ paddingLeft: "15px" }}>

                  <Link href="https://byu.edu" target="_blank">
                    <Image
                      src={BYU_White}
                      width={140}
                      height={40}
                      priority={true}
                      style={{ cursor: 'pointer' }}
                    />
                  </Link>
                </div>
              </div>

              <div>
                <Button href='https://caps.byu.edu/for-students-in-crisis' target='_blank' variant='contained' sx={{ cursor: "pointer", marginRight: "1rem" }} color='tertiary'>In a crisis?</Button>
                <Button
                  color="inherit"
                  onClick={() => signIn(undefined, { callbackUrl: "/profile" })}
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
};

export default NavBar;