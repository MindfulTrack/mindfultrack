import * as React from 'react';
import Box from '@mui/material/Box';
import AdminCalendar from '../../../components/adminCalendar/AdminCalendar';

interface AdminSchedulePageProps {

};

const AdminSchedulePage: React.FC<AdminSchedulePageProps> = () => {
  return (
    <Box>
      <AdminCalendar />
    </Box>
  );
};

export default AdminSchedulePage;


