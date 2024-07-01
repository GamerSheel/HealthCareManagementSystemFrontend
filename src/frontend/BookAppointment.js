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
const BookAppointment = () => {
    const location = useLocation();
    const { doctor } = location.state || {};
    const  {AppointmentDate , StartTime , EndTime}  = useParams();
    console.log("im book appointment");
    console.log(AppointmentDate);
    // const selectDate = AppointmentDate.toLocaleDateString([], { day: '2-digit', month: '2-digit' , year:'numeric'});
    console.log(StartTime);
    console.log(EndTime);
    // console.log(selectDate);
    
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        appointmentDate: AppointmentDate,
        forWhichPerson: '',
        issue: '',
        status: 'done',
        doctorId: doctor['email'],
        patientId: '',
        startTime : StartTime,
        endTime : EndTime,
        age:'',
    });

    // if (location.state) {
    //     setMessage(location.state.message);
    //     setOpen(true);
    //     // Use the message here (e.g., display it on the screen)
    //   } else {
    //     // Handle cases where no message was passed
    //   }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {

        // const appointmentDate = formData['appointmentDate'];
        // const changeFormatAppointmentDate = appointmentDate[7]+appointmentDate[8]+"/"+ appointmentDate[5]+appointmentDate[6]+"/" 
        // + appointmentDate[0]+appointmentDate[1]+appointmentDate[2]+appointmentDate[3];

        // setFormData((prevData) => ({
        //     ...prevData,
        //     ['appointmentDate']: changeFormatAppointmentDate,
        // }))

        event.preventDefault();
        // Handle form submission

        try {
            console.log(formData)
            const response = await fetch('http://localhost:8080/appointment/bookAppointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                // withCredentials: true,
                body: JSON.stringify(formData),
            });


            if (response.ok) {
                setMessage('Appointment created successfully');
                setOpen(true);
                setTimeout(() => {
                    navigate('/', { message: "Appointment created successfully" });
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
                <Typography variant="h6">No user data found</Typography>
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
                        Create an Appointment with 
                    </Typography>
                    <Typography component="h1" variant="h5" fontWeight="bold" sx={{mb : 2}}>{doctor.firstName} {doctor.lastName}</Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <Grid container spacing={2}>


                            {/* <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Select date"
                                    type="date"
                                    // defaultValue={new Date()}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="appointmentDate"
                                    value={formData.appointmentDate}
                                    onChange={handleChange}
                                />
                            </Grid> */}

                            {/* <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Select Start Time"
                                    type="time"
                                    // defaultValue={new Date()}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Select End Time"
                                    type="time"
                                    // defaultValue={new Date()}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                />
                            </Grid> */}
                            <Grid item xs={12} >
                                <TextField
                                    // variant="outlined"
                                    // required
                                    fullWidth
                                    value={100000}
                                    InputProps={{
                                        readOnly: true, // Makes the field read-only
                                        // disableUnderline: true, // Optionally remove underline
                                    }}
                                    id="fees"
                                    label="Fees"
                                    name="fees"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="forWhichPerson"
                                    label="Name of the Person for which appointment is being created"
                                    name="forWhichPerson"
                                    value={formData.forWhichPerson}
                                    onChange={handleChange}
                                    autoComplete="forWhichPerson"
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="age"
                                    label="Age of the Person"
                                    name="age"
                                    value={formData.age}
                                    autoComplete="age"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    rows='4'
                                    id="issue"
                                    label="Issue"
                                    name="issue"
                                    value={formData.issue}
                                    autoComplete="issue"
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
                            Make Payment
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

export default BookAppointment;