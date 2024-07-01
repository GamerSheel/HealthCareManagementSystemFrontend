import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Button, Divider, Box, CircularProgress, Container } from '@mui/material';
import {
    CalendarToday, Person, MonetizationOn, EventAvailable, AccessTime, Description, CurrencyRupee, ReportProblem, Healing,
    BugReport, MedicalServices,
    Dashboard
} from '@mui/icons-material';
import DashboardLayout from './DashboardLayout';
import axios from 'axios';
import { styled } from '@mui/system';


const StyledContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'Lavender',
});


const ViewUpcomingAppointmentsAdmin = () => {
    const [allAppointments, setAllAppointments] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const ViewUpcomingAppointments = async () => {
        try {
            const token = localStorage.getItem('token');

            const responseAllAppointments = await axios.get('http://localhost:8080/appointment/allUpcomingAppointments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((responseAllAppointments) => {
                // Handle successful response
                setAllAppointments(responseAllAppointments.data);
                console.log(responseAllAppointments.data);
                setLoading(false);
            });



        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        ViewUpcomingAppointments();
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
            {allAppointments.map((appointment, index) => (
                <Card key={index} variant="outlined" sx={{ maxWidth: 800, margin: 'auto', padding: 2, borderRadius: 4, boxShadow: 3, marginBottom: '20px' }}>
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
                    {/* <Button fullWidth variant="contained" color="primary">
                    View Details
                </Button> */}
                </Card>
            ))}
        </DashboardLayout>
    );
};

export default ViewUpcomingAppointmentsAdmin;
