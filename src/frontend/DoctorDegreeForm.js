// degree
// institute
// year
// doctor id email
// degree id


import React, { useState } from 'react';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, Snackbar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const DoctorDegreeForm = () => {
  const [formData, setFormData] = useState({
    degree: '',
    institute: '',
    year: '',
    doctorId: '',
  });

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  if (location.state) {
    setMessage(location.state.message);
    setOpen(true);
    // Use the message here (e.g., display it on the screen)
  } else {
    // Handle cases where no message was passed
  }

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
      console.log(formData);
      
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/degree/saveDoctorDegree', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
        body: JSON.stringify(formData),
      });


      if (response.ok) {
        setMessage('Doctor Degree Data submitted successfully');
        setOpen(true);
        setTimeout(() => {
          navigate('/doctorDegreeForm', { message: "Doctor Degree Data submitted successfully" });
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

  return (
    <DashboardLayout>
      <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 8,
            p: 3,
            border: '1px solid #ccc',
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Add Doctor's Degrre
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  // margin="normal"
                  required
                  fullWidth
                  id="doctorId"
                  label="Doctor Email"
                  name="doctorId"
                  autoComplete="doctorId"
                  autoFocus
                  value={formData.doctorId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  // margin="normal"
                  required
                  fullWidth
                  name="institute"
                  label="Institute"
                  id="institute"
                  autoComplete='institute'
                  value={formData.institute}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="degree"
                  label="Degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  autoComplete="degree"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="year"
                  label="Year"
                  name="year"
                  type="number"
                  value={formData.year}
                  autoComplete="year"
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
              Submit Doctor's Degree
            </Button>
          </Box>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message={message}
        />
      </Container>
    </DashboardLayout>
  );
};

export default DoctorDegreeForm;


