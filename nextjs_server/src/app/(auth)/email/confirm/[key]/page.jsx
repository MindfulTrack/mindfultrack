'use client'

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ConfirmEmailForm from "./form";
import Copyright from '@/app/components/Copyright'

// TODO remove, this demo shouldn't need to reset the theme.
export default function ConfirmEmail({params}) {
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
       
        <ConfirmEmailForm params={params}/>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}