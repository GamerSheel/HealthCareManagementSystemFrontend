import React, { useState, useEffect, createContext } from 'react';
import {
    Card, CardContent, CardMedia, Typography, Grid, Box
    , Container, CircularProgress, Avatar, Button, Snackbar
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

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

const AllPatients = ({doctor}) => {
    const token = localStorage.getItem('token');
    const [allUsersAdmin, setAllUsersAdmin] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    // const { doctor } = location.state || {};

    const deleteDoctor = async(patient)=>{
        console.log(patient.email);
        try {
            const response = await axios.delete('http://localhost:8080/deleteUser', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params :{
                    email:patient.email,
                },
            }).then((response) => {
                // Handle successful response
                setMessage("Doctor Deleted Successfully");
                setOpen(true);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                console.log(response);
                
            })
        } catch (error) {
            setMessage('Failed to submit form');
            setOpen(true);
            console.error('Failed to fetch user data:', error);
            setLoading(false);
        }
    }

    const allUsersAdminInterface = async () => {
        if(doctor){
            try {
                const responseAllPatients = await axios.get('http://localhost:8080/findByAuthority', {
                    headers: {
                        Authorization: `Bearer ${token}`,
    
                    },
                }).then((responseAllPatients) => {
                    // Handle successful response
                    setAllUsersAdmin(responseAllPatients.data);
                    console.log(responseAllPatients.data);
                    setLoading(false);
                })
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setLoading(false);
            }
        }else{

        
        try {
            const responseAllPatients = await axios.get('http://localhost:8080/getAllPatients', {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            }).then((responseAllPatients) => {
                // Handle successful response
                setAllUsersAdmin(responseAllPatients.data);
                console.log(responseAllPatients.data);
                setLoading(false);
            })
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setLoading(false);
        }
    }
    };

    const allAppointments = (patient) => {
        if(doctor){
            navigate('/schedule', { state: { 'doctor': patient } });
        }else{
        navigate('/allAppointmentPatient', { state: { 'doctor': null, patient } });
        }
    };

    const fullDetails = (patient) => {
        navigate('/dashboard', { state: { 'user':patient } });
    };

    useEffect(() => {
        allUsersAdminInterface();
    }, [doctor]);


    if (loading) {
        return (
            <DashboardLayout>
                <StyledContainer>
                    <CircularProgress />
                </StyledContainer>
            </DashboardLayout>
        );
    }

    if (!allUsersAdmin) {
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
            <Grid container spacing={2} >
                {allUsersAdmin.map((patient, index) => (
                    <Grid item xs={10} sm={12} md={6} key={index} >
                        <Card
                            sx={{
                                // margin: 'auto',
                                boxShadow: 3,
                                borderRadius: 2,
                                overflow: 'hidden',
                                // transition: 'transform 0.3s, box-shadow 0.3s',
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
                                <Grid item xs={12} sm={9}>
                                    <CardContent>
                                        {/* <Box display="flex" flexDirection="column" justifyContent="left" height="100%"> */}
                                        <Typography gutterBottom variant="h5" sx={{ textAlign: 'left', fontWeight: 'bold' }}>
                                            {patient.firstName}  {patient.lastName}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'left', display: 'flex' }} >
                                            <Typography sx={{ fontWeight: 'bold', marginRight: '4px' }}> Gender : </Typography> <Typography sx={{ wordWrap: 'break-word' }} >{patient.gender}</Typography>
                                        </Typography>
                                        <Typography sx={{ textAlign: 'left', display: 'flex' }}>
                                            <Typography sx={{ fontWeight: 'bold', marginRight: '4px' }}> Email: </Typography>  <Typography sx={{
                                                //   textOverflow: 'ellipsis', 
                                                //   overflow: 'hidden', 
                                                //   whiteSpace: 'nowrap', 
                                                //   maxWidth: '150px' 
                                                overflowX: 'auto'
                                            }}
                                            // noWrap 
                                            >{patient.email}</Typography>
                                        </Typography>
                                        {/* </Box> */}
                                    </CardContent>

                                </Grid>
                                {/* <Box display="flex" justifyContent="space-between" width="100%" gap={2}> */}
                                <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Button variant="outlined" fullWidth color="primary"  onClick={() => fullDetails(patient)} >Show Full Details</Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <Button variant="outlined" fullWidth color="primary"  onClick={() => allAppointments(patient)} >
                                        {doctor? "See Schedule" : "View Appointments"}
                                        </Button>
                                    </Grid>
                                    {doctor?
                                    <Grid item xs={12} sm={12}>
                                    <Button variant="outlined" fullWidth color="error"  onClick={() => deleteDoctor(patient)} >Delete Doctor</Button>
                                    </Grid>
                                    :<></>}
                                    </Grid>


                                {/* </Box> */}
                            </Grid>


                            
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={message}
      />

        </DashboardLayout>
    );
};

export default AllPatients;
