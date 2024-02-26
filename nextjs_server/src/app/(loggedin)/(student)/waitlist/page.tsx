'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper, Button, CircularProgress, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import customFetch from '../../../api/fetchInterceptor';
import Alert from '@mui/material/Alert';
import CircularProgressWithLabel from '@mui/material/CircularProgress'

interface WaitlistPageProps {

};

const WaitlistPage: React.FC<WaitlistPageProps> = () => {
  const [progress, setProgress] = useState(0);
  const [spotInLine, setSpotInLine] = useState(2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const queueResponse = await customFetch('base/studentQueue');
        setLoading(false);
        const positionPercentage = Math.round((queueResponse.length - spotInLine) / queueResponse.length * 100);
        setProgress(positionPercentage);
      } catch (error : any) {
        setError(error.message);
      }
    };

    fetchQueue();
    
  }, []);
  if (error) {
    return <Alert variant="outlined" severity="error">{error}</Alert>;
  }
  else if (loading) {

    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress /> <div>Loading...</div>
      </Box>
  }
  else{
    
  return (
    <Box>
      {/* Heading */}
      <Box>
        <Paper sx={{ backgroundColor: "#e6e6e6", padding: 2, margin: 2, flex: '100%' }}>
          <Typography variant='h2' color='text.main' sx={{ textAlign: 'left' }}>
            Current Waitlist Status
          </Typography>
        </Paper>
      </Box>

      {/* Main Body */}
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* Left Side */}
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ backgroundColor: "#e6e6e6", padding: 2, marginTop: 2, marginBottom: 2, marginLeft: 2, marginRight: 2, flex: '100%', width: '95%', height: '70vh' }}>
            <Typography variant='h1' color='text.main' sx={{ textAlign: 'center' }}>
              Position
            </Typography>
            <Grid container spacing={2} sx={{ padding: 1 }}>
              <Grid item lg={6} sx={{ marginTop: '7%' }}>

                <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', verticalAlign: 'middle' }}>
                  <CircularProgress
                    size={350}
                    thickness={10}
                    variant='determinate'
                    color='success'
                    value={progress}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="h1"
                      component="div"
                      color="text.primary"
                    >{progress}%</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={6} sx={{ marginTop: '7%' }}>
                <Typography variant='h2'>Estimated Time Remaining:</Typography>
                <Typography sx={{ fontSize: '40px' }}>2 weeks</Typography>

                <Typography variant='h2' sx={{ paddingTop: '2rem' }}>Number of people in front of you:</Typography>
                <Typography sx={{ fontSize: '40px' }}>{spotInLine}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Right Side */}
        <Box sx={{ width: '100%', marginRight: 2 }}>
          <Paper sx={{ backgroundColor: "#e6e6e6", padding: 2, marginTop: 2, marginBottom: 2, marginRight: 2, flex: '100%', width: '100%', height: '70vh' }}>
            <Typography variant='h1' color='text.main' sx={{ textAlign: 'center' }}>
              Action
            </Typography>

            <Box sx={{paddingTop: 1, marginTop: '7%', paddingLeft: '2rem'}}>
              <Typography variant='h2' textAlign="left" paragraph>Do you feel like you do not need services anymore or have you received help elsewhere?</Typography>
              <Typography variant='body1' textAlign='left' sx={{fontSize: '24px'}} paragraph>If so, you can help other peers jump forward in line by manually exiting the waitlist.</Typography>
              <Typography variant='body1' textAlign='left' sx={{fontSize: '24px'}} paragraph>Please click the button below if you would like to remove yourself from the waitlist.</Typography>

              <Box textAlign='center'>
                <Button variant='contained' sx={{width: '250px'}} color='info'>Exit Queue</Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>




    </Box>

  );
  }
};

export default WaitlistPage;