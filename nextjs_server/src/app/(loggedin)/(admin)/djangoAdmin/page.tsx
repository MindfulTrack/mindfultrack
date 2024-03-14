'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper, Button, CircularProgress, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import customFetch from '../../../api/fetchInterceptor';
import Alert from '@mui/material/Alert';
import {useSession} from "next-auth/react";
import Link from 'next/link';


interface AdminDjangoPageProps {

};

const AdminDjangoPage: React.FC<AdminDjangoPageProps> = async () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_BASE;

  return (
      <Box display="inline-block" width="100%" height="600px" overflow="hidden" borderRadius="10px" style={{marginTop: "14px", marginBottom:"50px"}}>
        <iframe
          src={backendUrl+"admin"}
          title="Django Admin"
          width="100%"
          height="100%"
          frameBorder="0"
        />
      </Box>
  );
};

export default AdminDjangoPage;