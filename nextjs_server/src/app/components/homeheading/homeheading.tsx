'use client'
import { Container, Grid, CardMedia, Typography, SvgIcon } from "@mui/material";
import phoneImg from "../../assets/image-hero-landscape@2x.png";
// import { ReactComponent as Curve } from "../../assets/pattern-curved-line-1.svg";
import ButtonPrimary from "../buttons/button-primary.component";
import "./hero.styles.css";
import heroImage from "../../assets/image-hero-portrait@2x.png";
import React from "react";
import Image from "next/legacy/image";
// import pic from '/static/images/indexMainHeading.jpg'

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
            <Typography variant="body1" sx={{paddingRight: '5rem'}}>
              MindfulTrack will help you find and use
              resources while we do the rest.
              We will track your place in line and
              notify you when it is your turn to receive your school's services.
            </Typography>
            <ButtonPrimary/>
            </div>
            <Image src={'/static/images/indexMainHeading.jpg'} style={{ borderRadius: '15px' }} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeHeading;
