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
import { useRouter } from 'next/navigation';
import Divider from '@mui/material/Divider';

interface SignUpFormProps {

};

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const router = useRouter();
  
  //Error Alert
  let error = "PASSWORDS DO NOT MATCH";
  const [open, setOpen] = React.useState(false);

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (event: any) => {
    console.log("NORMAL AUTH")

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(data.get('password') === data.get('password2')){
    const response = await fetch("api/auth/signup", {
      method: 'POST',
      body: JSON.stringify({
        email: data.get('email'),
        username: data.get('email'),
        password: data.get('password'),
        password2: data.get('password2'),
        first_name: data.get('firstName'),
        last_name: data.get('lastName'),
      })
    });

    if(response.status === 200){
      router.push("/");
    }
    console.log(response)
    }
    else{
      setOpen(true);
    }
  };

  const handleLoginWithGoogle = () => {
    console.log("GOOGLE AUTH")
    signIn('google', {callbackUrl: "/profile",})
  };

  return (
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        {open ? <Alert severity="error" onClose={() => handleClose}>
        {error}
        </Alert> : null}
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Divider></Divider>
          {/* GOOGLE SIGN IN */}
          <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLoginWithGoogle}>Log in with Google</Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link onClick={() => signIn(undefined, {callbackUrl: "/profile"})} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
  );
};

export default SignUpForm;