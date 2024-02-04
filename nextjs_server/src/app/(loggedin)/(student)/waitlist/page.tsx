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
import { Paper, Button } from '@mui/material';

interface WaitlistPageProps {

};

const WaitlistPage: React.FC<WaitlistPageProps> = () => {
  return (
    <Box>
      <div>
        <Paper sx={{backgroundColor: "secondary.main", height: "4rem", marginBottom: 2}}>
            <Typography variant='h2' color="text.tertiary" sx={{textAlign: "center", verticalAlign: 'middle'}}>WAITLIST</Typography>
        </Paper>
      </div>

      <Typography variant='h5' textAlign="center">Spot in line: 26</Typography>
      <br></br>
      <Typography variant='h4' textAlign="center">Estimated wait time: 3 weeks</Typography>
      <br></br>
      <Typography variant='body1' textAlign="center">Do you feel you do not need services anymore <br></br>or<br></br>have you received help elsewhere?</Typography>
      <br></br>
      <Box textAlign='center'>
        <Typography variant='caption' textAlign="center">If so, please exit the queue by clicking the button below</Typography>
      </Box>      
      <br></br>
      <Box textAlign='center'>
        <Button variant='contained'>Exit Queue</Button>
      </Box>
      

    </Box>
    
  );
};

export default WaitlistPage;