'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ResourceCard from '../../../components/ResourceCard';
import { Container, Paper } from '@mui/material';
import timeSlots from '../../../mockData/timeSlots.json';
import dayOfWeek from '../../../mockData/dayOfWeek.json';
import eventSlots from '../../../mockData/availableTimeSlots.json';
import { useState, useEffect, useRef} from 'react';

interface StudentAvailabilityPageProps {

};

type TimeSlots = {
  isSelected: boolean;
  timeSlotID: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}


const StudentAvailabilityPage: React.FC<StudentAvailabilityPageProps> = () => {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlots[]>(timeSlots as TimeSlots[]);

  const personId = 104;

  useEffect(() => {
    const joinedArray = eventSlots
      .filter(person => person.personID === personId)
      .map(item1 => ({
        ...item1,
        ...timeSlots.find(item2 => item2.timeSlotID === item1.timeSlotID)
      }));

    const InitializeSlots = () => {
      const numRows = joinedArray.length;
      if (joinedArray.length > 0) {

        const updatedSlots = selectedTimeSlots.map(slot => {
          for (let i = 0; i < numRows; i++) {
            if (slot.timeSlotID === joinedArray[i].timeSlotID) {
              return { ...slot, isSelected: true };
            }
          }
          return slot;
        });
  
        setSelectedTimeSlots(updatedSlots as TimeSlots[]);
      }
    };

    InitializeSlots();
  }, []);

  const handleTimeSelect = (timeSlotId: number, dayOfWeek: string) => {
    const updatedSlots = selectedTimeSlots.map(slot => {
      if (slot.timeSlotID === timeSlotId && slot.dayOfWeek === dayOfWeek) {
        return { ...slot, isSelected: !slot.isSelected };
      }
      return slot;
    });

    setSelectedTimeSlots(updatedSlots);

  }

  const dayTimeSlots = timeSlots;
  const weekDays = dayOfWeek;
  return (
    <Box>
      <Box>
        <Paper sx={{ backgroundColor: "#c5c5c5", height: "2rem", marginBottom: 2 }}>
          <Typography variant='body1' color="text.main" sx={{ textAlign: "left", pl: '1rem' }}>Select the times that you would be available for an appointment during <strong>this semester.</strong></Typography>
        </Paper>
      </Box>

      <Container component={'div'} maxWidth="md" style={{ display: 'flex', justifyContent: 'space-evenly', paddingTop: '2rem' }}>
        {weekDays.map((day) => (
          <Box key={day.dayOfWeekID} style={{ alignContent: 'center' }}>
            <Typography variant='h3' textAlign={'center'} color={'primary'} sx={{ paddingBottom: '1rem' }}>{day.dayOfWeek}</Typography>

            {selectedTimeSlots.filter((time) => time.dayOfWeek === day.dayOfWeek).map((time) => (
              <Box
                component='div'
                key={time.timeSlotID}
                sx={{ border: 'solid', borderWidth: '1px', borderRadius: '4px', margin: '3px', width: '125px', height: '25px', cursor: 'pointer', backgroundColor: time.isSelected ? '#10a170' : '' }}
                onClick={() => handleTimeSelect(time.timeSlotID, time.dayOfWeek)}>
                <Typography textAlign={'center'} sx={{ fontSize: '12px', fontWeight: '700' }}>{new Date(`2022-01-01T${time.startTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default StudentAvailabilityPage;