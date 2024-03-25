"use client"
import * as React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Link, IconButton } from '@mui/material';
import { useSession } from "next-auth/react";
import Divider from '@mui/material/Divider';
import BYU_White from '/public/static/byuLogo/Monogram/PNG/BYU_White.png';
import Image from 'next/legacy/image';
import { useRouter } from 'next/navigation';
import { Home } from '@mui/icons-material';

interface NavBarProps {

};

const NavBar: React.FC<NavBarProps> = () => {

  const { data: session }: any = useSession();
  console.log(session)

  const router = useRouter();
  const handleGoHome = () => {
    router.push('/');
  }

  const redirectLink = () => {
    router.push('/resources');
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ justifyContent: 'space-between', height: '90px' }}>

            <div style={{ display: 'inline-flex' }}>
              <Typography variant="h2" component="div" sx={{ pr: "15px", cursor: 'pointer' }} onClick={handleGoHome}>MindfulTrack</Typography>

              <Divider orientation='vertical' flexItem sx={{ backgroundColor: "tertiary.main" }} />

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

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              {session !== null ? (
                <>
                  <IconButton sx={{ width: 'auto', height: '50px', cursor: 'pointer' }} onClick={redirectLink}>
                    <Home sx={{ fontSize: '33px', color: 'text.tertiary' }} />
                  </IconButton>
                  <Button color="inherit" sx={{ cursor: "pointer" }} onClick={redirectLink}>
                    {'Hello, ' + session.user?.first_name}
                  </Button>
                </>
              )
                : (<Button color="inherit" href='/signin'> Login</Button>)}

              <Button href='https://caps.byu.edu/for-students-in-crisis' target='_blank' variant='contained' sx={{ cursor: "pointer", marginLeft: "1rem" }} color='secondary'>In a crisis?</Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;