import React, { useState } from 'react';
import { Calendar, momentLocalizer , Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Tooltip from '@mui/material/Tooltip';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AppointmentSchedule.css';
import { Dashboard } from '@mui/icons-material';
import DashboardLayout from './DashboardLayout';
import { useNavigate , useLocation } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Consultation with Dr. John Doe',
    start: new Date(2024, 5, 13, 10, 0),
    end: new Date(2024, 5, 13, 11, 0),
    desc: 'Routine check-up',
  },
  {
    title: 'Follow-up with Dr. Jane Smith',
    start: new Date(2024, 5, 14, 14, 0),
    end: new Date(2024, 5, 14, 15, 0),
    desc: 'Discuss test results',
  },
  // Add more events as needed
];

const styles = {
  calendarContainer: {
    marginTop: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    overflow: 'hidden',
  },
  calendar: {
    height: '600px',
  },
  header: {
    marginBottom: '20px',
    color: '#1976d2',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
  },
  transitionItem: {
    transition: 'all 0.3s ease-in-out',
  },
  customToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  toolbarButton: {
    backgroundColor: '#1976d2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#125ea2',
    },
  },

};

const CustomEvent = ({ event }) => (
  <Tooltip title={event.desc || ''}>
    <span>{event.title}</span>
  </Tooltip>
);

const CustomToolbar = ({ toolbar, setCurrentDate, currentDate  , view , selectDate}) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  console.log(currentDate);
  console.log("current date");
  const goToBack = () => {
    const prevMonth = moment(currentDate).subtract(1, 'month').toDate();
    setCurrentDate(prevMonth);
    toolbar.onNavigate('DATE', prevMonth);
    // toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    const nextMonth = moment(currentDate).add(1, 'month').toDate();
    setCurrentDate(nextMonth);
    toolbar.onNavigate('DATE', nextMonth);
    // toolbar.onNavigate('NEXT');
  };

  const goToCurrent = () => {
    const today = new Date();
    setCurrentDate(today);
    toolbar.onNavigate('DATE', today);
    // toolbar.onNavigate('TODAY');
  };

  console.log("inn custom toolbar");


  return (
    <div style={styles.customToolbar}>
      {view !== Views.DAY && <Button style={styles.toolbarButton} onClick={goToBack}
      disabled={moment(currentDate).isSameOrBefore(moment(), 'month')}
      >
        Back
      </Button>}
      <Typography variant="h5" style={styles.header}>
        {/* {toolbar.label} */}
        {days[selectDate.getDay()]}  {selectDate.getDate()}  {months[selectDate.getMonth()]} {selectDate.getFullYear()}
      </Typography>
      {view !==Views.DAY && <Button style={styles.toolbarButton} onClick={goToNext}  
      disabled={moment(currentDate).isSameOrAfter(moment().add(1, 'month'), 'month')}>
        Next
      </Button>}
      
      {view !== Views.DAY && <Button style={styles.toolbarButton} onClick={goToCurrent}>
        Today
      </Button>}
    </div>
  );
};


