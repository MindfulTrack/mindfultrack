import * as React from 'react';
import { Box, Paper } from "@mui/material";
import Copyright from './Copyright';

interface FooterProps {

};

const Footer: React.FC<FooterProps> = () => {

  return (
    <Box sx={{ flexGrow: 1} }>
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
        <Copyright color="text.secondary" />
      </Paper>
    </Box>
  );
};

export default Footer;