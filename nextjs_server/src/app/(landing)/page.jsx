import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Image from 'next/image';
import picture from '../static/images/test..jpg';
import { Box } from '@mui/material';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MindfulTrack
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
export default function LandingPage() {

  return (
      <Container maxWidth disableGutters>
        <CssBaseline />
        <Typography variant='h1' align='center'>Welcome to MindfulTrack!</Typography>
      </Container>
  );
}