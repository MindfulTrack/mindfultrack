'use client'

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Alert, AlertTitle, Typography, Button, Divider } from "@mui/material";
import Image from "next/legacy/image";
import Link from '@mui/material/Link';

interface AppointmentNoProps {
};

const AppointmentNo: React.FC<AppointmentNoProps> = () => {

  return (
      <Container maxWidth="lg" sx={{ marginBottom: { xs: "100px" }, paddingTop: '10rem' }}>
      <Grid >
        <Grid
          item
          md={10}
          sm={12}
          xs={12}
        >

          <Alert severity='warning'>
            <AlertTitle>Appointment Declined</AlertTitle>
            We will reach out with other availbility times as soon as they become available.
          </Alert>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppointmentNo;