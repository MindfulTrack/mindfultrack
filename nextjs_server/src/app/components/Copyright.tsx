import React from 'react';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';

interface CopyrightProps {
  color: string
};

const Copyright: React.FC<CopyrightProps> = ({ color }) => {

    return (
      <Typography variant="body2" color={color} align="center" sx={{marginTop: '6rem'}}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          MindfulTrack
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  };

export default Copyright;

