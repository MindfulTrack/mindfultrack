import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

interface CounselorPageProps {

};

const CounselorPage: React.FC<CounselorPageProps> = () => {
  return (
    <Box>
        <Paper sx={{ backgroundColor: "#e6e6e6", padding: 2, marginTop: 2, marginBottom: 2, flex: '100%' }}>
          <Typography variant='h2' color='text.main' sx={{ textAlign: 'left' }}>
            Counselor Page
          </Typography>
        </Paper>
      </Box>
  );
};

export default CounselorPage;