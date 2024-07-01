import React from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import HealingIcon from '@mui/icons-material/Healing';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AccessibleIcon from '@mui/icons-material/Accessible';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import DashboardLayout from './DashboardLayout';

const services = [
  {
    title: 'Primary Care',
    description: 'Comprehensive primary care services to address all your health concerns  to help you maintain health.',
    icon: <HealingIcon style={{ fontSize: 50, color: '#1976d2' }} />,
    image: '/primary-care.jpg',
  },
  {
    title: 'Emergency Services',
    description: '24/7 emergency services to provide immediate care when you need it the most.',
    icon: <LocalHospitalIcon style={{ fontSize: 50, color: '#1976d2' }} />,
    image: '/emergency-services.jpg',
  },
  {
    title: 'Mental Health',
    description: 'Professional mental health services to support your well-being and health and to assist you.',
    icon: <PsychologyIcon style={{ fontSize: 50, color: '#1976d2' }} />,
    image: '/mental-health.jpg',
  },
  {
    title: 'Rehabilitation',
    description: 'Comprehensive rehabilitation services to aid in your recovery and health.',
    icon: <AccessibleIcon style={{ fontSize: 50, color: '#1976d2' }} />,
    image: '/rehabilitation.jpg',
  },
  {
    title: 'Preventive Care',
    description: 'Preventive care services to help you maintain optimal health.',
    icon: <HealthAndSafetyIcon style={{ fontSize: 50, color: '#1976d2' }} />,
    image: '/preventive-care.jpg',
  },
  {
    title: 'Patient Support',
    description: 'Dedicated patient support services to assist you every step of the way.',
    icon: <SentimentVerySatisfiedIcon style={{ fontSize: 50, color: '#1976d2' }} />,
    image: '/patient-support.jpg',
  },
];

const styles = {
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
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  media: {
    height: 140,
  },
  iconContainer: {
    textAlign: 'center',
    marginBottom: '16px',
  },
};

const Services = () => {
  return (
    <DashboardLayout>
    <Container maxWidth="lg">
      <Box style={styles.section}>
        <Typography variant="h3" gutterBottom textAlign="center">
          Our Services
        </Typography>
        <Typography variant="h6" textAlign="center" paragraph>
          We offer a wide range of healthcare services to meet all your needs.
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={styles.card}>
                <CardMedia
                  component="img"
                  alt={service.title}
                  height="140"
                  image={service.image}
                  title={service.title}
                  style={styles.media}
                />
                <CardContent>
                  <div style={styles.iconContainer}>{service.icon}</div>
                  <Typography variant="h5" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body1">
                    {service.description}
                  </Typography>
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

export default Services;
