import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Button, Select, MenuItem, Box, Typography, Container,
  Tooltip, Snackbar, CircularProgress,
} from '@mui/material';
import { Dashboard } from '@mui/icons-material';
import { styled } from '@mui/system';
import DashboardLayout from './DashboardLayout';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Schedule.css'
import zIndex from '@mui/material/styles/zIndex';

const localizer = momentLocalizer(moment);

const events = [
  {
    issue: 'Consultation with Dr. John Doe',
    startTime: new Date(2024, 5, 13, 10, 0),
    endTime: new Date(2024, 5, 13, 11, 0),
    desc: 'Routine check-up',
  },
  {
    issue: 'Follow-up with Dr. Jane Smith',
    startTime: new Date(2024, 5, 14, 19, 0),
    endTime: new Date(2024, 5, 14, 20, 0),
    desc: 'Discuss test results',
  },
];

const styles = {
  calendarContainer: {
    // marginTop: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
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
  timeSlotWrapper: {
    backgroundColor: '#F0F0F0',
    width: '100%',
    height: '100%',
  },
  timeSlotContent: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
};

const CustomEvent = ({ event }) => (
  <Tooltip title={event.issue || ''}>
    <span>{event.issue}</span>
    {/* <span>{event.forWhichPerson}</span> */}
    {/* <span>{event.patientId.firstName} {event.patientId.lastName}</span> */}
  </Tooltip>

);


const CustomToolbar = ({ toolbar, view, currentDate, setCurrentDate }) => {
  // , date, views, view, onView

  // console.log(toolbar.date);
  // console.log(view);
  const daysInWords = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsInWords = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const [selectedMonth, setSelectedMonth] = useState(moment(toolbar.date).month());
  const [selectedYear, setSelectedYear] = useState(moment(toolbar.date).year());

  const handleMonthChange = (event) => {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
    toolbar.onNavigate('DATE', moment(toolbar.date).month(newMonth).toDate());
  };

  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);
    toolbar.onNavigate('DATE', moment(toolbar.date).year(newYear).toDate());
  };

  const goToNext = () => {
    if (view == 'month') {
      const nextMonth = moment(currentDate).add(1, 'month').toDate();
      setCurrentDate(nextMonth);
      toolbar.onNavigate('DATE', nextMonth);
    }
    else if (view == 'week') {
      const nextWeek = moment(currentDate).add(1, 'week').toDate();
      setCurrentDate(nextWeek);
      toolbar.onNavigate('DATE', nextWeek);
    } else if (view == 'day') {
      const nextDay = moment(currentDate).add(1, 'day').toDate();
      setCurrentDate(nextDay);
      toolbar.onNavigate('DATE', nextDay);
    } else {
      const nextDay = moment(currentDate).add(1, 'day').toDate();
      setCurrentDate(nextDay);
      toolbar.onNavigate('DATE', nextDay);
    }
    setSelectedMonth(toolbar.date.getMonth());
    setSelectedYear(toolbar.date.getFullYear());
    // toolbar.onNavigate('NEXT');

  };

  const goToPrevious = () => {
    if (view == 'month') {
      const prevMonth = moment(currentDate).subtract(1, 'month').toDate();
      setCurrentDate(prevMonth);
      toolbar.onNavigate('DATE', prevMonth);
    } else if (view == 'week') {
      const prevWeek = moment(currentDate).subtract(1, 'week').toDate();
      setCurrentDate(prevWeek);
      toolbar.onNavigate('DATE', prevWeek);
    } else if (view == 'day') {
      const prevDay = moment(currentDate).subtract(1, 'day').toDate();
      setCurrentDate(prevDay);
      toolbar.onNavigate('DATE', prevDay);
    } else {
      const prevDay = moment(currentDate).subtract(1, 'day').toDate();
      setCurrentDate(prevDay);
      toolbar.onNavigate('DATE', prevDay);
      console.log(toolbar);
    }


    // toolbar.onNavigate('PREV');
    setSelectedMonth(toolbar.date.getMonth());
    setSelectedYear(toolbar.date.getFullYear());
  };

  const goToCurrent = () => {
    const today = new Date();
    setCurrentDate(today);
    toolbar.onNavigate('DATE', today);
    // toolbar.onNavigate('TODAY');
    setSelectedMonth(moment().month());
    setSelectedYear(moment().year());

  };

  const changeView = (view) => {
    toolbar.onView(view);
  };

  const months = moment.months();
  const years = [];
  for (let i = moment().year() - 5; i <= moment().year() + 5; i++) {
    years.push(i);
  }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Button onClick={goToPrevious}>Back</Button>
      <Typography variant="h5" color={"primary"}>
        {daysInWords[toolbar.date.getDay()]} {toolbar.date.getDate()}
      </Typography>

      <Box display="flex" alignItems="center">

        <Select value={selectedMonth} onChange={handleMonthChange} variant="outlined" size="small">
          {months.map((month, index) => (
            <MenuItem key={index} value={index}>
              {month}
            </MenuItem>
          ))}
        </Select>
        <Select value={selectedYear} onChange={handleYearChange} variant="outlined" size="small">
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Button onClick={goToNext}>Next</Button>
      <Button onClick={goToCurrent}>Today</Button>
      <Box display="flex" alignItems="center">
        {toolbar.views.map((availableView) => (
          <Button
            key={availableView}
            onClick={() => changeView(availableView)}
            variant={toolbar.view === availableView ? 'contained' : 'outlined'}
          >
            {availableView.charAt(0).toUpperCase() + availableView.slice(1)}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

const CalendarSchedule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { doctor } = location.state || {};

  const [view, setView] = useState(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allAppointments, setAllAppointments] = useState();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [appUpdated , setAppUpdated] = useState(false);

  const minDate = moment().startOf('month').toDate();
  const maxDate = moment().add(1, 'month').endOf('month').toDate();

  // const minDate =new Date(2024, 5, 20, 0, 0);
  // const maxDate=new Date(2024, 5, 20, 24, 0);


  const createDateWithTime = (dateString, timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    console.log(hours , minutes);
    const date = new Date(dateString);
    date.setHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, and milliseconds
    return date;
  };
  

  const viewDoctorSchedule = async () => {
    try {
      const token = localStorage.getItem('token');
      // Handle successful response
      console.log("in try view doctor appointments ")

      // Fetch both upcoming and previous appointments concurrently
      const [responseAllUpcomingAppointments, responseAllPreviousAppointments] = await Promise.all([
        axios.get('http://localhost:8080/appointment/UpcomingDoctorId', {
          params: { doctorId: doctor.email },
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://localhost:8080/appointment/PreviousDoctorId', {
          params: { doctorId: doctor.email },
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      // Handle successful responses
      const allUpcomingAppointments = responseAllUpcomingAppointments.data;
      const allPreviousAppointments = responseAllPreviousAppointments.data;

      // Combine both appointments and set state once
      setAllAppointments([...allUpcomingAppointments, ...allPreviousAppointments]);
      console.log('All upcoming appointments:', allUpcomingAppointments);
      console.log('All previous appointments:', allPreviousAppointments);
      // Set loading to false

      setLoading(false);

      setAppUpdated(false);


      // const responseAllUpcomingAppointments = await axios.get('http://localhost:8080/appointment/UpcomingDoctorId', {
      //   params: {
      //     'doctorId': doctor.email,
      //   },
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }).then((responseAllUpcomingAppointments) => {
      //   // Handle successful response
      //   setAllAppointments(responseAllUpcomingAppointments.data);
      //   // setAllAppointments((prevItems) => [...prevItems, responseAllUpcomingAppointments.data]);
      //   console.log(responseAllUpcomingAppointments.data);

      //   // const responseAllPreviousAppointments = await axios.get('http://localhost:8080/appointment/PreviousDoctorId', {
      //   //   params: {
      //   //     'doctorId': doctor.email,
      //   //   },
      //   //   headers: {
      //   //     Authorization: `Bearer ${token}`,
      //   //   },
      //   // }).then((responseAllPreviousAppointments) => {
      //   //   // Handle successful response
      //   //   console.log(responseAllPreviousAppointments.data);
      //   //   setAllAppointments((prevItems) => [...prevItems, ...responseAllPreviousAppointments.data]);

      //   //   setLoading(false);
      //   // });
      // });

      // const responseAllPreviousAppointments = await axios.get('http://localhost:8080/appointment/PreviousDoctorId', {
      //   params: {
      //     'doctorId': doctor.email,
      //   },
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }).then((responseAllPreviousAppointments) => {
      //   // Handle successful response
      //   console.log(responseAllPreviousAppointments.data);
      //   setAllAppointments((prevItems) => [...prevItems, ...responseAllPreviousAppointments.data]);

      //   setLoading(false);
      // });

    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await viewDoctorSchedule(); // Assuming viewDoctorSchedule is asynchronous
    };
    fetchData();
    // viewDoctorSchedule();
  }, []);



  const StyledContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'Lavender',
  });

  const changeCurrentDate = (event) => {
    console.log("after clicking on date in change current Date")
    setCurrentDate(event.start);
  }

  const handleSelectEvent = (event) => {
    const dayStartTime = new Date(event.start).setHours(0, 0, 0);
    const dayEndTime = new Date(event.start).setHours(8, 0, 0); // 8pm is 20:00

    const nightStartTime = new Date(event.start).setHours(20, 0, 0);
    const nightEndTime = new Date(event.start).setHours(23, 59, 0); //

    const lunchStartTime = new Date(event.start).setHours(13, 30, 0);
    const lunchEndTime = new Date(event.start).setHours(14, 30, 0); //

    const today = new Date();

    if ((((event.slots.length > 1) && event.start >= dayStartTime && event.start < dayEndTime) || (event.start >= nightStartTime && event.start < nightEndTime) || (event.start >= lunchStartTime && event.start < lunchEndTime))) {
      setMessage('Time slot not available for booking');
      setOpen(true);

    } else if (event.start < today && (event.slots.length > 1)) {
      setMessage('Select the correct date. Time slot not available for booking');
      setOpen(true);
    }
    else {


      console.log("after clicking on date in handle select event")

      if (event.action === 'click' && view === Views.DAY) {
        // console.log(event.start);
        const startTime = event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        const endTime = event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        const selectDate = selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', separator: '-' })
        // .format(selectedDate)
        // .replace(/\//g, '-');

        console.log("starttime", startTime);
        console.log("endtime", endTime);
        console.log("selected Date", selectedDate);
        console.log("select date", selectDate);
        // console.log(event.end);
        console.log("time is selected");
        console.log(doctor);
        setSelectedStartTime(startTime);
        setSelectedEndTime(endTime);
        setCurrentDate(event.start);

        const encodedDate = encodeURIComponent(selectDate);
        // navigate(`/data?date=${encodedDate}`);
        navigate(`/bookAppointment/${encodedDate}/${startTime}/${endTime}`, { state: { doctor } });
      }
      else if (event.action === 'click') {
        const selectDate = event.start.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: '2-digit' });
        // console.log(typeof selectDate);
        // console.log(event.start);
        // console.log(currentDate);
        setSelectedDate(event.start);
        setCurrentDate(event.start);
        // setCurrentDate(event.start);
        // console.log(currentDate);
        // console.log("yes");
        // console.log(toolbar);
        setView(Views.DAY); // Switch to day view on selection
        // console.log(toolbar);
      }
      // Handle the selection of an event (date)
      // You can trigger the action to display the time view for the selected date here
      // console.log('Selected event:', event);
    }
  };

  const CustomTimeSlot = ({ value, children }) => {
    // const isBlocked = value.getHours() >= 0 && value.getHours() < 8; // Between 12 PM and 8 PM
    // // const isBlocked = true;
    // console.log(isBlocked)

    const hour = value.getHours();
    console.log(children);

    const style = {
      backgroundColor: '#F0F0F0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
      position: 'relative',
      height: '100%',
      width: '100%',
    };
    if (hour >= 0 && hour < 8) {
      return (
        // <div
        //     style={{
        //     // backgroundColor: 'linear-gradient(to right, #ff7e5f, #feb47b)',
        //     backgroundColor: '#F0F0F0',
        //     // color: 'primary',
        //     height: '200%',
        //     width: '100%' ,
        //     display: 'flex',
        //     alignItems: 'center',
        //     justifyContent: 'center',
        //     // border: '1px solid #ff7e5f',
        //     borderRadius: '4px',
        //     position: 'relative',
        //     overflow: 'hidden',
        //   }}
        //   title="This time slot is blocked"
        // >

        // <div style={styles.timeSlotWrapper}>
        // <div style={styles.timeSlotContent}>
        //   {children}

        // </div>
        // </div>

        <div style={style}>
          <span style={{ position: 'absolute' }}>Unavailable for booking</span>
          {children}
        </div>


      );
    }

    return (
      <div >
        {children}
      </div>
    );


    // //   // <div className={`time-slot-wrapper ${isBlocked ? 'blocked-slot' : ''}`}>
    // //   //   {children}
    // //   // </div>


    // if (hour >= 0 && hour < 8) {
    //   return (
    //       // <Typography style={{ backgroundColor: '#e0e0e0', color: '#a0a0a0' }}>
    //       //   Blocked
    //       // </Typography>
    //       }
    //     //   <Tooltip >
    //     //   <span>Blocked</span>

    //     // </Tooltip>
    //   //   <div
    //   //   style={{
    //   //     backgroundColor: 'linear-gradient(to right, #ff7e5f, #feb47b)',
    //   //     color: '#fff',
    //   //     height: '100%',
    //   //     display: 'flex',
    //   //     alignItems: 'center',
    //   //     justifyContent: 'center',
    //   //     border: '1px solid #ff7e5f',
    //   //     borderRadius: '4px',
    //   //     position: 'relative',
    //   //     overflow: 'hidden',
    //   //   }}
    //   //   title="This time slot is blocked"
    //   // >
    //   //   {/* <FontAwesomeIcon icon={faLock} style={{ marginRight: '8px' }} /> */}
    //   //   Blocked
    //   // </div>

    // //   );
    // // }
    // // // if(isStart){
    // //   return (
    // //     <div
    // //       style={{
    // //         display: 'flex',
    // //         alignItems: 'center',
    // //       }}
    // //     >
    // //       <span style={{ marginRight: '8px', fontWeight: 'bold' }}>
    // //         {value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    // //       </span>
    // //     </div>
    // //   );
    // // // }

  };

  const unavailableSlotPropGetter = (date) => {
    const dayStartTime = new Date(date).setHours(0, 0, 0);
    const dayEndTime = new Date(date).setHours(8, 0, 0); // 8pm is 20:00

    const nightStartTime = new Date(date).setHours(20, 0, 0);
    const nightEndTime = new Date(date).setHours(23, 59, 0); //

    const lunchStartTime = new Date(date).setHours(13, 30, 0);
    const lunchEndTime = new Date(date).setHours(14, 30, 0); //

    if ((date >= dayStartTime && date < dayEndTime) || (date >= nightStartTime && date < nightEndTime)) {
      return {
        style: { backgroundColor: '#FFFFE0' },

        className: 'unavailable-slot', // Optional class for further styling
        // content: 'Unavailable for booking', // Text content to display
        // component:'un'
      };
    }
    else if (date >= lunchStartTime && date < lunchEndTime) {
      return {
        style: { backgroundColor: '#FFFFE0' },

        className: 'lunch-slot', // Optional class for further styling
        // content: 'Unavailable for booking', // Text content to display

      };
    }
    else
      return {};
  };

  // CustomTimeSlot.propTypes = {
  //   children: PropTypes.node,
  //   value: PropTypes.instanceOf(Date).isRequired,
  // };

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate); // Update state with the new date
    // Optionally, perform other actions on navigation (e.g., fetch data)
  };

  if (loading) {
    return (
      <DashboardLayout>
        <StyledContainer>
          <CircularProgress />
        </StyledContainer>
      </DashboardLayout>
    );
  }

  if (allAppointments && !appUpdated) {
    console.log(allAppointments);
    const newArray = allAppointments.map(item =>  {
      console.log(item);
      const appDate = item.appointmentDate;
      const appStartTime = item.startTime;
      const appEndTime = item.endTime;

      if(appStartTime && appEndTime){
        console.log(item);
        console.log(appStartTime);
        console.log(appEndTime);
        console.log(appDate);
      const startTime = createDateWithTime(appDate, appStartTime);
      const endTime = createDateWithTime(appDate, appEndTime);

      console.log("start Time" , startTime);
      console.log("end Time" , endTime);
      return { ...item, startTime, endTime };
      // item.startTime = startTime;
      // item.endTime = endTime;
      }

      return item;
    });
    setAllAppointments(newArray);
    setAppUpdated(true);
  }

  return (
    <DashboardLayout >
      <Container maxWidth="lg" >

        <Typography variant="h4" style={styles.header}>
          Doctor's Schedule

        </Typography>
        <Box  sx={{height:'100vh'}} style={styles.calendarContainer}>
        {/* <TransitionGroup> */}
        <CSSTransition key="calendar" timeout={500} classNames="fade">
          <Calendar
            localizer={localizer}
            events={allAppointments}
            startAccessor="startTime"
            endAccessor="endTime"
            // defaultView={view}
            views={['month', 'week', 'day', 'agenda']}
            slotPropGetter={unavailableSlotPropGetter}
            components={{
              // timeSlotWrapper: CustomTimeSlot,
              // timeSlotWrapper: ({ children, value }) => (
              //   <CustomTimeSlot value={value} isStart={children} />
              // ),
              // timeSlotWrapper: (props) => (
              //   <CustomTimeSlot {...props} />
              // ),
              event: CustomEvent,
              // toolbar: CustomToolbar,
              toolbar: (toolbar) => (
                <CustomToolbar
                  toolbar={toolbar}
                  setCurrentDate={setCurrentDate}
                  currentDate={currentDate}
                  // selectDate={selectedDate}
                  // setSelectedDate={setSelectedDate}
                  view={view}
                />
              ),
            }}

            style={{ height: '100%' }}
            view={view}
            onView={(newView) => setView(newView)}
            onSelect={changeCurrentDate}
            onSelectSlot={(event) => handleSelectEvent(event)}
            selectable
            step={15} // Set time slot duration to 15 minutes
            timeslots={1} // Display 4 time slots within an hour

            // defaultDate={currentDate}
            onNavigate={handleNavigate}
            date={currentDate}
            min={minDate}
            max={maxDate}

            length={1}
          />
        </CSSTransition>
        {/* </TransitionGroup> */}
        </Box>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message={message}
        />


      </Container>
    </DashboardLayout>
  );
};

export default CalendarSchedule;


