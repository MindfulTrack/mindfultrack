import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

interface AdminSchedulePageProps {

};

const AdminSchedulePage: React.FC<AdminSchedulePageProps> = () => {
  return (
    <Box>
      <div>
        <Paper sx={{backgroundColor: "tertiary.main", height: "4rem", marginBottom: 2}}>
            <Typography variant='h4' color="text.tertiary" sx={{textAlign: "left", paddingLeft: "15px", verticalAlign: 'middle'}}>SCHEDULE</Typography>
        </Paper>
      </div>
    </Box>
  );
};

export default AdminSchedulePage;