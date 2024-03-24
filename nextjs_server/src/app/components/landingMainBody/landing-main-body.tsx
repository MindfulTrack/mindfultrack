'use client'
import { Grid, Card, Container, Typography, List, ListItemText } from "@mui/material";
import happyStudents from '/public/static/images/happyStudents.jpg';
import "./jeremy.styles.css";
import React from "react";
import Image from "next/legacy/image";
import Copyright from "../Copyright";

interface LandingMainBodyProps {

}

const LandingMainBody: React.FC<LandingMainBodyProps> = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Card sx={{backgroundColor: 'primary.main'}}>
          <Grid
            container
            // justifyContent="center"
            // alignItems="center"
            rowSpacing={4}
            spacing={2}
            sx={{
              padding: {
                xs: "50px 16px",
                sm: "50px 58px",
                md: "50px 35px 50px 35px",
              },
              zIndex: 3,
            }}
          >
              <Grid item xs={12} sm={6} sx={{}}>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image
                    alt="jeremy"
                    src={happyStudents}
                    priority={true}
                    layout="fill" 
                    objectFit="cover"
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    // width={600}
                    // height={150}
                    style={{
                      borderRadius: '15px',
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h2"
                  color="text.tertiary"
                  sx={{
                    fontWeight: "400",
                    marginBottom: "40px",
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  What can MindfulTrack <br /> do for <strong>you?</strong>
                </Typography>
                <Typography variant="subtitle1" sx={{ marginBottom: "40px" }}>
                  <ul>
                    <li>Expore cool resources chosen by your university</li>
                    <li>Expore cool resources chosen by your university</li>
                    <li>Expore cool resources chosen by your university</li>
                    <li>Expore cool resources chosen by your university</li>
                  </ul>
                </Typography>
              </Grid>
          </Grid>
        </Card>
        <Copyright color="primary" />
      </Container>
    </>
  );
};

export default LandingMainBody;
