'use client'

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ConfirmEmailForm from "./form";
import Copyright from '../../../../components/Copyright';
import exp from 'constants';

interface ConfirmEmailPageProps {
  params: any
};

const ConfirmEmailPage: React.FC<ConfirmEmailPageProps> = ({params}) => {
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
       
        <ConfirmEmailForm params={params}/>
        <Copyright color='primary' />
      </Container>
  );
};

export default ConfirmEmailPage;