'use client'
import React, { useEffect, useState } from "react"
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
  InputLabel,
  Checkbox
} from "@mui/material"
import { DesktopDatePicker, DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Event } from "../../../ts/types";
import { Delete, Circle } from "@mui/icons-material";
import { eventColorPalette } from "../../../ts/types";

interface AddEventModalProps {
  open: boolean;
  isNewEvent: boolean;
  handleClose: Function;
  selectedEvent: Event | undefined;
  handleEventsUpdate: Function;
  handleDelete: Function;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  open,
  handleClose,
  selectedEvent,
  isNewEvent,
  handleEventsUpdate,
  handleDelete
}) => {

  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [allDayEvent, setAllDayEvent] = useState(false);
  const [todayOnly, setTodayOnly] = useState(false);
  const [eventStart, setEventStartTime] = useState<Dayjs | null>(null);
  const [eventEnd, setEventEndTime] = useState<Dayjs | null>(null);
  const [tempEventEnd, setTempEventEnd] = useState<Dayjs | null>(null);
  const [tempEventTimeEnd, setTempEventTimeEnd] = useState<Dayjs | null>(null);
  const [changedFromAllDay, setChangedFromAllDay] = useState(false);

  const handleAllDayEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (allDayEvent && !changedFromAllDay) {
      setChangedFromAllDay(true);
      const eventHour = dayjs(eventStart).hour();
      if (eventHour < 8) {
        setEventStartTime(dayjs(eventStart).add(9, 'hours'));
        setEventEndTime(dayjs(eventStart).add(1, 'hour'));
      } else {
        setEventStartTime(eventStart)
        setEventEndTime(eventEnd)
      }
    }
    setTodayOnly(true);
    setAllDayEvent(event.target.checked);

  };
  const handleOneDayEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodayOnly(event.target.checked);
    if (!todayOnly) {
      setEventEndTime(tempEventEnd);
    }
  };

  useEffect(() => {
    if (selectedEvent) {
      setEventTitle(selectedEvent?.title);
      setEventLocation(selectedEvent?.eventLocation || "");
      setAllDayEvent(selectedEvent.allDay);
      setEventStartTime(dayjs(selectedEvent.start));
      setTempEventEnd(dayjs(selectedEvent.start).add(1, 'days'));
      // setTempEventTimeEnd(dayjs(selectedEvent.end));
      setEventEndTime(dayjs(selectedEvent.end))
      const backgroundColor = eventColorPalette
        .filter((eventColor) => eventColor.value === selectedEvent.backgroundColor);
      setSelectedColor(backgroundColor[0]?.id.toString() || "1");
      setTodayOnly(selectedEvent.oneDayEvent);
    }
  }, [selectedEvent]);

  const handleCancel = () => {
    setChangedFromAllDay(false);
    handleClose()
  };

  const handleSubmit = () => {
    setChangedFromAllDay(false);
    const backgroundColor = eventColorPalette
      .filter((eventColor) => eventColor.id.toString() === selectedColor.toString());

    if (allDayEvent && !todayOnly) {
      const addedDay = dayjs(eventEnd).add(1, 'day');
      setEventEndTime(addedDay);
    }
    const savedEvent = {
      id: isNewEvent ? Math.round(Math.random() * 1000).toString() : selectedEvent?.id,
      title: eventTitle,
      eventLocation: eventLocation,
      allDay: allDayEvent,
      start: allDayEvent ? dayjs(eventStart).format('YYYY-MM-DD') : dayjs(eventStart).format('YYYY-MM-DDTHH:mm'),
      end: allDayEvent ? dayjs(eventEnd).format('YYYY-MM-DD') : dayjs(eventEnd).format('YYYY-MM-DDTHH:mm'),
      organizerId: isNewEvent ? Math.round(Math.random() * 1000) : selectedEvent?.organizerId,
      backgroundColor: backgroundColor[0].value,
      oneDayEvent: todayOnly
    };

    handleEventsUpdate(savedEvent);
  };

  const handleDeleteClick = () => {
    let confirmation = confirm("Are you sure you would like to delete this event? " + '"' + selectedEvent?.title + '"')
    if (confirmation) {
      handleDelete(selectedEvent?.id);
    }
  }

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
    <Dialog open={open} onClose={handleCancel}>
      <DialogContent sx={{ backgroundColor: 'tertiary.main' }}>
        <Box component="form" sx={{ width: '100%' }}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography>{isNewEvent ? "Add New Event" : "Edit Event"}</Typography>
          {!isNewEvent ? <Delete onClick={handleDeleteClick} sx={{cursor: 'pointer'}}/> : <></>}
          </Box>
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
            <Box sx={{ display: 'flex' }}>
              <Checkbox color="primary" onChange={handleOneDayEvent} checked={todayOnly} sx={{ mb: '10px', pt: 0.5 }} />
              <Typography variant='body1' color={'text.primary'}>One-day event?</Typography>
            </Box>
            :
            <></>
          }
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
                        }
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <DesktopDatePicker
                  // label="End"
                  value={todayOnly ? eventStart : eventEnd}                 
                  onChange={(newEndTime) => setEventEndTime(newEndTime)}
                  disabled={todayOnly ? true : false}
                  format="ddd, MMM D, YYYY"
                  slotProps={{
                    layout: {
                      sx: {
                        '.MuiDateCalendar-root': {
                          color: 'text.primary',
                          backgroundColor: '#ffffff'
                        },
                        '.MuiInputBase-root-MuiOutlinedInput-root': {
                          color: dayjs(eventEnd)?.valueOf() < dayjs(eventStart)?.valueOf() ? 'error' : 'text.primary'
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
                  value={isNewEvent && changedFromAllDay ? eventStart?.add(1, 'hour') : eventEnd}
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
              <MenuItem key={color.id} value={color.id}><Box sx={{ display: 'flex' }}><Circle sx={{ color: color.value, pr: 1 }} />{color.name}</Box></MenuItem>
            ))}
          </Select>
        </Box>
      </DialogContent>

      <DialogActions sx={{ backgroundColor: 'tertiary.main' }}>
        <Button color="error" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={eventTitle.length == 0 || dayjs(eventEnd)?.valueOf() < dayjs(eventStart)?.valueOf() ? true : false}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddEventModal