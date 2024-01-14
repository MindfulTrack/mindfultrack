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
import MediaCard from '@/components/MediaCard';
import Skeleton from '@mui/material/Skeleton';
import { useRouter } from 'next/navigation';
import {signIn, useSession} from "next-auth/react";

export default function HomePage() {
  const router = useRouter();
  const {data: session, status} = useSession();

  if (status == "loading") {
    return <Box><Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
            </Box>
  }

  // If the user is authenticated redirect to `/profile`
  if (session) {
    router.push("profile");
    return;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <div>
        <Alert severity="info" sx={{ mt: 2, mb: 5 }}>
          <AlertTitle>Hello 👋</AlertTitle>
          This app uses the Next.js App Router and Material UI v5.
        </Alert>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid xs={6}>
            <MediaCard
              heading="CMYK"
              text="The CMYK color model (also known as process color, or four color) is a subtractive color model, based on the CMY color model, used in color printing, and is also used to describe the printing process itself."
            />
          </Grid>
          <Grid xs={6}>
            <MediaCard
              heading="HSL and HSV"
              text="HSL (for hue, saturation, lightness) and HSV (for hue, saturation, value; also known as HSB, for hue, saturation, brightness) are alternative representations of the RGB color model, designed in the 1970s by computer graphics researchers."
            />
          </Grid>
          <Grid xs={6}>
            <MediaCard
              heading="RGB"
              text="An RGB color space is any additive color space based on the RGB color model. RGB color spaces are commonly found describing the input signal to display devices such as television screens and computer monitors."
            />
          </Grid>
          <Grid xs={6}>
            <MediaCard
              heading="CIELAB"
              text="The CIELAB color space, also referred to as L*a*b*, was intended as a perceptually uniform space, where a given numerical change corresponds to a similar perceived change in color."
            />
          </Grid>
        </Grid>
      </div>
      <Drawer
        sx={{
          width: 320,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 320,
            boxSizing: 'border-box',
            top: ['48px', '56px', '64px'],
            height: 'auto',
            bottom: 0,
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <List sx={{ px: 2 }}>
          <ListItem disablePadding>
            <Typography variant="overline" sx={{ fontWeight: 500 }}>
              On this page
            </Typography>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}