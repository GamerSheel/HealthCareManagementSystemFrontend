import React, { useState, useEffect, createContext } from 'react';
import {
    Card, CardContent, CardMedia, Typography, Grid, Box
    , Container, CircularProgress, Avatar, Button , Divider
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import {
    CalendarToday, Person, MonetizationOn, EventAvailable, AccessTime, Description, CurrencyRupee, ReportProblem, Healing,
    BugReport, MedicalServices,
    Dashboard 
} from '@mui/icons-material';
import AppointmentRecordModal from './AppointmentRecordModal';


const StyledContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'Lavender',
});

const styles = {
    avatarContainer: {
        display: 'flex',
        justifyContent: 'center',

        alignItems: 'center',
        // margin: 'auto',
        // marginBottom: '10px',
    },
};

const AllAppointmentPatient = () => {
    const token = localStorage.getItem('token');
    const [allAppointments, setAllAppointments] = useState();
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { doctor, patient } = location.state || {};
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
  

    const viewAllAppointmentPatientDoctor = async () => {
        if(doctor){
        
        try {
            const response = await axios.get('http://localhost:8080/appointment/getAllAppointmentsPatient', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    'doctorId': doctor.email,
                    'patientId': patient.email,
                },
            }
            ).then(async (response) => {
                setAllAppointments(response.data);
                console.log(response.data);
                setLoading(false);
            });

        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setLoading(false);
        }
    }else{
        try {
            console.log("no doctor")
            const token = localStorage.getItem('token');
            // Fetch both upcoming and previous appointments concurrently
            const [responseAllUpcomingAppointments, responseAllPreviousAppointments] = await Promise.all([
              axios.get('http://localhost:8080/appointment/UpcomingPatientId', {
                params: { patientId: patient.email },
                headers: { Authorization: `Bearer ${token}` },
              }),
              axios.get('http://localhost:8080/appointment/PreviousPatientId', {
                params: { patientId: patient.email },
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
      
          } catch (error) {
            console.error('Failed to fetch user data:', error);
            setLoading(false);
          }
    }
    };

    useEffect(() => {
        viewAllAppointmentPatientDoctor();
    }, []);

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
        console.log(event);
        
        const modalEvent = { ...event };
        console.log(modalEvent);
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



    if (loading) {
        return (
            <DashboardLayout>
                <StyledContainer>
                    <CircularProgress />
                </StyledContainer>
            </DashboardLayout>
        );
    }

    if (!allAppointments || allAppointments.length === 0) {
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
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
                <Grid item xs={10} sm={12} md={6} >
                    <Card sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        overflow: 'hidden',
                        '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: 6,
                        },
                    }}
                    >
                        <Grid container sx={{ padding: 2 }}>
                            <Grid item xs={12} sm={3} sx={styles.avatarContainer}>
                                <Box >
                                    <Avatar alt={patient.firstName} src={patient.firstName} sx={{ width: '100px', height: '100px', }} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={9} wrap="wrap">
                                <CardContent>
                                    {/* <Box display="flex" flexDirection="column" justifyContent="left" height="100%"> */}
                                    <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }}>
                                        {patient.firstName}  {patient.lastName}
                                    </Typography>
                                    <Typography sx={{ textAlign: 'left', display: 'flex' }} >
                                        <Typography sx={{ fontWeight: 'bold', marginRight: '4px' }}> Gender : </Typography> <Typography sx={{ wordWrap: 'break-word' }} >{patient.gender}</Typography>
                                    </Typography>
                                    <Typography sx={{ textAlign: 'left', display: 'flex' }}>
                                        <Typography sx={{ fontWeight: 'bold', marginRight: '4px' }}> Email: </Typography>  <Typography sx={{
                                            overflowX: 'auto'
                                        }}
                                        >{patient.email}</Typography>
                                    </Typography>
                                    <Typography sx={{ textAlign: 'left', display: 'flex' }} >
                                        <Typography sx={{ fontWeight: 'bold', marginRight: '4px' }}> Mobile Number : </Typography> <Typography sx={{ wordWrap: 'break-word' }} >{patient.mobileNumber}</Typography>
                                    </Typography>
                                    {/* </Box> */}
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>

            </Grid>

                {allAppointments.map((appointment, index) => (
                    <Card key={index} variant="outlined" sx={{ maxWidth: 800, margin: 'auto', padding: 2, borderRadius: 4, boxShadow: 3, marginBottom: "15px" }}>
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

                        {appointment.endTime && createDateWithTime(appointment.appointmentDate , appointment.endTime) >=new Date() ? <Typography></Typography> : 
                        <Button fullWidth variant="contained" color="primary" onClick={() => { handleViewDetails(appointment); }} >
                            View Details
                        </Button>
}
                    </Card>
                ))}

            <AppointmentRecordModal
                isOpen={isModalOpen}
                onClose={closeModal}
                event={selectedEvent}
                isDoctor={doctor?true:false}
            />

        </DashboardLayout>
    );
};

export default AllAppointmentPatient;
