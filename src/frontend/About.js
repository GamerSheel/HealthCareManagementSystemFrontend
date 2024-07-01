import React from 'react';
import { Container, Grid, Typography, Card, CardContent, Avatar, Box } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PeopleIcon from '@mui/icons-material/People';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Dashboard } from '@mui/icons-material';
import DashboardLayout from './DashboardLayout';

const aboutStyles = {
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
    avatar: {
        width: '150px',
        height: '150px',
        margin: '0 auto 16px auto',
    },
    teamCard: {
        margin: '16px',
        padding: '16px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    missionCard: {
        margin: '16px',
        padding: '16px',
        backgroundColor: '#1976d2',
        borderRadius: '16px',
        color: '#ffffff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
};

const teamMembers = [
    { name: 'Dr. John Doe', role: 'Chief Medical Officer', avatarUrl: '/avatar1.jpg' },
    { name: 'Dr. Jane Smith', role: 'Head of Surgery', avatarUrl: '/avatar2.jpg' },
    { name: 'Dr. Richard Roe', role: 'Head of Pediatrics', avatarUrl: '/avatar3.jpg' },
];

const About= () => {
    return (
        <DashboardLayout>
        <Container maxWidth="lg">
            <Box style={aboutStyles.section}>
                <Typography variant="h3" gutterBottom textAlign="center">
                    About Us
                </Typography>
                <Typography variant="h6" textAlign="center" paragraph>
                    We are dedicated to providing the best healthcare services to our patients.
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Card style={aboutStyles.card}>
                            <MedicalServicesIcon style={aboutStyles.icon} />
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Quality Care HMS
                                </Typography>
                                <Typography variant="body1">
                                    Our medical professionals are highly skilled to ensure your health and well-being.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card style={aboutStyles.card}>
                            <PeopleIcon style={aboutStyles.icon} />
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Experienced Team
                                </Typography>
                                <Typography variant="body1">
                                    Our team of experts brings a wealth of knowledge to deliver healthcare services.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card style={aboutStyles.card}>
                            <VerifiedIcon style={aboutStyles.icon} />
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Trusted Services
                                </Typography>
                                <Typography variant="body1">
                                    We are committed to earning your trust by providing reliable and compassionate care.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Box style={aboutStyles.section}>
                <Typography variant="h4" gutterBottom textAlign="center">
                    Our Mission
                </Typography>
                <Card style={aboutStyles.missionCard}>
                    <CardContent>
                        <Typography variant="body1">
                            Our mission is to enhance the health and well-being of the communities we serve by providing the highest quality medical care, promoting wellness, and advancing medical knowledge through research and education.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box style={aboutStyles.section}>
                <Typography variant="h4" gutterBottom textAlign="center">
                    Meet Our Team
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {teamMembers.map((member, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card style={aboutStyles.teamCard}>
                                <Avatar alt={member.name} src={member.avatarUrl} style={aboutStyles.avatar} />
                                <CardContent>
                                    <Typography variant="h6">{member.name}</Typography>
                                    <Typography variant="body1">{member.role}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
        </DashboardLayout>
    );
};

export default About;
