'use client'

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import PasswordResetForm from "./form";
import Copyright from '../../../../../components/Copyright';

interface PasswordResetConfirmPageProps {
  params: any
};

const PasswordResetConfirmPage: React.FC<PasswordResetConfirmPageProps> = ({params}) => {
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
       
        <PasswordResetForm params={params}/>
        <Copyright color='primary' />
      </Container>
  );
};

export default PasswordResetConfirmPage;