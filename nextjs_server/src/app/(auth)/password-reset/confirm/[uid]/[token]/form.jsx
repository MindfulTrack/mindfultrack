import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function PasswordResetForm({params}) {
  const baseUrl = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_BASE_URL_PROD 
  : process.env.NEXT_PUBLIC_BASE_URL_DEV;

  // const router = useRouter();

  const handleSubmit = async (event) => {
    const [open, setOpen] = useState(false);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const response = await fetch(baseUrl+"/api/auth/password-reset/", {
      method: 'POST',
      body: JSON.stringify({
        uid: params.uid,
        token: params.token,
        password: data.get('password'),
        password2: data.get('password2'),
      })
    });
    if(response.status == 200){
      setOpen(true)

      console.log("password reset")
    }
    console.log(response)
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
        <Typography component="h1" variant="h5">
          Password Reset
        </Typography>
        { open ? <Alert severity="success" onClose={() => setOpen(false)}>
        Password Reset!
        </Alert> : null}
        {/* const defaultTheme = createTheme(); */}
        <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
          <TextField
            required
            fullWidth
            name="password2"
            label="Confirm Password"
            type="password"
            id="password2"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3 }}
          >
            Reset
          </Button>
        </Box>
      </Box>
    )
  }
  