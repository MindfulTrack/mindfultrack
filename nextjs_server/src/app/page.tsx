'use client'

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Image from "next/legacy/image";
import mountains from './static/images/headingMountain.JPG';
import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

interface LandingPageProps {
};

const LandingPage: React.FC<LandingPageProps> = () => {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'tertiary.main',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Container disableGutters maxWidth={false}
      sx={{
        mt: 0,
        mb: 14,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <CssBaseline />
      <Image
        src='https://picsum.photos/id/147/2000/1700'
        style={{ objectFit: 'contain', objectPosition: 'top center' }}
        priority={true}
        width={2000}
        height={1300}
      >
      </Image>

      <Container sx={{ position: 'absolute', textAlign: 'center', zIndex: 1 }} disableGutters>
        <Typography variant='h1' align='center' sx={{ pt: '7rem' }} fontWeight={700}>Welcome to MindfulTrack!</Typography>
      </Container>

      <Container sx={{ pt: '2rem' }}>
        <Typography variant='h3'>Provo | Written by ChatGPT</Typography>
        <br /><Typography variant='body1'>In the heart of Provo, UT, a city characterized by its scenic beauty and a vibrant tech community, the tapestry of daily life unfolds against the backdrop of the majestic Wasatch Range. This thriving locale, with its mix of innovation and natural splendor, captures the essence of a modern-day utopia. The seamless integration of cutting-edge technology and the tranquility of the surroundings create a unique synergy that defines the spirit of this community. As the sun sets behind the rugged peaks, casting a warm glow over the streets, the pulse of the city is felt in the endeavors of its diverse inhabitants. From bustling software engineering hubs to serene pockets where contemplation takes center stage, the spectrum of experiences mirrors the complexity of the human journey.</Typography>
        <br /><Typography variant='body1'>Within this dynamic tapestry, individuals navigate their roles, each contributing a thread to the narrative of Provo's collective identity. Whether it's the software engineers, immersed in the intricate dance of algorithms and codes, or the artists finding inspiration in the interplay of light and shadow on canvas, every pursuit adds a layer to the rich mosaic of creativity. The city's energy is palpable in the air, where aspirations soar as high as the mountain peaks that cradle Provo.</Typography>
        <br /><Typography variant='body1'>The cultural tapestry extends beyond professional pursuits, weaving into the very fabric of daily interactions. From the vibrant farmers' markets that spring to life on weekends, offering a kaleidoscope of colors and flavors, to the quiet corners where individuals seek solace in literature or shared moments of connection, Provo thrives on its diverse expressions. The unity in this diversity is evident in the unspoken understanding that each person, like a brushstroke on a canvas, contributes to the collective masterpiece that is Provo, UT.</Typography>
        <br /><Typography variant='body1'>In this symphony of life, communication emerges as the invisible thread that binds the community together. It's not merely the exchange of words but the nuanced dance of ideas, emotions, and shared experiences that define the art of connection. Whether through the eloquence of a well-crafted speech, the emotive power of a shared story, or the silent language of a shared glance, Provo's inhabitants engage in a constant dialogue that transcends the boundaries of individuality.</Typography>
        <Typography variant='body1'>As night falls and the city lights twinkle like stars against the dark canvas of the Wasatch Range, Provo's essence lingers in the spaces between the spoken and unspoken, the known and unknown. It's a city where the pursuit of excellence in both technical and human endeavors intertwines, creating a narrative that resonates far beyond its geographical borders. The vibrant symphony of Provo continues to evolve, with each passing moment adding new notes to the melody of a community that thrives on the harmonious interplay of innovation, nature, and the timeless art of communication.</Typography>
      </Container>
    </Container>
  );
};

export default LandingPage;