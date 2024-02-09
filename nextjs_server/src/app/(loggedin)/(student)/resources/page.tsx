import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ResourceCard from '../../../components/ResourceCard';
import { Paper } from '@mui/material';
import mockResources from './mock-resources.json';

interface ResourcesMainPageProps {

};

const ResourcesMainPage: React.FC<ResourcesMainPageProps> = () => {
  const mockData = mockResources;

  return (
    <Box component={"main"}>
      <div>
      <Box>
        <Paper sx={{ backgroundColor: "#e6e6e6", padding: 2, marginTop: 2, marginBottom: 2, flex: '100%' }}>
          <Typography variant='h2' color='text.main' sx={{ textAlign: 'left' }}>
            Resources
          </Typography>
        </Paper>
      </Box>

        <Grid container rowSpacing={3} columnSpacing={3} flexDirection="row">
          {mockData.resources.map((resource) => {
            return (
              <Grid xs={3} key={resource.id}>
                <ResourceCard
                  name={resource.name}
                  id={resource.id}
                  image={resource.image}
                />
              </Grid>
            )
          })}
        </Grid>
      </div>
    </Box>
  );
};

export default ResourcesMainPage;