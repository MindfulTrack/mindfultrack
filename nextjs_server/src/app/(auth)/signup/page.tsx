import React from "react";
import SignUpForm from "./form";
import Copyright from '../../components/Copyright';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

interface SignUpPageProps {

};

const SignUpPage: React.FC<SignUpPageProps> = () => {

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <SignUpForm/>
      <Copyright color="primary" />
    </Container>
  );
};

export default SignUpPage;