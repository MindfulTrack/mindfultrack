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
  params: any
 
};


const SignUpForm: React.FC<SignUpFormProps> = ({params}) => {
  const router = useRouter();
  
  //Error Alert
  let error = String(decodeURIComponent(params.error))
  // let passwordError = "PASSWORDS DO NOT MATCH";
  const [open, setOpen] = React.useState(true);
  const [openVerify, setOpenVerify] = React.useState(true);

  // const handleClose = (event: any, reason: string) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpen(false);
  // };

  // const handleCloseVerify = (event: any, reason: string) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpenVerify(false);
  // };

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
      }).then((response) => {
        if(response.status === 200){
          // router.push("/");
          setOpenVerify(true)
          setOpen(false)
        }
        return response.json();
      })
      .then((data) => {
        let error = '';
        const holder: holder = data.error;
        interface holder {
          [key: string]: any
        }
        if(holder){
          try{
            for (const [key, value] of Object.entries(holder)) {
              
              console.log(value)
              value.forEach((element: any) => {
                console.log(element)
                error += element + ' '
              });
            }
          }
          catch{
            error = "Account created but email verification may not have sent."
          }
          router.push("/signup/"+error);
        }
      });
    
    }
    else{
      error = 'Passwords must match';
      setOpen(true);
    }
  }

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
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {open ? <Alert severity="error" onClose={() => setOpen(false)}>
        {error}
        </Alert> : null}
        { openVerify ? <Alert severity="success" onClose={() => setOpenVerify(false)}>
        Email Verification Sent!
        </Alert> : null}

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
                control={<Checkbox value="allowTextNofifications" color="primary" />}
                label="I want to receive text notifications"
              />
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
                <div className="" style={{cursor: 'pointer'}}>
                Already have an account? Sign in
                </div>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
  );
};

export default SignUpForm;