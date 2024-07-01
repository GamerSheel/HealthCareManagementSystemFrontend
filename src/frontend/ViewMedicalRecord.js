import React from 'react';
import { Container, Box, Typography, Button, Grid, Card, CardContent, Paper } from '@mui/material';
import { styled } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import NotesIcon from '@mui/icons-material/Notes';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BadgeIcon from '@mui/icons-material/Badge';
import DescriptionIcon from '@mui/icons-material/Description';
import { Dashboard } from '@mui/icons-material';
import DashboardLayout from './DashboardLayout';

const StyledCard = styled(Card)({
  margin: '16px',
  padding: '16px',
  backgroundColor: '#f9f9f9',
  borderRadius: '16px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

const CardContentItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
});

const IconBox = styled(Box)({
  marginRight: '8px',
});

const MedicalRecordsCard = ({ record }) => {
  return (
    <StyledCard>
      <CardContent>
        <CardContentItem>
          <IconBox>
            <PersonIcon color="primary" />
          </IconBox>
          <Typography variant="body1"><strong>Patient ID:</strong> {record.patientId}</Typography>
        </CardContentItem>
        <CardContentItem>
          <IconBox>
            <DescriptionIcon color="primary" />
          </IconBox>
          <Typography variant="body1"><strong>Doctor Description:</strong> {record.doctorDescription}</Typography>
        </CardContentItem>
        <CardContentItem>
          <IconBox>
            <NotesIcon color="primary" />
          </IconBox>
          <Typography variant="body1"><strong>Prescription Notes:</strong> {record.prescriptionNotes}</Typography>
        </CardContentItem>
        <CardContentItem>
          <IconBox>
            <CalendarTodayIcon color="primary" />
          </IconBox>
          <Typography variant="body1"><strong>Date:</strong> {record.date}</Typography>
        </CardContentItem>
        <CardContentItem>
          <IconBox>
            <BadgeIcon color="primary" />
          </IconBox>
          <Typography variant="body1"><strong>Doctor ID:</strong> {record.doctorId}</Typography>
        </CardContentItem>
        <Button variant="contained" color="primary" fullWidth>
          View More Details
        </Button>
      </CardContent>
    </StyledCard>
  );
};

const medicalRecords = [
  {
    patientId: 'P001',
    doctorDescription: 'General Physician',
    prescriptionNotes: 'Take two tablets daily after meals.',
    date: '2024-06-10',
    doctorId: 'D123',
  },
  // Add more records as needed
];

const ViewMedicalRecords = () => {
  return (
    <DashboardLayout>
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Medical Records
      </Typography>
      <Grid container spacing={2}>
        {medicalRecords.map((record, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <MedicalRecordsCard record={record} />
          </Grid>
        ))}
      </Grid>
    </Container>
    </DashboardLayout>
  );
};

export default ViewMedicalRecords;
