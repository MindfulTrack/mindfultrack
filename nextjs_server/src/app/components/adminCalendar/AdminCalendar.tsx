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
  const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
  const [openSlot, setOpenSlot] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [isNewEvent, setIsNewEvent] = useState(false);

  useEffect(() => {
    setCurrentEvents(mockEvents);
  });

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
      backgroundColor: '#141414'
    };
    setSelectedEvent(newEvent);
    setOpenSlot(true);
  };

  const handleEventClick = (selected: EventClickArg) => {
    console.log(dayjs(new Date()))
    setIsNewEvent(false);
    const event = {
      id: selected.event.id,
      title: selected.event.title,
      eventLocation: selected.event.extendedProps.eventLocation,
      allDay: selected.event.allDay,
      start: selected.event.startStr,
      end: selected.event.endStr,
      organizerId: selected.event.extendedProps.organizerId,
      backgroundColor: selected.event.backgroundColor
    };

    setSelectedEvent(event);
    setOpenSlot(true);
  };

  const currentDate = new Date();
  const currentTime = dayjs(currentDate).format('HH:mm:ss');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box m="20px">
        {/* <Header title="Calendar" subtitle="Full Calendar Interactive Page" /> */}

        <Box display="flex" justifyContent="space-between">
          <AddEventModal
            open={openSlot}
            isNewEvent={isNewEvent}
            handleClose={handleClose}
            selectedEvent={selectedEvent}
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
                          {event.start == undefined ? "" :
                            formatDate(event.start, {
                              // year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit"
                            })} - {event.end == undefined ? "" :
                              formatDate(event.end, {
                                hour: "numeric",
                                minute: "2-digit"
                              })}

                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
            </List>
          </Box>

          {/* CALENDAR */}
          <Box flex="1 1 100%" ml="15px">
            <FullCalendar
              height="80vh"
              handleWindowResize={true}
              // contentHeight={"auto"}
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
                right: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek",
              }}
              initialView="timeGridWeek"
              scrollTime={currentTime}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={false}
              nowIndicator={true}
              contentHeight={'20px'}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              events={currentEvents}
              // eventsSet={(events) => setCurrentEvents(events)}
              initialEvents={currentEvents}
              eventColor="transparent"
              businessHours={{
                daysOfWeek: [1, 2, 3, 4, 5],
                startTime: '08:00',
                endTime: '18:00'
              }}
              defaultTimedEventDuration={'01:00'}
              forceEventDuration={true}
            />
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default AdminCalendar;