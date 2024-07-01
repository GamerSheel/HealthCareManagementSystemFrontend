import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { HelpOutline as HelpIcon, InfoOutlined as InfoIcon, ContactSupportOutlined as ContactIcon, Dashboard } from '@mui/icons-material';
import DashboardLayout from './DashboardLayout';

const helpCenterStyles = {
    section: {
        padding: '40px 0',
    },
    card: {
        height: '100%',
        padding: '24px',
        textAlign: 'center',
        transition: 'transform 0.3s',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
    icon: {
        fontSize: '64px',
        marginBottom: '16px',
        color: '#1976d2',
    },
    divider: {
        margin: '24px 0',
    },
    button: {
        marginTop: '16px',
    },
};

const helpTopics = [
    { title: 'FAQs', icon: <HelpIcon style={helpCenterStyles.icon} />, description: 'Find answers to commonly asked questions.' },
    { title: 'Information', icon: <InfoIcon style={helpCenterStyles.icon} />, description: 'Learn more about our healthcare services.' },
    { title: 'Contact Us', icon: <ContactIcon style={helpCenterStyles.icon} />, description: 'Get in touch with our support team for assistance.' },
];

const HelpCenter = () => {
    return (
        <DashboardLayout>
        <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom align="center" style={helpCenterStyles.section}>
                Help Center
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {helpTopics.map((topic, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card style={helpCenterStyles.card}>
                            {topic.icon}
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    {topic.title}
                                </Typography>
                                <Typography variant="body1">
                                    {topic.description}
                                </Typography>
                                <Button variant="contained" color="primary" style={helpCenterStyles.button}>
                                    {topic.title === 'Contact Us' ? 'Contact Support' : 'Learn More'}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Divider style={helpCenterStyles.divider} />
            <Typography variant="h4" gutterBottom align="center" style={helpCenterStyles.section}>
                Additional Resources
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary="User Manual" secondary="Download our user manual for detailed instructions." />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Video Tutorials" secondary="Watch our video tutorials for visual guidance." />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Community Forum" secondary="Join our community forum to discuss with other users." />
                </ListItem>
            </List>
        </Container>
        </DashboardLayout>
    );
};

export default HelpCenter;
