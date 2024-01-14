import * as React from 'react';
import { Box, Paper, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper 
        sx={{position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          p: 0,
          textAlign: 'center',
          backgroundColor: 'primary.main'
        }} 
        component='footer' 
        square
      >
        <Typography variant='h2' component="div" color="secondary.main" sx={{padding: 5}}>hello this is my foot</Typography>
      </Paper>
    </Box>
  );
}