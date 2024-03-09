'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ResourceCard from '../../../components/ResourceCard';
import { Container, Paper, Button, Link } from '@mui/material';
import timeSlots from '../../../mockData/timeSlots.json';
import dayOfWeek from '../../../mockData/dayOfWeek.json';
// import eventSlots from '../../../mockData/availableTimeSlots.json';
import customFetch from '../../../api/fetchInterceptor';
import { AvailableTimeSlotViewModel } from '../../../../ts/types';
import { useState, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Save, Done } from '@mui/icons-material';
import MyContext from '../../../MyContext';


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
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlots[]>([]);
  const [originalSelection, setOriginalSelection] = useState<TimeSlots[]>([]);
  const [reset, setReset] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [eventSlots, setEventSlots] = useState<AvailableTimeSlotViewModel[]>([]);
  const [filteredSlots, setfilteredSlots] = useState<AvailableTimeSlotViewModel[]>([]);
  const { userId } = React.useContext(MyContext)!;
  const personId = 8;


  useEffect(() => {

    const fetchEventSlots = async () => {
      try {
        const eventSlots = await customFetch('base/studentAvailability');
        console.log('eventSlots');
        console.log(eventSlots);

        //Filter eventSlots by personID
        const filteredSlots = eventSlots
        .filter((slot: { person: number; }) => slot.person === userId);

        setEventSlots(eventSlots);
        setfilteredSlots(filteredSlots);
        console.log('userId');
        console.log(userId);

        console.log('filteredSlots');
        console.log(filteredSlots);

        //Change static file to isSelected = True where slotID == slotID in eventSlots
        if (filteredSlots.length > 0) {
          timeSlots.forEach(slot => {
            for (let i = 0; i < filteredSlots.length; i++) {
              if (slot.timeSlotID === filteredSlots[i].timeSlot) {
                slot.isSelected = true;
              }
            }
          });
        }
  
        setSelectedTimeSlots(timeSlots);
        console.log('timeSlots');
        console.log(timeSlots);

        InitializeSlots();

      } catch (error) {
        console.error(error)
      }
    };

    //Combine Availability
    const joinedArray = filteredSlots
      .map(item1 => ({
        ...item1,
        ...timeSlots.find(item2 => item2.timeSlotID === item1.timeSlot)
      }));

    //Display Availability
    const InitializeSlots = () => {
      if (!reset) {
        if (joinedArray.length > 0) {
          const updatedSlots = selectedTimeSlots.map(slot => {
            for (let i = 0; i < joinedArray.length; i++) {
              if (slot.timeSlotID === joinedArray[i].timeSlotID) {
                return { ...slot, isSelected: true };
              }
            }
            return slot;
          });

          setSelectedTimeSlots(updatedSlots as TimeSlots[]);
          setOriginalSelection(updatedSlots);
          setReset(false);
        }
      } else {
        setSelectedTimeSlots(originalSelection);
        setReset(false);
      }
    };

    //Call CustomFetch to post Availability for each selected time slot
    fetchEventSlots();
    
  }, [reset]);

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

  const semester = () => {
    if (new Date().getMonth() <= 4) {
      return 'Winter';
    } else if (new Date().getMonth() >= 5 && new Date().getMonth() <= 6) {
      return 'Spring';
    } else if (new Date().getMonth() >= 7 && new Date().getMonth() <= 8) {
      return 'Summer';
    } else {
      return 'Fall';
    }
  };

  const handleCancel = () => {
    setReset(true);
  }

  const handleClick = () => {
    setSaving(true);
    setOriginalSelection(selectedTimeSlots);
    setTimeout(() => {
      setSaving(false);
      setSuccessful(true);
      setTimeout(() => {
        setSuccessful(false);
      }, 2000);
    }, 3000);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>

      {/* Top of page */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', height: 'fit-content' }}>
        <Paper sx={{ backgroundColor: "#e6e6e6", padding: 2, margin: 2, flex: '100%', mr: 7 }}>
          <Typography variant='h2' color='text.main' sx={{ textAlign: 'center' }}>
            Current Semester: {semester()} {new Date().getFullYear()}
          </Typography>
        </Paper>

        <Paper sx={{ backgroundColor: "#e6e6e6", margin: 2, flex: '100%', maxWidth: '400px', height: 'fit-content' }}>
          <Box sx={{ textAlign: 'left', padding: '15px' }}>
            <LoadingButton
              loading={saving}
              loadingPosition="start"
              startIcon={successful ? <Done /> : <Save />}
              variant="contained"
              sx={{ width: '50%', backgroundColor: successful ? '#006141' : '#0062b8', fontSize: '18px', fontWeight: '500', '&:hover': {backgroundColor: '#0062b8'} }}
              onClick={handleClick}
            >
              {successful ? 'Success' : 'Save'}
            </LoadingButton>
            <Button sx={{ width: '50%', color: '#0062b8' }} onClick={handleCancel}>Cancel</Button>
          </Box>
        </Paper>
      </Box>

      {/* Bottom of page */}
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: 'fit-content' }}>
        <Box component={'div'} style={{ display: 'flex', justifyContent: 'space-evenly', paddingTop: '2rem', width: '100%', height: '100%' }}>
          {weekDays.map((day) => (
            <Box key={day.dayOfWeekID} style={{ alignContent: 'center' }}>
              <Typography variant='h3' textAlign={'center'} color={'primary'} sx={{ paddingBottom: '1rem' }}>{day.dayOfWeek}</Typography>

              {selectedTimeSlots.filter((time) => time.dayOfWeek === day.dayOfWeek).map((time) => (
                <Box
                  component='div'
                  key={time.timeSlotID}
                  sx={{ border: 'solid', borderWidth: '1px', borderRadius: '4px', margin: '3px', width: '125px', height: '25px', cursor: 'pointer', backgroundColor: time.isSelected ? '#10a170' : '' }}
                  onClick={() => handleTimeSelect(time.timeSlotID, time.dayOfWeek)}>
                  <Typography textAlign={'center'} sx={{ fontSize: '12px', fontWeight: '700', color: time.isSelected ? 'text.main' : '' }}>{new Date(`2022-01-01T${time.startTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>

        <Paper sx={{ backgroundColor: "#e6e6e6", padding: 2, margin: 2, flex: '100%', maxWidth: '400px', height: '100%' }}>
          <Typography variant='body1' color="text.main" sx={{ textAlign: "left", p: '1rem' }}>Select the times that you would generally be available for an appointment during <strong>this semester.</strong></Typography>
          <Typography variant='body1' color="text.main" sx={{ textAlign: "left", p: '1rem' }}>We will do our best to match your availability with a counselor as quickly as we can.</Typography>
          <Typography variant='body1' color="text.main" sx={{ textAlign: "left", p: '1rem' }}>Remember, while you are waiting we have a great list of <Link href='/resources' color={'text.primary'}>resources</Link> for you. Please check them out!</Typography>
          <Typography variant='body1' fontStyle='italic' color="text.main" sx={{ textAlign: "left", p: '1rem' }}>If, while you are waiting for services, you no longer feel the need to meet with a counselor, please click the following link to exit the queue.</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
            <Link href="waitlist/exit_waitlist"><Button variant='contained' sx={{width: '250px'}} color='info'>Exit Queue</Button></Link>
          </Box>
        </Paper>

      </Box>
    </Box>
  );
};

export default StudentAvailabilityPage;