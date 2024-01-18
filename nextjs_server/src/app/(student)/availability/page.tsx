import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MediaCard from '@/app/components/MediaCard.jsx';
import { Paper } from '@mui/material';

export default function ResourcesPage() {
  return (
    <Box>
      <div>
        <Paper sx={{backgroundColor: "tertiary.main", height: "4rem", marginBottom: 2}}>
            <Typography variant='h4' color="text.tertiary" sx={{textAlign: "left", paddingLeft: "15px", verticalAlign: 'middle'}}>WAITLIST</Typography>
        </Paper>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid xs={4}>
            <MediaCard
              category="CMYK"
              description="The CMYK color model (also known as process color, or four color) is a subtractive color model, based on the CMY color model, used in color printing, and is also used to describe the printing process itself."
              image={""}
              id={""}
            />
          </Grid>
          <Grid xs={4}>
            <MediaCard
              category="HSL and HSV"
              description="HSL (for hue, saturation, lightness) and HSV (for hue, saturation, value; also known as HSB, for hue, saturation, brightness) are alternative representations of the RGB color model, designed in the 1970s by computer graphics researchers."
              image={""}
              id={""}
            />
          </Grid>
          <Grid xs={4}>
            <MediaCard
              category="RGB"
              description="An RGB color space is any additive color space based on the RGB color model. RGB color spaces are commonly found describing the input signal to display devices such as television screens and computer monitors."
              image={""}
              id={""}
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}