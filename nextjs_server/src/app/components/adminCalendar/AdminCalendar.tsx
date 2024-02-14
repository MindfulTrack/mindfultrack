'use client'
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { DateInput, formatDate } from "@fullcalendar/core";
import multiMonthPlugin from '@fullcalendar/multimonth';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import AddEventModal from "./AddEventModal";
import { EventClickArg } from "@fullcalendar/core";
import mockEvents from '../../mockData/calendarEvent.json';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { Event } from "../../../ts/types";

interface AdminCalendarProps {

};

const AdminCalendar: React.FC<AdminCalendarProps> = () => {
  const calendarEvents = mockEvents as Event[]
  const [currentEvents, setCurrentEvents] = useState(calendarEvents);
  const [openSlot, setOpenSlot] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [isNewEvent, setIsNewEvent] = useState(false);

  const handleClose = () => {
    setOpenSlot(false)
  };

  const handleDateClick = (selected: any) => {
    setIsNewEvent(true);
    const newEvent = {
      id: (Math.random() * 1000).toString(),
      title: "",
      eventLocation: "",
      allDay: false,
      start: selected.dateStr,
      end: selected.dateStr,
      organizerId: Math.random() * 1000,
      backgroundColor: '#141414',
      oneDayEvent: false
    };
    setSelectedEvent(newEvent);
    setOpenSlot(true);
  };

  const handleEventClick = (selected: any) => {
    setIsNewEvent(false);
    const event = {
      id: selected.event.id,
      title: selected.event.title,
      eventLocation: selected.event.extendedProps.eventLocation,
      allDay: selected.event.allDay,
      start: selected.event.startStr,
      end: selected.event.allDay && !selected.event.oneDayEvent ? dayjs(selected.event.end).subtract(1, 'day').format('YYYY-MM-DD'): selected.event.end,
      organizerId: selected.event.extendedProps.organizerId,
      backgroundColor: selected.event.backgroundColor,
      oneDayEvent: selected.event.extendedProps.oneDayEvent
    };

    setSelectedEvent(event);
    setOpenSlot(true);
  };

  const currentDate = new Date();
  const currentTime = dayjs(currentDate).format('HH:mm:ss');

  const handleEventsUpdate = (updatedEvent: Event) => {
    const savedEvent: Event = {
      id: updatedEvent.id,
      title: updatedEvent.title,
      eventLocation: updatedEvent.eventLocation,
      allDay: updatedEvent.allDay,
      start: updatedEvent.start,
      end: updatedEvent.allDay && !updatedEvent.oneDayEvent ? dayjs(updatedEvent.end).add(1, 'day').format('YYYY-MM-DD'): updatedEvent.end,
      organizerId: updatedEvent.organizerId,
      backgroundColor: updatedEvent.backgroundColor,
      oneDayEvent: updatedEvent.oneDayEvent
    };

    const updatedEvents = currentEvents.filter(event =>
      event.id === savedEvent.id
    );

    if (updatedEvents.length === 0) {
      setCurrentEvents(prevEvents => [...prevEvents, savedEvent]);
    } else {
      const updatedEventIndex = currentEvents.findIndex(event => event.id === updatedEvent.id);

      if (updatedEventIndex !== -1) {
        const updatedEvents = [...currentEvents];
        updatedEvents[updatedEventIndex] = {
          ...updatedEvents[updatedEventIndex],
          id: savedEvent.id,
          title: savedEvent.title,
          eventLocation: savedEvent.eventLocation,
          allDay: savedEvent.allDay,
          start: savedEvent.start,
          end: savedEvent.end,
          organizerId: savedEvent.organizerId,
          backgroundColor: savedEvent.backgroundColor,
          oneDayEvent: savedEvent.oneDayEvent
        };
        setCurrentEvents(updatedEvents);
      }
    }

    setOpenSlot(false);
  };

  const [adjustedEnd, setAdjustedEnd] = useState("");
  const handleEventDrag = (info: { event: any }) => {
    const updatedEventIndex = currentEvents.findIndex(event => event.id === info.event.id);

    console.log('start', dayjs(info.event.start).day())
    console.log('end', dayjs(info.event.start).day())
    if (updatedEventIndex !== -1) {
      const updatedEvents = [...currentEvents];
      updatedEvents[updatedEventIndex] = {
        ...updatedEvents[updatedEventIndex],
        oneDayEvent: info.event.end === null || dayjs(info.event.start).day() === dayjs(info.event.end).subtract(1,'day').day() ? true : false,
        start: info.event.start,
        end: info.event.oneDayEvent ? info.event.start : info.event.end === null ? dayjs(info.event.start).add(1, 'hour').format('YYYY-MM-DDTHH:mm') : info.event.end,
        allDay: info.event.allDay
      };

      setCurrentEvents(updatedEvents);
    }
  };

  const handleDelete = (id: string) => {
    const updatedEvents = currentEvents.filter(event => event.id !== id);
    setCurrentEvents(updatedEvents);
    setOpenSlot(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box m="20px">

        <Box display="flex" justifyContent="space-between">
          <AddEventModal
            open={openSlot}
            isNewEvent={isNewEvent}
            handleClose={handleClose}
            selectedEvent={selectedEvent}
            handleEventsUpdate={handleEventsUpdate}
            handleDelete={handleDelete}
          />
          {/* CALENDAR SIDEBAR */}
          <Box
            sx={{
              flex: '1 1 20%',
              backgroundColor: 'secondary.main',
              padding: '15px',
              borderRadius: '4px'
            }}
          >
            <Typography variant="h6" color='text.tertiary'>Today's Appointments</Typography>
            <List>
              {currentEvents
                .filter((event) =>
                  dayjs(event.start).format("DD/MM/YYYY") === dayjs(new Date()).format("DD/MM/YYYY") ||
                  (event.allDay === true &&
                    (dayjs(event.start).format("DD/MM/YYYY") <= dayjs(new Date()).format("DD/MM/YYYY") &&
                      dayjs(event.end).format("DD/MM/YYYY") >= dayjs(new Date()).format("DD/MM/YYYY"))
                  )
                )
                .sort((a, b) => {
                  // Convert start dates to comparable values (e.g., timestamps)
                  const dateA = dayjs(a.start).valueOf(); // Convert to milliseconds
                  const dateB = dayjs(b.start).valueOf(); // Convert to milliseconds
                  // Compare the dates
                  return dateA - dateB;
                })
                .map((event) => (
                  <ListItem
                    key={event.id}
                    sx={{
                      backgroundColor: '#e6e6e6',
                      margin: "10px 0",
                      borderRadius: "2px",
                    }}
                  >

                    <ListItemText
                      primary={event.title}
                      secondary={
                        <Typography sx={{ fontSize: '12px' }}>
                          {/* Sidebar cards */}

                          {event.allDay ?
                            <>
                              {/* All day stuff */}
                              {event.start == undefined ? "" :
                                formatDate(event.start, {
                                  // year: "numeric",
                                  month: "short",
                                  day: "numeric"
                                })}
                              {event.oneDayEvent
                                ? ""
                                : " - "
                              }
                              {event.oneDayEvent
                                ? ""
                                :
                                dayjs(event.end).subtract(1, 'day').format('MMM DD')
                              }
                            </>
                            :
                            <>
                              {/* Normal event stuff */}
                              {event.start == undefined ? "" :
                                formatDate(event.start, {
                                  month: "short",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit"
                                })} - {event.end == undefined ? "" :
                                  formatDate(event.end, {
                                    hour: "numeric",
                                    minute: "2-digit"
                                  })}
                            </>
                          }
                        </Typography>
                      }
                    />
                  </ListItem>))
              }
            </List>
          </Box>

          {/* CALENDAR */}
          <Box flex="1 1 100%" ml="15px">
            <FullCalendar
              height="85vh"
              handleWindowResize={true}
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
                multiMonthPlugin
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="timeGridWeek"
              scrollTime={currentTime}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={false}
              nowIndicator={true}
              allDayMaintainDuration={false}
              eventDrop={(event) => handleEventDrag(event)}
              contentHeight={'20px'}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              eventResize={(event) => handleEventDrag(event)}
              events={currentEvents}
              eventColor="transparent"
              businessHours={{
                daysOfWeek: [1, 2, 3, 4, 5],
                startTime: '08:00',
                endTime: '18:00'
              }}
            />
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default AdminCalendar;