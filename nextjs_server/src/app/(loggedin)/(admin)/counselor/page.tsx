import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

interface CounselorPageProps {

};

const CounselorPage: React.FC<CounselorPageProps> = () => {
  return (
    <Box>
      <div>
        <Paper sx={{backgroundColor: "secondary.main", height: "4rem", marginBottom: 2}}>
            <Typography variant='h4' color="text.tertiary" sx={{textAlign: "left", paddingLeft: "15px", verticalAlign: 'middle'}}>COUNSELOR PAGE</Typography>
        </Paper>
      </div>
    </Box>
  );
};

export default CounselorPage;