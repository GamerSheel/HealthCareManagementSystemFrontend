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

const ViewFeedback = () => {
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState(null);

    const allFeedbacks = async () => {
            try {
                const responseFeedbacks = await axios.get('http://localhost:8080/feedback/allFeedbacks', 
                    // headers: {
                    //     Authorization: `Bearer ${token}`,
                    // },
                ).then((responseFeedbacks) => {
                    // Handle successful response
                    setFeedback(responseFeedbacks.data);
                    console.log(responseFeedbacks.data);
                    setLoading(false);
                })
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setLoading(false);
            }
    };

    useEffect(() => {
        allFeedbacks();
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

    if (!feedback) {
        return (
            <DashboardLayout>
                <StyledContainer>
                    <Typography variant="h6">No feedback found</Typography>
                </StyledContainer>
            </DashboardLayout>
        );
    }


    return (
        <DashboardLayout>
            <Grid container spacing={2} >
                {feedback.map((feedbackobj, index) => (
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
                                        <Avatar alt={feedbackobj.patientId.firstName} src={feedbackobj.patientId.firstName} sx={{ width: '100px', height: '100px', }} />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <CardContent>
                                        {/* <Box display="flex" flexDirection="column" justifyContent="left" height="100%"> */}
                                        <Typography gutterBottom variant="h5" sx={{ textAlign: 'left', fontWeight: 'bold' }}>
                                            {feedbackobj.patientId.firstName}  {feedbackobj.patientId.lastName}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'left', display: 'flex' }} >
                                            <Typography sx={{ fontWeight: 'bold', marginRight: '4px' }}> About : </Typography> <Typography sx={{ wordWrap: 'break-word' }} >{feedbackobj.feedbackForWhom}</Typography>
                                        </Typography>
                                        <Typography sx={{ textAlign: 'left', display: 'flex' }}>
                                             <Typography sx={{
                                                overflowX: 'auto'
                                            }}
                                            // noWrap 
                                            >{feedbackobj.feedbackText}</Typography>
                                        </Typography>
                                        {/* </Box> */}
                                    </CardContent>

                                </Grid>
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

export default ViewFeedback;
