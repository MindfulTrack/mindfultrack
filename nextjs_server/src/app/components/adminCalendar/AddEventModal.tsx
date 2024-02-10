'use client'
import React, { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react"
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Switch,
  Box,
  Grid,
  Typography
} from "@mui/material"
import { DesktopDatePicker, DesktopDateTimePicker, DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Event } from "../../../ts/types";

interface AddEventModalProps {
  open: boolean;
  handleClose: Function;
  selectedEvent: Event | undefined;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  open,
  handleClose,
  selectedEvent }) => {

  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [allDayEvent, setAllDayEvent] = useState(false);
  const onClose = () => handleClose()

  const handleAllDayEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllDayEvent(event.target.checked);
  };

  useEffect(() => {
    if (selectedEvent) {
      setEventTitle(selectedEvent?.title);
      setEventLocation(selectedEvent?.eventLocation || "");
      setAllDayEvent(selectedEvent.allDay);
    }
  }, [selectedEvent]);


  const handleSubmit = () => {
    console.log("Saved!");
  };


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setEventTitle(newName);
  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocation = e.target.value;
    setEventLocation(newLocation);
  };

  function roundToNearestHalfHour(date: Date) {
    const roundedDate = new Date(date);
    const minutes = roundedDate.getMinutes();
    const remainder = minutes % 30;
    
    // Round the minutes to the nearest half-hour
    if (remainder < 15) {
      roundedDate.setMinutes(minutes - remainder);
    } else {
      roundedDate.setMinutes(minutes + (30 - remainder));
    }
    
    // Reset seconds and milliseconds to zero
    roundedDate.setSeconds(0);
    roundedDate.setMilliseconds(0);
    
    return roundedDate;
  };
  
  const currentDate = new Date();
  const nearestHalfHourDefaultEvent = roundToNearestHalfHour(currentDate);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ backgroundColor: 'tertiary.main' }}>
        <Box component="form" sx={{ width: '100%' }}>
          <TextField
            name="description"
            value={eventTitle}
            margin="dense"
            id="description"
            label="Title"
            type="text"
            fullWidth
            variant="filled"
            onChange={handleTitleChange}
            focused
            color="input"
          />
          <TextField
            name="description"
            value={eventLocation}
            margin="dense"
            id="description"
            label="Location"
            type="text"
            fullWidth
            variant="filled"
            onChange={handleLocationChange}
            focused
            color="input"
          />
          <Box sx={{ mt: 1.5, mb: 1.5, display: 'flex' }}>
            <Switch color="primary" onChange={handleAllDayEvent} checked={allDayEvent} />
            <Typography variant='body1' color={'text.primary'}>All day</Typography>
          </Box>
          {allDayEvent ?
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <DesktopDatePicker
                  // label="Start Date"
                  // autoFocus={true}
                  defaultValue={ selectedEvent?.start ? dayjs(selectedEvent?.start) : dayjs(nearestHalfHourDefaultEvent)}
                  format="MMM D, YYYY"
                  slotProps={{
                    layout: {
                      sx: {
                        '.MuiDateCalendar-root': {
                          color: 'text.primary',
                          backgroundColor: '#ffffff'
                        },
                        '.MuiFormLabel-root': {
                          color: 'text.primary'
                        }
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <DesktopDatePicker
                  // label="End"
                  defaultValue={selectedEvent?.start ? dayjs(selectedEvent?.end) : dayjs(nearestHalfHourDefaultEvent)}
                  format="MMM D, YYYY"
                  slotProps={{
                    layout: {
                      sx: {
                        '.MuiDateCalendar-root': {
                          color: 'text.primary',
                          backgroundColor: '#ffffff'
                        }
                      }
                    }
                  }}
                />
              </Grid>
            </Grid>
            :
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <DateTimePicker
                  // label="Start"
                  // autoFocus={true}
                  defaultValue={selectedEvent?.start ? dayjs(selectedEvent?.start) : dayjs(nearestHalfHourDefaultEvent)}
                  format="MMM D, h:mm a"
                  slotProps={{
                    layout: {
                      sx: {
                        '.MuiDateCalendar-root': {
                          paddingTop: '10px',
                          color: 'text.primary',
                          backgroundColor: '#ffffff',
                          scrollbarWidth: 'none'
                        },
                        '.MuiPickersLayout-contentWrapper': {
                          backgroundColor: '#ffffff',
                          paddingTop: '10px',
                        },
                        '.MuiDialogActions-root': {
                          backgroundColor: '#ffffff'
                        },
                        '.MuiMultiSectionDigitalClockSection-root': {
                          scrollbarWidth: 'none'
                        },
                        '.MuiPickersYear-yearButton': {
                          scrollbarWidth: 'none',
                          color: '#141414'
                        }
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <DesktopDateTimePicker
                  // label="End"
                  defaultValue={selectedEvent?.title ? dayjs(selectedEvent?.end) : dayjs(nearestHalfHourDefaultEvent).add(1, 'hour')}
                  format="MMM D, h:mm a"
                  slotProps={{
                    layout: {
                      sx: {
                        '.MuiDateCalendar-root': {
                          paddingTop: '10px',
                          color: 'text.primary',
                          backgroundColor: '#ffffff',
                          scrollbarWidth: 'none'
                        },
                        '.MuiPickersLayout-contentWrapper': {
                          backgroundColor: '#ffffff',
                          paddingTop: '10px',
                        },
                        '.MuiDialogActions-root': {
                          backgroundColor: '#ffffff'
                        },
                        '.MuiMultiSectionDigitalClockSection-root': {
                          scrollbarWidth: 'none'
                        },
                        '.MuiPickersYear-yearButton': {
                          scrollbarWidth: 'none',
                          color: '#141414'
                        },
                        '.MuiButtonBase-root-MuiMenuItem-root-MuiMultiSectionDigitalClockSection-item.Mui-selected': {
                          borderRadius: '10px'
                        }
                      }
                    }
                  }}
                />
              </Grid>
            </Grid>
          }
        </Box>
      </DialogContent>

      <DialogActions sx={{ backgroundColor: 'tertiary.main' }}>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button color="success" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddEventModal