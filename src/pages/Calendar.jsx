import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Paper, Typography, Box } from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Team Meeting',
    start: new Date(2024, 2, 20, 10, 0),
    end: new Date(2024, 2, 20, 11, 30),
    color: '#1976d2',
  },
  {
    title: 'Project Review',
    start: new Date(2024, 2, 21, 14, 0),
    end: new Date(2024, 2, 21, 15, 30),
    color: '#2e7d32',
  },
  {
    title: 'Client Call',
    start: new Date(2024, 2, 22, 9, 0),
    end: new Date(2024, 2, 22, 10, 0),
    color: '#ed6c02',
  },
];

const Calendar = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Calendar
      </Typography>

      <Paper sx={{ p: 2, height: 'calc(100vh - 200px)' }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.color,
              borderRadius: '4px',
            },
          })}
          views={['month', 'week', 'day', 'agenda']}
          defaultView="month"
          popup
          selectable
          onSelectEvent={(event) => {
            console.log('Selected event:', event);
          }}
          onSelectSlot={(slotInfo) => {
            console.log('Selected slot:', slotInfo);
          }}
        />
      </Paper>
    </Box>
  );
};

export default Calendar; 