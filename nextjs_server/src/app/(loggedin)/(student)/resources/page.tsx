'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ResourceCard from '../../../components/ResourceCard';
import { Paper } from '@mui/material';
import mockResources from './mock-resources.json';
import customFetch from '../../../api/fetchInterceptor';
import { ResourceViewModel } from '../../../../ts/types';
import { useState, useEffect } from 'react';

interface ResourcesMainPageProps {

};


const ResourcesMainPage: React.FC<ResourcesMainPageProps> = () => {

  const mockData = mockResources;
  const [resources, setResources] = useState<ResourceViewModel[]>([])
  
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const resources = await customFetch('base/resourceCategory');
        setResources(resources);
      } catch (error) {
        console.error(error)
      }
    };

    fetchResources();
  }, []);


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
          {resources.map((item) => {
            return (
              <Grid xs={3} key={item.id}>
                <ResourceCard
                  name={item.name}
                  id={item.id}
                  image={"https://picsum.photos/id/147/2000/1700"}
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