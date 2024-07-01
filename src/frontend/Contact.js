import React from 'react';
import { Container, Grid, Typography, Card, CardContent, TextField, Button, Box } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Dashboard } from '@mui/icons-material';
import DashboardLayout from './DashboardLayout';

const contactStyles = {
    section: {
        padding: '40px 0',
        backgroundColor: '#f7f7f7',
    },
    card: {
        margin: '16px',
        padding: '16px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    icon: {
        fontSize: '64px',
        marginBottom: '16px',
        color: '#1976d2',
    },
    form: {
        marginTop: '16px',
    },
    button: {
        marginTop: '16px',
    },
};

const Contact = () => {
    return (
        <DashboardLayout>
        <Container maxWidth="lg">
            <Box style={contactStyles.section}>
                <Typography variant="h3" gutterBottom textAlign="center">
                    Contact Us
                </Typography>
                <Typography variant="h6" textAlign="center" paragraph>
                    We are here to assist you. Please get in touch using the information below.
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Card style={contactStyles.card}>
                            <PhoneIcon style={contactStyles.icon} />
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Phone
                                </Typography>
                                <Typography variant="body1">
                                    +1 234 567 890
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card style={contactStyles.card}>
                            <EmailIcon style={contactStyles.icon} />
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Email
                                </Typography>
                                <Typography variant="body1">
                                    contact@healthcare.com
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card style={contactStyles.card}>
                            <LocationOnIcon style={contactStyles.icon} />
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Address
                                </Typography>
                                <Typography variant="body1">
                                    123 Healthcare Street, City, Country
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Box style={contactStyles.section}>
                <Typography variant="h4" gutterBottom textAlign="center">
                    Send Us a Message
                </Typography>
                <Box component="form" sx={contactStyles.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Subject"
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Message"
                                variant="outlined"
                                required
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={contactStyles.button}
                            >
                                Send Message
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
        </DashboardLayout>
    );
};

export default Contact;
