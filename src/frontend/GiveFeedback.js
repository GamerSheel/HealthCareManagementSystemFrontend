import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    CircularProgress,
    Container,
    Box,
    TextField, Button,
     Grid , Snackbar
} from '@mui/material';
import { Dashboard } from '@mui/icons-material';
import DashboardLayout from './DashboardLayout';
import axios from 'axios';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

const StyledContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'Lavender',
});

const styles = {
    card: {
        margin: '16px',
        padding: '16px',
        backgroundColor: 'GhostWhite',
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
    },
    avatarContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '16px',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '8px',
    },
}
const GiveFeedback = () => {    
    const [open, setOpen] = useState(false); //SnackBar
    const [message, setMessage] = useState(''); // SnackBar
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        FeedbackforWhom: '',
        Feedback: '',  
        patientId: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();
        // Handle form submission

        try {
            console.log(formData)
            const response = await fetch('http://localhost:8080/feedback/feedbackform', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                // withCredentials: true,
                body: JSON.stringify(formData),
            });


            if (response.ok) {
                setMessage('Feedback submitted successfully');
                setOpen(true);
                setTimeout(() => {
                    navigate('/viewfeedback');
                    window.location.reload();
                }, 3000); // Redirect after 3 seconds


            } else {
                setMessage('Failed to submit form');
                setOpen(true);
            }
        } catch (error) {
            console.log(formData)
            setMessage('Error: ' + error.message);
            setOpen(true);
        }
    };

    const loggedInUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/currentLoginUser', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                // Handle successful response
                setFormData((prevData) => ({
                    ...prevData,
                    ['patientId']: response.data.email,
                }));
                setUserData(response.data);
                setLoading(false);
                console.log(response.data);
            });

        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        loggedInUser();
    }, []);

    if (loading) {
        return (
            <StyledContainer>
                <CircularProgress />
            </StyledContainer>
        );
    }

    if (!userData) {
        return (
            <StyledContainer>
                <Typography variant="h6">Cannot submit feedback</Typography>
            </StyledContainer>
        );
    }

   

    return (
        <DashboardLayout>
            <Container maxWidth="sm">
                <Box
                    sx={{
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        mb: 4,
                    }}
                >

                    <Typography component="h1" variant="h6" >
                        Give Your Feedback Here 
                    </Typography>
                    <Typography component="h1" variant="h5" fontWeight="bold" sx={{mb : 2}}></Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="FeedbackforWhom"
                                    label="Feedback for Whom"
                                    name="FeedbackforWhom"
                                    value={formData.FeedbackforWhom}
                                    onChange={handleChange}
                                    autoComplete="FeedbackforWhom"
                                />
                            </Grid>

                            <Grid item xs={12} >
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    rows='4'
                                    id="Feedback"
                                    label="Feedback"
                                    name="Feedback"
                                    value={formData.Feedback}
                                    autoComplete="Feedback"
                                    onChange={handleChange}
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit Feedback
                        </Button>
                    </Box>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={() => setOpen(false)}
                        message={message}
                    />
                </Box>

            </Container>
        </DashboardLayout>
    );
};

export default GiveFeedback;