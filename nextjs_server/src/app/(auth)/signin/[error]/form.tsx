'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {signIn} from "next-auth/react";
import Divider from '@mui/material/Divider';

interface SignInErrorFormProps {
  params: any
};

const SignInErrorForm: React.FC<SignInErrorFormProps> = ({params}) => {
  // Error and Error Alert
  const error = String(decodeURIComponent(params.error))
  const [open, setOpen] = React.useState(true);

  // const handleClose = (event: any, reason: any) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpen(false);
  // };
  
  // const router = useRouter();
  const handleLoginWithGoogle = () => {
    signIn('google', {callbackUrl: "/resources",}) // Replace 'google' with the ID of your provider
  }
  
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = signIn("credentials", { username: data.get('username'), password: data.get('password'), callbackUrl: "/resources"}).then((result) => {
      if (result?.error) {
        // Handle the error
        console.log(result.error);
      }
    }); // callbackUrl: "/resources"
  };
  
  return (
    <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {error === 'E-mail is not verified.' ? <Alert severity="error" action={<Button href="/email">
              Resend Email Verification?
          </Button>}>
          {error}
        </Alert> : open ? <Alert severity="error" onClose={() => setOpen(false)}>
        {error}
        </Alert> : null
        }
        
        <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email/Username"
            name="username"
            type="text"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3 }}
          >
            Sign In
          </Button>
          <Divider></Divider>
          {/* GOOGLE SIGN IN */}
          <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLoginWithGoogle}>Log in with Google</Button>
          <Grid container>
            <Grid item xs>
              <Link href="/password-reset" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
  );
};

export default SignInErrorForm;