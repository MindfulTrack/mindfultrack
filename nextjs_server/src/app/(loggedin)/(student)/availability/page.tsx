'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ResourceCard from '../../../components/ResourceCard';
import { Container, Paper } from '@mui/material';
import timeSlots from '../../../mockData/timeSlots.json';
import dayOfWeek from '../../../mockData/dayOfWeek.json';
import { useState } from 'react';

interface StudentAvailabilityPageProps {

};


const StudentAvailabilityPage: React.FC<StudentAvailabilityPageProps> = () => {
  const [selectedTime, setSelectedTime] = useState(false);
  
  const handleTimeSelect = (id: number) => {
    setSelectedTime(!selectedTime)
  }

  const dayTimeSlots = timeSlots;
  const weekDays = dayOfWeek;
  return (
    <Box>
      <Box>
        <Paper sx={{ backgroundColor: "#c5c5c5", height: "2rem", marginBottom: 2 }}>
          <Typography variant='body1' color="text.main" sx={{ textAlign: "center" }}>Select the times that you would be available for an appointment during <strong>this semester.</strong></Typography>
        </Paper>
      </Box>

      <Box component={'div'} style={{display: 'flex', justifyContent: 'space-evenly', paddingTop: '2rem'}}>
        {weekDays.map((day) => (
          <Box key={day.dayOfWeek} style={{alignContent: 'center'}}>
            <Typography variant='h2' textAlign={'center'} color={'primary'} sx={{paddingBottom: '1rem'}}>{day.dayOfWeek}</Typography>

            {dayTimeSlots.map((time) => (
              <Box key={time.startTime} sx={{border: 'solid', borderWidth: '1px', borderRadius: '4px', margin: '3px', width: '150px', cursor: 'pointer', backgroundColor: selectedTime ? '#e0ffe5' : ''}} onClick={() => handleTimeSelect(time.timeSlotID)}>
                <Typography textAlign={'center'}>{time.startTime}</Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StudentAvailabilityPage;