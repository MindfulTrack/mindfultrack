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
              <Grid item xs={12} sm={6}>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image
                    alt="jeremy"
                    src={"https://mindfultrack-files.s3.us-east-2.amazonaws.com/images/byuStudent.jpg"}
                    priority={true}
                    layout="fill" 
                    objectFit="cover"
                    style={{
                      borderRadius: '15px',
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} sx={{pl: '2rem'}}>
                <Typography
                  variant="h2"
                  color="text.tertiary"
                  sx={{
                    fontWeight: "400",
                    marginBottom: "40px",
                    textAlign: { xs: "center", md: "left" },
                    pl: 2
                  }}
                >
                  What can you expect on MindfulTrack?
                </Typography>
                <Typography variant="subtitle2" sx={{ marginBottom: "40px", pl: 2 }}>
                  <ul>
                    <li>Efficient waitlist and scheduling management</li>
                    <li>Access to curated resources for self-help and education while awaiting services</li>
                    <li>Detailed statistics and key insights for administrators to track organizational impact</li>
                    <li>Tailored support and empowerment on the journey to mental wellness</li>
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
