import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MediaCard from '../../components/MediaCard';
import { Paper } from '@mui/material';
import mockResources from './mock-resources.json';

export default function ResourcesPage() {
  const mockData = mockResources;

  return (
    <Box>
      <div>
        <Paper sx={{backgroundColor: "tertiary.main", height: "4rem", marginBottom: 2}}>
            <Typography variant='h4' color="text.tertiary" sx={{textAlign: "left", paddingLeft: "15px", paddingTop: "10px"}}>Resources</Typography>
        </Paper>

        <Grid container rowSpacing={3} columnSpacing={3} flexDirection="row">
          {mockData.resources.map((resource) => {
            return (
            <Grid xs={3} key={resource.id}>
              <MediaCard
                category={resource.category}
                image={resource.image}
                description={resource.description}
                id={resource.id}
                // text="Follow the link for quick read articles and other resources to learn about mental health and the brain."
              />
            </Grid>
            )
          })}
        </Grid>
      </div>
    </Box>
  );
}