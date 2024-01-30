import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import AdminCalendar from '../../../components/adminCalendar/AdminCalendar';

interface AdminSchedulePageProps {

};

const AdminSchedulePage: React.FC<AdminSchedulePageProps> = () => {
  return (
    <Box>
      {/* <div>
        <Paper sx={{backgroundColor: "secondary.main", height: "4rem", marginBottom: 2}}>
            <Typography variant='h4' color="text.tertiary" sx={{textAlign: "left", paddingLeft: "15px", verticalAlign: 'middle'}}>SCHEDULE</Typography>
        </Paper>
      </div> */}

      <AdminCalendar />

      {/* <div>
        <iframe
          src="https://calendar.google.com/calendar/embed?height=900&wkst=1&bgcolor=%23ffffff&ctz=America%2FDenver&showTitle=0&showPrint=0&src=bWluZGZ1bHRyYWNrLmNhcHN0b25lQGdtYWlsLmNvbQ&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043"
          width="1600"
          height="800"
          frameBorder={0}
          scrolling="no">

        </iframe>
      </div> */}
    </Box>
  );
};

export default AdminSchedulePage;


