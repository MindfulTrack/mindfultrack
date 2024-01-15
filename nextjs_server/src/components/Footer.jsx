import * as React from 'react';
import { Box, Paper, Typography, Link } from "@mui/material";

function Copyright(props) {
  return (
    <Typography variant="body2" color='text.tertiary' align="center" {...props} sx={{pt: '2rem'}}>
      {'Copyright © '}
      <Link color="inherit" href="https://byu.edu">
        MindfulTrack
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper 
        sx={{position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: 'center',
          backgroundColor: 'primary.main',
          height: '5rem',
          flexShrink: 0
        }} 
        component='footer' 
        square
      >
        <Copyright />
      </Paper>
    </Box>
  );
}