'use client'
import { Container, Grid, Typography, Button } from "@mui/material";
import Link from '@mui/material/Link';
import "./hero.styles.css";
import React from "react";
import Image from "next/legacy/image";
import pic from '/public/static/images/indexMainHeading1.jpg'

interface HomeHeadingProps {

};

const HomeHeading: React.FC<HomeHeadingProps> = () => {

  return (
    <Container maxWidth="lg" sx={{ marginBottom: { xs: "100px" }, paddingTop: '10rem' }}>
      <Grid >
        <Grid
          item
          md={10}
          sm={12}
          xs={12}
        >

          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "38px", sm: "56px", md: "72px" } }}
          >
            Welcome to <strong>MindfulTrack</strong>, <br />
            here to help <strong>you </strong>
          </Typography>

          <Grid container spacing={2} sx={{pt: 4}}>
            <Grid item lg={5}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%', paddingTop: '2rem' }}>
                <Link href="/signup"><Button variant="contained" sx={{ width: '80%' }} color="secondary">Sign Up</Button></Link>
                <Typography variant="body1" sx={{ paddingRight: '5rem', pt: '2rem' }}>
                  Welcome to MindfulTrack, where we streamline your journey to mental wellness. 
                  Seamlessly managing waitlists and scheduling ensures efficient access to services. 
                  While you wait, explore and save resources tailored to your needs, 
                  empowering you with tools for self-care and learning. 
                  <br/><br/>Administrators gain invaluable insights through comprehensive stats, 
                  enhancing their understanding of organizational impact and aiding in targeted support. 
                  Join us on the path to holistic well-being.
                </Typography>
              </div>
            </Grid>
            <Grid item lg={7}>
              <div style={{ position: 'relative', width: '100%', height: '100%', paddingTop: '2rem' }}>
                <Image
                  src={"https://mindfultrack-files.s3.us-east-2.amazonaws.com/images/BYUCampus.jpg"}
                  style={{ borderRadius: '15px' }}
                  priority={true}
                  width={1280}
                  height={720}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeHeading;
