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
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel
} from "@mui/material"
import { DesktopDatePicker, DesktopDateTimePicker, DateTimePicker } from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import { Event } from "../../../ts/types";
import { Circle } from "@mui/icons-material";
import { News_Cycle } from "next/font/google";

interface AddEventModalProps {
  open: boolean;
  isNewEvent: boolean;
  handleClose: Function;
  selectedEvent: Event | undefined;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  open,
  handleClose,
  selectedEvent,
  isNewEvent 
}) => {

  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [allDayEvent, setAllDayEvent] = useState(false);
  const onClose = () => handleClose()
  const [eventStart, setEventStartTime] = useState<Dayjs | null>(null)
  const [eventEnd, setEventEndTime] = useState<Dayjs | null>(null)

  const handleAllDayEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllDayEvent(event.target.checked);
  };

  useEffect(() => {
    if (selectedEvent) {
      setEventTitle(selectedEvent?.title);
      setEventLocation(selectedEvent?.eventLocation || "");
      setAllDayEvent(selectedEvent.allDay);
      setEventStartTime(dayjs(selectedEvent.start));
      setEventEndTime(dayjs(selectedEvent.end));
    }
  }, [selectedEvent]);


  const handleSubmit = () => {
    const savedEvent = {
      id: (Math.random() * 1000).toString(),
      title: eventTitle,
      eventLocation: eventLocation,
      allDay: allDayEvent,
      start: eventStart,
      end: eventEnd,
      organizerId: Math.random() * 1000,
      backgroundColor: selectedColor
    };
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setEventTitle(newName);
  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocation = e.target.value;
    setEventLocation(newLocation);
  };
  
  const [selectedColor, setSelectedColor] = useState("1");
  const handleColorSelect = (event: SelectChangeEvent) => {
    console.log(event.target)
    setSelectedColor(event.target.value as string);
  }

  const eventColorPalette = [
    {id: 1, name: "Navy", value: "#002e5d" },
    {id: 2, name: "Emerald", value: "#2ecc71" },
    {id: 3, name: "Orange", value: "#f39c12" },
    {id: 4, name: "Ruby", value: "#e74c3c" },
    {id: 5, name: "Purple", value: "#9b59b6" },
    {id: 6, name: "Turquoise", value: "#1abc9c" },
    {id: 7, name: "Goldenrod", value: "#d35400" },
    {id: 8, name: "Crimson", value: "#dc143c" },
    {id: 9, name: "Indigo", value: "#4b0082" },
    {id: 10, name: "Teal", value: "#008080" }
  ];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ backgroundColor: 'tertiary.main' }}>
        <Box component="form" sx={{ width: '100%' }}>
          <Typography>{isNewEvent ? "Add New Event" : "Edit Event"}</Typography>
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
            // color="input"
            required
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
            // color="input"
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
                  value={eventStart}
                  onChange={(newStartTime) => setEventStartTime(newStartTime)}
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
                  value={eventEnd}
                  onChange={(newEndTime) => setEventEndTime(newEndTime)}
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
                  value={eventStart}
                  onChange={(newStartTime) => setEventStartTime(newStartTime)}
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
                <DateTimePicker
                  // label="End"
                  value={!isNewEvent ? eventEnd : eventStart?.add(1, 'hour')}
                  onChange={(newEndTime) => setEventEndTime(newEndTime)}
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
          <InputLabel id="color-selector" sx={{color: 'text.primary', mt: 1.5}}>Event Color</InputLabel>
          <Select 
            sx={{backgroundColor: "#FFFFFF", mt: 1, width: '70%', color: 'text.primary'}}
            labelId="color-selector"
            value={selectedColor}
            onChange={handleColorSelect}
            color="primary"
          >
            {eventColorPalette.map((color) => (
              <MenuItem value={color.id}><Box sx={{display: 'flex'}}><Circle sx={{color: color.value, pr: 1}}/>{color.name}</Box></MenuItem>
            ))}
          </Select>
        </Box>
      </DialogContent>

      <DialogActions sx={{ backgroundColor: 'tertiary.main' }}>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit} disabled={eventTitle.length == 0 ? true : false}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddEventModal