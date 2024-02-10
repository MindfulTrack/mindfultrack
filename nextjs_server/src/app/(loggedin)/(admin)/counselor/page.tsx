import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import customFetch from '../../../api/fetchInterceptor';

interface CounselorPageProps {

};

const CounselorPage: React.FC<CounselorPageProps> = async () => {

  const data : any = await customFetch('base/studentQueue/4')
  console.log(data.json())
  const student = await Promise.all([data,])
  if (!data) {
   
    return ("No Data Found")
  }
  else{
    return (
      <Box>
          <Paper sx={{ backgroundColor: "#e6e6e6", padding: 2, marginTop: 2, marginBottom: 2, flex: '100%' }}>
            <Typography variant='h2' color='text.main' sx={{ textAlign: 'left' }}>
              Counselor Page {student.id}
            </Typography>
          </Paper>
        </Box>
    );
  }
};

export default CounselorPage;