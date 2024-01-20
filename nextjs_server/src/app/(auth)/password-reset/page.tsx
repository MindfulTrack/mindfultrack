'use client'

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import PasswordResetForm from "./form";
import Copyright from '../../components/Copyright';

interface PasswordResetPageProps {

};

const PasswordResetPage: React.FC<PasswordResetPageProps> = () => {
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
       
        <PasswordResetForm/>
        <Copyright color='primary' />
      </Container>
  );
}