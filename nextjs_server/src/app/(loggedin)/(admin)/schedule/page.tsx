import * as React from 'react';
import Box from '@mui/material/Box';
import AdminCalendar from '../../../components/adminCalendar/AdminCalendar';
import { Paper, Typography } from '@mui/material';

interface AdminSchedulePageProps {

};

const AdminSchedulePage: React.FC<AdminSchedulePageProps> = () => {
  return (
    <Box>
      <Box>
        <Paper sx={{ backgroundColor: "#e6e6e6", padding: 2, marginTop: 2, marginBottom: 2, flex: '100%' }}>
          <Typography variant='h2' color='text.main' sx={{ textAlign: 'left' }}>
            Calendar
          </Typography>
        </Paper>
      </Box>
      <AdminCalendar />
    </Box>
  );
};

export default AdminSchedulePage;