const BookAppointmentCalendarSchedule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { doctor } = location.state || {};

  const [view, setView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate , setSelectedDate] = useState(new Date());
  const [selectedStartTime , setSelectedStartTime] = useState(new Date());
  const [selectedEndTime , setSelectedEndTime] = useState(new Date());

  const minDate = moment().startOf('month').toDate();
  const maxDate = moment().add(1, 'month').endOf('month').toDate();

  const handleSelectEvent = (event) => {
    console.log("after clicking on date in handle select event")
    
    if (event.action === 'click' && view===Views.DAY) {
      // console.log(event.start);
      const startTime = event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , hour12: false   });
      const endTime = event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , hour12: false   });
      const selectDate = selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' , year:'numeric' ,  separator: '-' })
      // .format(selectedDate)
      // .replace(/\//g, '-');
  
      console.log("starttime" ,  startTime);
      console.log("endtime"  , endTime);
      console.log("selected Date" , selectedDate);
      console.log("select date" ,selectDate);
      // console.log(event.end);
      console.log("time is selected");
      console.log(doctor);
      setSelectedStartTime(startTime);
      setSelectedEndTime(endTime);

      const encodedDate = encodeURIComponent(selectDate);
      // navigate(`/data?date=${encodedDate}`);
      navigate(`/bookAppointment/${encodedDate}/${startTime}/${endTime}`, { state: { doctor } });
    }
    else if (event.action === 'click') {
      const selectDate = event.start.toLocaleDateString([], { day: '2-digit', month: '2-digit' , year:'2-digit'});
      // console.log(typeof selectDate);
      // console.log(event.start);
      setSelectedDate(event.start);
      // console.log("yes");
      setView(Views.DAY); // Switch to day view on selection
    }
    // Handle the selection of an event (date)
    // You can trigger the action to display the time view for the selected date here
    // console.log('Selected event:', event);
  };

  return (
    <DashboardLayout>
    <Container maxWidth="lg">
      <Typography variant="h4" style={styles.header}>
        Doctor's Schedule
      </Typography>
      <Box style={styles.calendarContainer}>
        <TransitionGroup>
          <CSSTransition key="calendar" timeout={500} classNames="fade">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={styles.calendar}
              components={{
                event: CustomEvent,
                toolbar: (toolbar) => (
                  <CustomToolbar
                    toolbar={toolbar}
                    setCurrentDate={setCurrentDate}
                    currentDate={currentDate}
                    selectDate={selectedDate}
                    view={view}
                  />
                ),
              }}
              view={view}
              onView={(newView) => setView(newView)}
              onSelectSlot={handleSelectEvent}
              selectable

              // dayPropGetter={dayPropGetter}
              step={15} // Set time slot duration to 15 minutes
              timeslots={1} // Display 4 time slots within an hour
              
              defaultDate={currentDate}
              min={minDate}
              max={maxDate}
             
            />
          </CSSTransition>
        </TransitionGroup>
      </Box>
    </Container>
    </DashboardLayout>
  );
};

export default BookAppointmentCalendarSchedule;


              // dayPropGetter={(date) => ({
              //   style: {
              //     backgroundColor:
              //       moment(date).isBefore(minDate) || moment(date).isAfter(maxDate)
              //         ? '#f0f0f0'
              //         : 'white',
              //     pointerEvents:
              //       moment(date).isBefore(minDate) || moment(date).isAfter(maxDate)
              //         ? 'none'
              //         : 'auto',
              //   },
              // })}





              // const dayPropGetter = (date) => {

              //   const minDate = moment().startOf('month').toDate();
              //   const maxDate = moment().add(1, 'month').endOf('month').toDate();
              
              //   const style= {
              //     backgroundColor:
              //       moment(date).isBefore(minDate) || moment(date).isAfter(maxDate)
              //         ? '#f0f0f0'
              //         : 'white',
              //     pointerEvents:
              //       moment(date).isBefore(minDate) || moment(date).isAfter(maxDate)
              //         ? 'none'
              //         : 'auto',
              //   }
              //   // Define styles
              //   // const style = {
              //   //   backgroundColor: 'white',
              //   //   border: '1px solid #ddd', // Optional border for each day cell
              //   //   paddingTop: '5px', // Adjust padding for spacing (optional)
              //   // };
              
              //   // Calculate time slots (4 slots per hour, adjust as needed)
              //   const timeSlots = [];
              //   for (let hour = 0; hour < 24; hour++) {
              //     for (let i = 0; i < 4; i++) {
              //       const minute = i * 15; // Calculate 15-minute intervals
              //       timeSlots.push(new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute));
              //     }
              //   }
              
              //   console.log("in day prop getter");
                
              //   const slicedTimeSlots = timeSlots.slice(0, 16); // Limit to 4 slots per hour
              //   console.log(slicedTimeSlots);
              //   return {
              //     style,
              //     className: 'custom-day', // Optional class for styling
              //     render: (content) => (
                    
              //       <div className="day-content-wrapper">
                     
              //         {/* Display date */}
              //         <div className="day-header">{content.date.toLocaleDateString()}</div>
              
              //         {/* Render time slots with labels */}
              //         {slicedTimeSlots.map((slot, index) => (
              //           <div key={index} className="time-slot">
              //             {slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              //           </div>
              //         ))}
              
              //         {/* Display default content (optional) */}
              //         {content}
              //       </div>
              //     ),
              //   };
              // };