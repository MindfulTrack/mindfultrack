import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ResourceCard from '../../../components/ResourceCard';
import { Container } from '@mui/material';
import mockResources from './mock-resources.json';

interface ResourcesMainPageProps {

};

const ResourcesMainPage: React.FC<ResourcesMainPageProps> = () => {
  const mockData = mockResources;

  return (
    <Box component={"main"}>
      <div>
        <Container sx={{ marginBottom: 2, marginLeft: 0 }} disableGutters>
          <Typography variant='h3' color="text.primary" fontWeight={'700'} sx={{ textAlign: "left" }}>Resources</Typography>
        </Container>

        <Grid container rowSpacing={3} columnSpacing={3} flexDirection="row">
          {mockData.resources.map((resource) => {
            return (
              <Grid xs={3} key={resource.id}>
                <ResourceCard
                  name={resource.name}
                  id={resource.id}
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