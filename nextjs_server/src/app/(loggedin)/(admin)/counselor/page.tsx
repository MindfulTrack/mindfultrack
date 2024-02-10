import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { Paper } from '@mui/material';
import customFetch from '../../../api/fetchInterceptor';
import {errorCodes} from '../../../api/errorCodes';

interface CounselorPageProps {

};

const CounselorPage: React.FC<CounselorPageProps> = async () => {

  const response : any = await customFetch('base/testAuth')
  const data : any = await response.json();
  console.log(response)
  console.log(data)
  if (response.status !== 200) {
    const statusCode : any = errorCodes
    
    console.log(statusCode[response.status])
    return (
      <Alert variant="outlined" severity="error">
      {statusCode[response.status]}
    </Alert>)
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