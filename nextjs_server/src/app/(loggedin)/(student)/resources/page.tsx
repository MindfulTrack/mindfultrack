'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ResourceCard from '../../../components/ResourceCard';
import { Paper } from '@mui/material';
import customFetch from '../../../api/fetchInterceptor';
import { ResourceViewModel } from '../../../../ts/types';
import {useSession} from "next-auth/react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
interface ResourcesMainPageProps {

};


const ResourcesMainPage: React.FC<ResourcesMainPageProps> = () => {
  const {data: session, status} : any = useSession({required: true});
  const router = useRouter();

  if(!session.user.inQueue){
    router.push("/availability")
  }

  const [resources, setResources] = useState<ResourceViewModel[]>([])
  
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const resources = await customFetch('base/resourceCategory');
        const sortedResources = resources.sort((a: any, b: any) => a.id - b.id);
        setResources(sortedResources);
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
                  image={item.image}
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