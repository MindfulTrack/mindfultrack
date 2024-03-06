'use client'
import { Container, Grid, CardMedia, Typography, Button } from "@mui/material";
import phoneImg from "../../assets/image-hero-landscape@2x.png";
import Link from '@mui/material/Link';
import "./hero.styles.css";
import React from "react";
import Image from "next/legacy/image";
import pic from '/public/static/images/indexMainHeading1.jpg'

interface HomeHeadingProps {

};

const HomeHeading: React.FC<HomeHeadingProps> = () => {

  const myPhone: string = phoneImg.src.toString()
  console.log(myPhone, phoneImg)

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

          <div className="hero-p" style={{ display: 'flex', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>

            <Link href="/signup"><Button variant="contained" sx={{width: '80%'}} color="secondary">Sign Up</Button></Link>

            <Typography variant="body1" sx={{paddingRight: '5rem'}}>
              MindfulTrack will help you find and use
              resources while we do the rest.
              We will track your place in line and
              notify you when it is your turn to receive your school's services.
            </Typography>
            </div>
            <Image src={pic} style={{ borderRadius: '15px' }} priority />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeHeading;
