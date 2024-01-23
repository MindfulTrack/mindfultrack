import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ResourceCard from '../../../components/ResourceCard';
import { Paper } from '@mui/material';

interface StudentAvailabilityPageProps {

};

const StudentAvailabilityPage: React.FC<StudentAvailabilityPageProps> = () => {
  return (
    <Box>
      <div>
        <Paper sx={{backgroundColor: "tertiary.main", height: "4rem", marginBottom: 2}}>
            <Typography variant='h4' color="text.tertiary" sx={{textAlign: "left", paddingLeft: "15px", verticalAlign: 'middle'}}>WAITLIST</Typography>
        </Paper>
      </div>
    </Box>
  );
};

export default StudentAvailabilityPage;