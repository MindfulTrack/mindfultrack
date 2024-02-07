'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ResourceCard from '../../../components/ResourceCard';
import { Paper, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';

interface WaitlistPageProps {

};

const WaitlistPage: React.FC<WaitlistPageProps> = () => {
  const [progress, setProgress] = useState(55);

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
            <Typography variant='h2' color='text.main' sx={{ textAlign: 'center' }}>
              Status
            </Typography>
            <Typography variant='h5' textAlign="center">Spot in line: 26</Typography>
            <br></br>
            <Typography variant='h4' textAlign="center">Estimated wait time: 3 weeks</Typography>
            <br></br>
            <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress
                size={200}
                thickness={10}
                variant='determinate'
                color='primary'
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
                  variant="h2"
                  component="div"
                  color="text.secondary"
                >{progress}%</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Right Side */}
        <Box sx={{ width: '100%', marginRight: 2 }}>
          <Paper sx={{ backgroundColor: "#e6e6e6", padding: 2, marginTop: 2, marginBottom: 2, marginRight: 2, flex: '100%', width: '100%', height: '70vh' }}>
            <Typography variant='h2' color='text.main' sx={{ textAlign: 'center' }}>
              Action
            </Typography>

            <Typography variant='body1' textAlign="center">Do you feel you do not need services anymore <br></br>or<br></br>have you received help elsewhere?</Typography>
            <br></br>
            <Box textAlign='center'>
              <Typography variant='caption' textAlign="center">If so, please exit the queue by clicking the button below</Typography>
            </Box>
            <br></br>
            <Box textAlign='center'>
              <Button variant='contained'>Exit Queue</Button>
            </Box>
          </Paper>
        </Box>
      </Box>




    </Box>

  );
};

export default WaitlistPage;