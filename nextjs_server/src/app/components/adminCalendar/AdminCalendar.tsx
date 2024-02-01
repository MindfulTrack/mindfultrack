'use client'
import { useState } from "react";
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

interface AdminCalendarProps {

};

interface Event {
    id: string;
    title: string;
    date?: string;
    start?: DateInput;
    end?: string;
}

const AdminCalendar: React.FC<AdminCalendarProps> = () => {
    const [currentEvents, setCurrentEvents] = useState<Event[]>([
        {
            id: "12315",
            title: "All-day event",
            date: "2024-01-31",
        },
        {
            id: "5123",
            title: "Timed Event",
            start: "2024-02-02 10:30:00",
            end: "2024-02-02 12:30:00",
        },
        {
            id: "5124",
            title: "Timed Event 2",
            start: "2024-01-31 11:30:00",
            end: "2024-01-31 12:30:00",
        },
    ]);
    const [openSlot, setOpenSlot] = useState(false)
    const [openDatepickerModal, setOpenDatepickerModal] = useState(false)
    const [eventName, setEventName] = useState('')

    const handleClose = () => {
        //   setEventFormData(initialEventFormState)
        setOpenSlot(false)
    }

    const handleDateClick = (selected: any) => {
        const title = prompt("Please enter a new title for your event");
        const calendarApi = selected.view.calendar;
        // calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
            });
        }
    };

    const handleEventClick = (event: EventClickArg) => {
        console.log(event.event.id)
        // setOpenSlot(true)
        console.log(event.event.start)
        console.log(event.event.end)
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setEventName(newName);
    };

    return (
        <Box m="20px">
            {/* <Header title="Calendar" subtitle="Full Calendar Interactive Page" /> */}

            <Box display="flex" justifyContent="space-between">
                <AddEventModal
                    open={openSlot}
                    handleClose={handleClose}
                    onChange={handleChange}
                    value={eventName}
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
                    <Typography variant="h6" color='text.tertiary'>Upcoming Appointments</Typography>
                    <List>
                        {currentEvents.map((event) => (
                            <ListItem
                                key={event.id}
                                sx={{
                                    backgroundColor: 'tertiary.main',
                                    margin: "10px 0",
                                    borderRadius: "2px",
                                }}
                            >
                                <ListItemText
                                    primary={event.title}
                                    secondary={
                                        <Typography>
                                            {event.start == undefined ? "" :
                                                formatDate(event.start, {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric"
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
                        height="83vh"
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
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={false}
                        nowIndicator={true}
                        select={handleDateClick}
                        eventClick={handleEventClick}
                        // eventsSet={(events) => setCurrentEvents(events)}
                        events={currentEvents}
                        eventColor="green"
                        businessHours={{
                            daysOfWeek: [1,2,3,4,5],
                            startTime: '09:00',
                            endTime: '17:00'
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default AdminCalendar;