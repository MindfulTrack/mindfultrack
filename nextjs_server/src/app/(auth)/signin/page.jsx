import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SignInForm from "./form";
import Copyright from '@/components/Copyright'

// TODO remove, this demo shouldn't need to reset the theme.
export default function SignIn() {
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
       
        <SignInForm/>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}