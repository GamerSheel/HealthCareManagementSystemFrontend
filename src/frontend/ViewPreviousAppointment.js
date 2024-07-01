import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Button, Divider, Box , CircularProgress , Container } from '@mui/material';
import {
    CalendarToday, Person, MonetizationOn, EventAvailable, AccessTime, Description, CurrencyRupee, ReportProblem, Healing,
    BugReport, MedicalServices,
    Dashboard 
} from '@mui/icons-material';
import DashboardLayout from './DashboardLayout';
import axios from 'axios';
import { styled } from '@mui/system';
import AppointmentRecordModal from './AppointmentRecordModal';


const StyledContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'Lavender',
  });
  

const ViewPreviousAppointments = () => {
    const [allAppointments, setAllAppointments] = useState(null);
    const [userData , setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
  
    //     const appointmentBooking = (doctor) => {
    //       navigate('/bookAppointment', { state: { doctor } });
    //   };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
      };

    const createDateWithTime = (dateString, timeString) => {
        const [hours, minutes] = timeString.split(':').map(Number);
        console.log(hours, minutes);
        const date = new Date(dateString);
        date.setHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, and milliseconds
        return date;
    };


    const handleViewDetails = (event) => {
        // setModalEvent(event);
        const modalEvent = { ...event };
        console.log(modalEvent);
        console.log(event);
        const appDate = modalEvent.appointmentDate;
        const appStartTime = modalEvent.startTime;
        const appEndTime = modalEvent.endTime;

        // console.log("appStartTime" , appStartTime);
        // console.log("appEndTime" , appEndTime);
        // console.log(appDate);

        const startTime = createDateWithTime(appDate, appStartTime);
        const endTime = createDateWithTime(appDate, appEndTime);
        modalEvent.startTime =startTime;
        modalEvent.endTime = endTime;

        // console.log("start Time", startTime);
        // console.log("end Time", endTime);
        // console.log(modalEvent);

        
        setSelectedEvent(modalEvent);
        setIsModalOpen(true);
    
        // Add your custom logic here, e.g., open a modal with event details
      };

    //     const appointmentBooking = (doctor) => {
    //       navigate('/bookAppointment', { state: { doctor } });
    //   };


    const viewDoctorDetails = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get('http://localhost:8080/currentLoginUser', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(async(response) => {
                // Handle successful response
                console.log("in try view doctor appointments ")
                console.log(response.data.email);
                
                setUserData(response.data);
                const responseAllAppointments = await axios.get('http://localhost:8080/appointment/PreviousPatientId', {
                    params: {
                        'patientId': response.data.email,
    
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((responseAllAppointments) => {
                    // Handle successful response
                    setAllAppointments(responseAllAppointments.data);
                    console.log(responseAllAppointments.data);
                });
                console.log(response.data);
                setLoading(false);
            });

        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        viewDoctorDetails();
    }, []);

    if (loading) {
        return (
          <DashboardLayout>
            <StyledContainer>
              <CircularProgress />
            </StyledContainer>
          </DashboardLayout>
        );
      }
    
      
      if (!userData || (!allAppointments || allAppointments.length===0 )) {
        return (
          <DashboardLayout>
            <StyledContainer>
              <Typography variant="h6">No user data found</Typography>
            </StyledContainer>
          </DashboardLayout>
        );
      }

    return (
        <DashboardLayout>
            
            {allAppointments.map((appointment, index) => (
            <Card key={index} variant="outlined" sx={{ maxWidth: 800, margin: 'auto', padding: 2, borderRadius: 4, boxShadow: 3 , marginBottom:"15px"}}>
                <CardContent>
                    <Grid container  >
                        <Grid item xs={12} md={6}>
                            <Box display="flex" alignItems="center" mb={1}>
                                <Person style={{ color: "DarkViolet" }} sx={{ mr: 1 }} />
                                <Typography variant="h6"><strong>Doctor:</strong> {appointment.doctorId.firstName} {appointment.doctorId.lastName}</Typography>
                            </Box>

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box display="flex" alignItems="center" mb={1}>
                                <CalendarToday style={{ color: "DarkViolet" }} sx={{ mr: 1 }} />
                                <Typography variant="h6"><strong>Date:</strong> {appointment.appointmentDate[8]}{appointment.appointmentDate[9]}
                                    {appointment.appointmentDate[7]}{appointment.appointmentDate[5]}{appointment.appointmentDate[6]}
                                    {appointment.appointmentDate[4]}{appointment.appointmentDate[0]}{appointment.appointmentDate[1]}
                                    {appointment.appointmentDate[2]}{appointment.appointmentDate[3]}
                                    </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider />
                    <Grid container spacing={1} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={6}>
                            <Box display="flex" alignItems="center" mb={1}>
                                <Person color="primary" sx={{ mr: 1 }} />
                                <Typography variant="subtitle1"><strong>Patient:</strong> {appointment.forWhichPerson} </Typography>
                            </Box>

                            <Box display="flex" alignItems="center" mb={1}>
                                <CurrencyRupee color="primary" sx={{ mr: 1 }} />
                                <Typography variant="subtitle1"><strong>Fees:</strong> 100000</Typography>
                            </Box>

                        </Grid>
                        <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center" mb={1}>
                                <AccessTime color="primary" sx={{ mr: 1 }} />
                                <Typography variant="subtitle1"><strong>Start Time:</strong> {appointment.startTime}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <AccessTime color="primary" sx={{ mr: 1 }} />
                                <Typography variant="subtitle1"><strong>End Time:</strong> {appointment.endTime} </Typography>
                            </Box>

                        </Grid>

                        <Grid item xs={12} md={12}>
                            <Box display="flex" alignItems="center" mb={1}>
                                <MedicalServices color="primary" sx={{ mr: 1 }} />
                                <Typography variant="subtitle1"><strong>Issue:</strong> {appointment.issue}</Typography>
                            </Box>
                        </Grid>
                        {/* <Grid item xs={12} md={12}>
                            <Box display="flex" alignItems="center" mb={1}>
                                <Description color="primary" sx={{ mr: 1 }} />
                                <Typography variant="subtitle1">Doctor Description: </Typography>
                            </Box>
                        </Grid> */}
                    </Grid>
                </CardContent>
                <Button fullWidth variant="contained" color="primary" onClick={()=> {handleViewDetails(appointment);}} >
                    View Details
                </Button>
            </Card>
            ))}

<AppointmentRecordModal
        isOpen={isModalOpen}
        onClose={closeModal}
        event={selectedEvent}
        isDoctor={false}
      />
            
        </DashboardLayout>
    );
};

export default ViewPreviousAppointments;
