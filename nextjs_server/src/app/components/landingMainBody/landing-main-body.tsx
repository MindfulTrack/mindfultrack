'use client'
import { Grid, Card, Container, Typography, List, ListItemText } from "@mui/material";
// import happyStudents from '/static/images/happyStudents.jpg';
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
        <Card>
          <Grid
            // container
            justifyContent="center"
            alignItems="center"
            rowSpacing={4}
            sx={{
              padding: {
                xs: "50px 16px",
                sm: "50px 58px",
                md: "50px 35px 50px 35px",
              },

              zIndex: 3,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '10px' }}>
              <Image
                alt="jeremy"
                src={'/statis/images/happyStudnets.jpg'}
                priority={true}
                width={600}
                height={150}
                style={{
                  borderRadius: '15px',
                }}
              />

              <Grid item xs={12} md={5} sx={{ paddingLeft: '40px' }}>
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
            </div>
          </Grid>
        </Card>
        <Copyright color="primary" />
      </Container>
    </>
  );
};

export default LandingMainBody;
