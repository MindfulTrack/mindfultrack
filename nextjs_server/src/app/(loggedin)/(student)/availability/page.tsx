'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ResourceCard from '../../../components/ResourceCard';
import { Container, Paper, Button, Link, CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';

import timeSlots from '../../../mockData/timeSlots.json';
import dayOfWeek from '../../../mockData/dayOfWeek.json';
// import eventSlots from '../../../mockData/availableTimeSlots.json';
import customFetch from '../../../api/fetchInterceptor';
import { AvailableTimeSlotViewModel } from '../../../../ts/types';
import { useState, useEffect, FormEvent } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Save, Done } from '@mui/icons-material';
import MyContext from '../../../MyContext';
import {useSession} from "next-auth/react";


interface StudentAvailabilityPageProps {

};

const Input = styled(MuiInput)`
  width: 42px;
`;

type TimeSlots = {
  isSelected: boolean;
  timeSlotID: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}


const StudentAvailabilityPage: React.FC<StudentAvailabilityPageProps> = () => {
  // ONBOARDING START
  const [open, setOpenOnboarding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] : any = useState(null);
  const [success, setSuccess] : any = useState(null);
  const [successQueue, setSuccessQueue] : any = useState(null);
  const [univerisityOptions, setUniverisityOptions] : any = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const {data: session, update} : any = useSession({required: true});
  const [age, setAge] = React.useState(22);

  const handleAgeSliderChange = (event: Event, newValue: number | number[]) => {
    setAge(newValue as number);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleAgeBlur = () => {
    if (age < 0) {
      setAge(0);
    } else if (age > 100) {
      setAge(100);
    }
  };
  
  const handleCloseOnboarding = () => {
    setOpenOnboarding(false);
  };

  useEffect(() => {
    if(!session.user.inQueue && session.user.groups[0] === 'Student' && !session.user.personObject){
      const fetchUniversities = async () => {
        try {
          const universities = await customFetch('base/universities');
          setUniverisityOptions(universities)
          setLoading(false);
        } catch (error : any) {
          console.log(error)
          setError(error.message);
        }
      }
      fetchUniversities();
      setOpenOnboarding(true);
    }
    else if(!session.user.inQueue && session.user.groups[0] === 'Student'){
      setSuccess('Please add your availbility')

    }
  }, [session.user.inQueue, session.user.groups]);

  async function onSubmitOnboarding(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
      try {
        const formData = new FormData(event.currentTarget);
        const plainFormData = Object.fromEntries(formData.entries());
	      const formDataJsonString = JSON.stringify(plainFormData);
        const saveDemographics = await customFetch('base/person/', 'POST', formDataJsonString);
        // Update the session (without reloading the page)
        await update({ personObject: { 'save':'saved' }});

        setSuccess('Response saved! Please add your availbility')
        handleCloseOnboarding();
      } catch (error : any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
  }
  
  // ONBOARDING END

  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlots[]>([]);
  const [originalSelection, setOriginalSelection] = useState<TimeSlots[]>([]);
  const [reset, setReset] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [eventSlots, setEventSlots] = useState<AvailableTimeSlotViewModel[]>([]);
  const [filteredSlots, setfilteredSlots] = useState<AvailableTimeSlotViewModel[]>([]);
  const { userId } = React.useContext(MyContext)!;


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
    let filteredTimeSlots = selectedTimeSlots.filter(slot => slot.isSelected === true);

    console.log('filteredTimeSlots');
    console.log(filteredTimeSlots);

    console.log('filteredSlots');
    console.log(filteredSlots);
  
    // Slots in filteredTimeSlots but not in filteredSlots
    let slotsToAdd = filteredTimeSlots.filter(slot => 
      !filteredSlots.some(filteredSlot => filteredSlot.timeSlot === slot.timeSlotID)
    );

    console.log('slotsToAdd');
    console.log(slotsToAdd);
  
    // Slots in filteredSlots but not in filteredTimeSlots
    let slotsToDelete = filteredSlots.filter(slot => 
      !filteredTimeSlots.some(filteredSlot => filteredSlot.timeSlotID === slot.timeSlot)
    );

    console.log('slotsToDelete');
    console.log(slotsToDelete);
  
    // Add new slots
    slotsToAdd.forEach(async (slot) => {
      const response = await customFetch(
        'base/studentAvailability/',
        'POST',
        {
          dayOfWeek: slot.dayOfWeek,
          person: userId,
          timeSlot: slot.timeSlotID,
        },
      );
    });
  
    // Delete old slots
    slotsToDelete.forEach(async (slot) => {
      const response = await customFetch(
        'base/studentAvailability/' + slot.id + '/',
        'DELETE',
      );
    });

    setSaving(true);
    setOriginalSelection(selectedTimeSlots);
    setTimeout(() => {
      setSaving(false);
      setSuccessful(true);
      setTimeout(() => {
        setSuccessful(false);
        if(!session.user.inQueue){
          if(confirm("Availability set! Join the Queue?")){
              const response = customFetch(
                'base/studentQueue/',
                'POST',
              );
               // Update the inner value
              session.user.set_availbility = true;
              session.user.inQueue = true;

              // Call the update method to refresh the session
              update(session.user);
              
              setSuccessQueue('Success! You have joined the Queue!')
              console.log("HERE END OF SESSION")
              console.log(session.user)
          }
        }
      }, 2000);
    }, 3000);
  }

  if (error) {
    return <Alert variant="outlined" severity="error">{error}</Alert>;
  }
  // else if(success) {
  //   return <Alert variant="outlined" severity="success">{success}</Alert>;
  // }
  else if (loading) {

    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress /> <div>Loading...</div>
      </Box>
  }
  else{
  
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>

        {/* Top of page */}
        {success ? <Alert variant="outlined" severity="success">{success}</Alert> : ''}
        {successQueue ? <Alert variant="filled" severity="success">{successQueue}</Alert> : ''}
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

        <Dialog
          open={open}
          PaperProps={{
            component: 'form',
            
            onSubmit:onSubmitOnboarding
          }}
        >
          <DialogTitle>Welcome!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To join the queue we need a few more details. Please fill out the form below.
            </DialogContentText>
            {/* <input name="person" value={session.user.id} hidden/> */}
            <TextField
              autoFocus
              id="university-select"
              name="university"
              sx={{marginTop: '3%'}} 
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              select
              label="University"
              fullWidth
              required
            >
              {univerisityOptions.map((option : any) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              margin="dense"
              id="college"
              name="college"
              label="University College"
              sx={{marginTop: '3%'}} 
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              required
              margin="dense"
              id="major"
              name="major"
              label="University Major"
              sx={{marginTop: '3%'}} 
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              id="school_year"
              name="year_in_school"
              sx={{marginTop: '3%'}} 
              select
              label="Year in School"
              fullWidth
              required
            >
                <MenuItem value={1}>
                  Freshman
                </MenuItem>
                <MenuItem value={2}>
                  Sophmore
                </MenuItem>
                <MenuItem value={3}>
                  Junior
                </MenuItem>
                <MenuItem value={4}>
                  Senior
                </MenuItem>
                <MenuItem value={5}>
                  Graduate
                </MenuItem>
            </TextField>
            <Typography id="input-slider" gutterBottom sx={{marginTop: '3%'}} >
              Age
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid xs={8}>
                <Slider
                  value={typeof age === 'number' ? age : 0}
                  onChange={handleAgeSliderChange}
                  aria-labelledby="input-slider"
                />
              </Grid>
              <Grid xs={4}>
                <Input
                  name="age"
                  value={age}
                  size="small"
                  onChange={handleAgeChange}
                  onBlur={handleAgeBlur}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
            <FormControl sx={{marginTop: '3%'}}>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="F"
                name="gender"
                row
              >
                <FormControlLabel value="F" control={<Radio />} label="Female" />
                <FormControlLabel value="M" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>

          </DialogContent>
          <DialogActions>
            <Button type="submit">Continue</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
};

export default StudentAvailabilityPage;