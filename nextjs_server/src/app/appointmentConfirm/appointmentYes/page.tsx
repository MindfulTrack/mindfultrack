'use client'

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Alert, AlertTitle, Typography, Button, Divider } from "@mui/material";
import Image from "next/legacy/image";
import Link from '@mui/material/Link';

interface AppointmentYesProps {
};

const AppointmentYes: React.FC<AppointmentYesProps> = () => {

  return (
      <Container maxWidth="lg" sx={{ marginBottom: { xs: "100px" }, paddingTop: '10rem' }}>
      <Grid >
        <Grid
          item
          md={10}
          sm={12}
          xs={12}
        >

          <Alert>
            <AlertTitle>Appointment Accepted! We look forward to seeing you!</AlertTitle>
            For more details about your visit please login
            <Link href="/login"><Button variant="contained" sx={{width: '40%'}} color="secondary">Login</Button></Link>
          </Alert>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppointmentYes;