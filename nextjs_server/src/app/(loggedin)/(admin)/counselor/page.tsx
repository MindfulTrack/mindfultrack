import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import customFetch from '../../../api/fetchInterceptor';

interface CounselorPageProps {

};

const CounselorPage: React.FC<CounselorPageProps> = async () => {

  const response : any = await customFetch('base/testAuth')
  const data : any = await response.json();

  console.log(data)
  if (!data || data.length === 0) {
   
    return ("No Data Found")
  }
  else{
    return (
      <Box>
          <Paper sx={{ backgroundColor: "#e6e6e6", padding: 2, marginTop: 2, marginBottom: 2, flex: '100%' }}>
            <Typography variant='h2' color='text.main' sx={{ textAlign: 'left' }}>
              Counselor Page
            </Typography>
          </Paper>
          {data.map((item : any )=> (
        <div key={item.id}>
          <h2>{item.dayOfWeek}</h2>
        </div>
        ))}
        </Box>
    );
  }
};

export default CounselorPage;