import SignUpForm from "./form";
import Copyright from '@/components/Copyright'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';



export default async function SignUp() {

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <SignUpForm/>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}