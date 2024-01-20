import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ResourceCard from '../../components/ResourceCard';
import { Paper } from '@mui/material';

interface StudentAvailabilityPageProps {

};

const StudentAvailabilityPage: React.FC<StudentAvailabilityPageProps> = () => {
  return (
    <Box>
      <div>
        <Paper sx={{backgroundColor: "tertiary.main", height: "4rem", marginBottom: 2}}>
            <Typography variant='h4' color="text.tertiary" sx={{textAlign: "left", paddingLeft: "15px", verticalAlign: 'middle'}}>WAITLIST</Typography>
        </Paper>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid xs={4}>
            <ResourceCard
              category="CMYK"
              description="The CMYK color model (also known as process color, or four color) is a subtractive color model, based on the CMY color model, used in color printing, and is also used to describe the printing process itself."
              image={""}
              id={1}
            />
          </Grid>
          <Grid xs={4}>
            <ResourceCard
              category="HSL and HSV"
              description="HSL (for hue, saturation, lightness) and HSV (for hue, saturation, value; also known as HSB, for hue, saturation, brightness) are alternative representations of the RGB color model, designed in the 1970s by computer graphics researchers."
              image={""}
              id={2}
            />
          </Grid>
          <Grid xs={4}>
            <ResourceCard
              category="RGB"
              description="An RGB color space is any additive color space based on the RGB color model. RGB color spaces are commonly found describing the input signal to display devices such as television screens and computer monitors."
              image={""}
              id={3}
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default StudentAvailabilityPage;