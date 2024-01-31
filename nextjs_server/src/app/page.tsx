'use client'

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import HomeHeading from './components/homeheading/homeheading';
import LandingMainBody from './components/landingMainBody/landing-main-body';
// import Footer from './components/Footer';

interface LandingPageProps {
};

const LandingPage: React.FC<LandingPageProps> = () => {

  return (
    <Container disableGutters maxWidth={false}
      sx={{
        mt: 0,
        mb: 14,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <CssBaseline />
      <HomeHeading />
      <LandingMainBody />
      {/* <Footer /> */}
    </Container>
  );
};

export default LandingPage;