import * as React from 'react';
import { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SignInForm from "./form";
import Copyright from '../../../components/Copyright';

interface SignInErrorPageProps {
  params: React.ReactNode;
};

const SignInErrorPage: React.FC<SignInErrorPageProps> = ({params}) => {
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
       
        <SignInForm params={params}/>
        <Copyright color='primary'/>
      </Container>
  );
};

export default SignInErrorPage;