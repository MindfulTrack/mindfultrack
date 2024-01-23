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
import { Paper } from '@mui/material';

interface WaitlistPageProps {

};

const WaitlistPage: React.FC<WaitlistPageProps> = () => {
  return (
    <Box>
      <div>
        <Paper sx={{backgroundColor: "tertiary.main", height: "4rem", marginBottom: 2}}>
            <Typography variant='h4' color="text.tertiary" sx={{textAlign: "left", paddingLeft: "15px", verticalAlign: 'middle'}}>WAITLIST</Typography>
        </Paper>
      </div>
    </Box>
  );
};

export default WaitlistPage;