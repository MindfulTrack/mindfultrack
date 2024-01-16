'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
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
import { useRouter } from 'next/navigation';

export default function SignInForm({providers}) {
  // const router = useRouter();
  console.log(providers)
  const handleLoginWithGoogle = () => {
    signIn('google', {callbackUrl: "/profile",}) // Replace 'google' with the ID of your provider
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const signedIn = signIn("credentials", {callbackUrl: "/profile", username: data.get('email'), password: data.get('password') })
    // if(!signedIn.error){
    // }
    // const response = await fetch("api/auth/signup", {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email: data.get('email'),
    //     password: data.get('password'),
    //     password2: data.get('password2'),
    //     first_name: data.get('firstName'),
    //     last_name: data.get('lastName'),
    //   })
    // });
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    // console.log({response})
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
        {/* const defaultTheme = createTheme(); */}
        <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
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
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLoginWithGoogle}>Log in with Google</Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
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
}