import * as React from 'react';
import { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SignInForm from "./form";
import Copyright from '../../../components/Copyright';

interface SignInErrorPageProps {
  props: ReactNode
};

const SignInErrorPage: React.FC<SignInErrorPageProps> = ({props}) => {
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
       
        <SignInForm params={props}/>
        <Copyright color='primary'/>
      </Container>
  );
};

export default SignInErrorPage;