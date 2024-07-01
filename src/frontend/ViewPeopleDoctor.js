import React, { useState, useEffect , createContext } from 'react';
import {
    Card, CardContent, CardMedia, Typography, Grid, Box
    , Container, CircularProgress, Avatar, Button
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate , useLocation } from 'react-router-dom';
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

const ViewPeopleDoctor = () => {
    const token = localStorage.getItem('token');
    const [userData, setUserData] = useState();
    const [patientsUnderDoctor, setPatientsUnderDoctor] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    // const { doctor } = location.state || {};

    const viewAllPatientsUnderDoctor = async () => {
        try {
            const response = await axios.get('http://localhost:8080/currentLoginUser', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

            ).then(async (response) => {
                // Handle successful response
                setUserData(response.data);
                console.log(response.data);
                console.log(typeof response.data.email);

                const responsePatientsUnderDoctor = await axios.get('http://localhost:8080/getPatientsFromDoctor', {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    },
                    params: {
                        'doctorId': response.data.email,
                    },
                }).then((responsePatientsUnderDoctor) => {
                    // Handle successful response
                    setPatientsUnderDoctor(responsePatientsUnderDoctor.data);
                    console.log(responsePatientsUnderDoctor.data);
                    setLoading(false);
                })
            });

        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setLoading(false);
        }
    };

    const allAppointments =(patient) => {
        console.log(userData);
        navigate('/allAppointmentPatient'  ,{state : {'doctor':userData ,patient }});
    };
    
    useEffect(() => {
        viewAllPatientsUnderDoctor();
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

    if (!userData || !patientsUnderDoctor) {
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
                {patientsUnderDoctor.map((patient, index) => (
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
                            <Grid container sx={{padding : 2}}>
                                <Grid item xs={12} sm={3} sx={styles.avatarContainer}>
                                <Box >
                                        <Avatar alt={patient.firstName} src={patient.firstName}  sx={{width: '100px', height: '100px',}}/>
                                        </Box>
                                </Grid>
                                <Grid item xs={12} sm={9}  wrap="wrap">
                                    <CardContent>
                                        {/* <Box display="flex" flexDirection="column" justifyContent="left" height="100%"> */}
                                            <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }}>
                                                {patient.firstName}  {patient.lastName}
                                            </Typography>
                                            <Typography sx={{ textAlign:'left' ,display:'flex'}} >
                                            <Typography sx={{ fontWeight:'bold' , marginRight: '4px' }}> Gender : </Typography> <Typography sx={{ wordWrap: 'break-word'}} >{patient.gender}</Typography>
                                            </Typography>
                                            <Typography sx={{ textAlign:'left' ,display:'flex' }}>
                                            <Typography sx={{ fontWeight:'bold' , marginRight: '4px'}}> Email: </Typography>  <Typography sx={{ 
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
                                    <Button variant="contained" color="primary" fullWidth onClick={()=>allAppointments(patient)} >View Appointments</Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </DashboardLayout>
    );
};

export default ViewPeopleDoctor;
