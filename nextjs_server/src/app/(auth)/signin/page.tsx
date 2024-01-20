import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SignInForm from "./form";
import Copyright from '../../components/Copyright';

interface SignInPageProps {

};

const SignInPage: React.FC<SignInPageProps> = () => {
  return (
      <Container component="main" maxWidth="xs" sx={{pt: '4rem'}}>
        <CssBaseline />
       
        <SignInForm/>
        <Copyright color='primary' />
      </Container>
  );
};

export default SignInPage;