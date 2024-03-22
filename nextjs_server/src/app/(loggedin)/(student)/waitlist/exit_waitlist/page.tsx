'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper, Button, CircularProgress, Grid } from '@mui/material';
import { useState, FormEvent, useEffect } from 'react';
import customFetch from '../../../../api/fetchInterceptor';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {useSession} from "next-auth/react";

interface WaitlistPageProps {

};

const WaitlistExitPage: React.FC<WaitlistPageProps> = async () => {
  const [leaveOptions, setLeaveOptions] : any = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] : any = useState(null);
  const [success, setSuccess] : any = useState(null);
  const {data: session, update} : any = useSession({required: true});

  useEffect(() => {
    const fetchLeaveReason = async () => {
      try {
        const leaveReasons = await customFetch('base/queueLeaveReason');
        console.log(leaveReasons)
        setLeaveOptions(leaveReasons)
        setLoading(false);
      } catch (error : any) {
        setError(error.message);
      }
    };

    fetchLeaveReason();
    
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    if (window.confirm('Are you sure you want to exit the queue?')) {

      try {
        const formData = new FormData(event.currentTarget);
        const plainFormData = Object.fromEntries(formData.entries());
	      const formDataJsonString = JSON.stringify(plainFormData);
        const removeFromQueue = await customFetch('base/leaveQueue/', 'POST', formDataJsonString);
        setSuccess('Waitlist Exited')
        const updateSessions = async () => {
  
          // Call the update method to refresh the session
          await update();
        };

        setTimeout(() => {
          setLoading(true)
          // Call the update method to refresh the session
          updateSessions();

        }, 3000)
      } catch (error : any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }
  
  if (error) {
    return <Alert variant="outlined" severity="error">{error}</Alert>;
  }
  else if(success) {
    return <Alert variant="outlined" severity="success">{success}</Alert>;
  }
  else if (loading) {

    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress /> <div>Loading...</div>
      </Box>
  }
  else{
    
  return (
    <Box>
      {/* Heading */}
      <Box>
        <Paper sx={{ backgroundColor: "#e6e6e6", padding: 2, margin: 2, flex: '100%' }}>
          <Typography variant='h2' color='text.main' sx={{ textAlign: 'left' }}>
            Exit Wait List
          </Typography>
        </Paper>
      </Box>

      {/* Main Body */}
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* Right Side */}
        <Box sx={{ width: '100%', marginRight: 2, marginLeft: 2}}>
          <Paper sx={{ backgroundColor: "#e6e6e6", padding: 2, marginTop: 2, marginBottom: 2, marginRight: 2, flex: '100%', width: '100%', height: '70vh' }}>
            <Typography variant='h2' color='text.main' sx={{ textAlign: 'center' }}>
              Reason for leaving?
            </Typography>

            <Box sx={{paddingTop: 1, marginTop: '3%'}}>
              <Box
                component="form"
                autoComplete="off"
                onSubmit={onSubmit}
              >
                <TextField
                    id="leave-waitlist-select"
                    name="reasonLeavingId"
                    autoFocus
                    select
                    label="Reason for leaving"
                    fullWidth
                    required
                  >
                    {leaveOptions.map((option : any) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.leaveReason}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField 
                  id="reasonLeavingText"
                  name="reasonLeavingText"
                  label="Feedback"
                  sx={{marginTop: '3%'}} 
                  multiline
                  rows={4}
                  placeholder="Any feedback or additional comments?"
                  fullWidth
                />
                <Box sx={{marginTop: '3%'}} textAlign='center'>
                  <Button variant='contained' sx={{width: '250px'}} color='info' type="submit">Exit Queue</Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
  }
};

export default WaitlistExitPage;