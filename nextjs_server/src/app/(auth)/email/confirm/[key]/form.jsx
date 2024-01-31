import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ConfirmEmailForm({ params }) {
  const baseUrl = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_BASE_URL_PROD 
  : process.env.NEXT_PUBLIC_BASE_URL_DEV;

  const handleSubmit = async () => {
    
    const response = await fetch(baseUrl + "/api/auth/email-verify/", {
      method: 'POST',
      body: JSON.stringify({
        key: params.key,
      })
    });
    if(response.status == 200){
      console.log("EMAIL VERIFIED")
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
          Email Verification
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3 }}
            onClick={handleSubmit}
          >
            Verify Email
          </Button>
        </Box>
      </Box>

  )
}
