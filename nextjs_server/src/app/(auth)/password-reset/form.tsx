import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface PasswordResetFormProps {

};

const PasswordResetForm: React.FC<PasswordResetFormProps> = () => {

  const handleSubmit = async (event: any) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const response = await fetch("api/auth/password-reset-request/", {
      method: 'POST',
      body: JSON.stringify({
        email: data.get('email'),
      })
    });
    if(response.status == 200){
      console.log("EMAIL SENT")
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
        {/* const defaultTheme = createTheme(); */}
        <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3 }}
          >
            Send Reset Email
          </Button>
        </Box>
      </Box>
    )
  };

  export default PasswordResetForm;
  