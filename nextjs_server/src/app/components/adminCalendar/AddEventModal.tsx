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
import dayjs, { Dayjs } from "dayjs";
import { Event } from "../../../ts/types";
import { Circle } from "@mui/icons-material";
import { eventColorPalette } from "../../../ts/types";

interface AddEventModalProps {
  open: boolean;
  isNewEvent: boolean;
  handleClose: Function;
  selectedEvent: Event | undefined;
  handleEventsUpdate: Function;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  open,
  handleClose,
  selectedEvent,
  isNewEvent,
  handleEventsUpdate
}) => {

  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [allDayEvent, setAllDayEvent] = useState(false);
  const onClose = () => handleClose();
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
      setEventEndTime(dayjs(selectedEvent.end))
      const backgroundColor = eventColorPalette
        .filter((eventColor) => eventColor.value === selectedEvent.backgroundColor);
      setSelectedColor(backgroundColor[0]?.id.toString() || "1");
    }
  }, [selectedEvent]);


  const handleSubmit = () => {
    const backgroundColor = eventColorPalette
      .filter((eventColor) => eventColor.id.toString() === selectedColor.toString());

    const savedEvent = {
      id: isNewEvent ? Math.round(Math.random() * 1000).toString() : selectedEvent?.id,
      title: eventTitle,
      eventLocation: eventLocation,
      allDay: allDayEvent,
      start: dayjs(eventStart).format('YYYY-MM-DDTHH:mm:ss'),
      end: dayjs(eventEnd).format('YYYY-MM-DDTHH:mm:ss'),
      organizerId: isNewEvent ? Math.round(Math.random() * 1000) : selectedEvent?.organizerId,
      backgroundColor: backgroundColor[0].value,
      editable: !allDayEvent ? true : false
    };

    handleEventsUpdate(savedEvent);
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
    setSelectedColor(event.target.value as string);
  }

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
            color="input"
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
                  value={eventStart}
                  onChange={(newStartTime) => setEventStartTime(newStartTime)}
                  format="ddd, MMM D, YYYY"
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
                  format="ddd, MMM D, YYYY"
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
                  format="ddd, MMM D, h:mm a"
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
                  format="ddd, MMM D, h:mm a"
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
          <InputLabel id="color-selector" sx={{ color: 'text.primary', mt: 1.5 }}>Event Color</InputLabel>
          <Select
            sx={{ backgroundColor: "#FFFFFF", mt: 1, width: '70%', color: 'text.primary' }}
            labelId="color-selector"
            value={selectedColor}
            onChange={handleColorSelect}
            color="primary"
          >
            {eventColorPalette.map((color) => (
              <MenuItem value={color.id}><Box sx={{ display: 'flex' }}><Circle sx={{ color: color.value, pr: 1 }} />{color.name}</Box></MenuItem>
            ))}
          </Select>
        </Box>
      </DialogContent>

      <DialogActions sx={{ backgroundColor: 'tertiary.main' }}>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={eventTitle.length == 0 ? true : false}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddEventModal