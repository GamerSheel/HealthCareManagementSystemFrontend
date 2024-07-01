import React, { useState } from 'react';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, Snackbar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';
import DashboardLayout from './DashboardLayout';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [redirect , setRedirect] = useState('/');
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
      console.log(formData)
      // const response = await axios.post('http://localhost:8080/signup', {formData});
      
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // withCredentials: true,
        body: JSON.stringify(formData),
      });


      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        setMessage('Logged in successfully');
        setOpen(true);
        setTimeout(() => {
          navigate('/' , { message: "Logged In Successfully" });
          window.location.reload();
        }, 3000); // Redirect after 3 seconds
        
        
      } else {
        setMessage('Failed to submit form');
        setOpen(true);
      }
    } catch (error) {
      console.log("failed fetching in login")
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
          // mt: 8,
          p: 3,
          border: '1px solid #ccc',
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container sx={{display:'flex' ,justifyContent:'center', textAlign:'center'}}>
            <Grid item >
              <Button variant="text" color="primary" onClick={()=>navigate('/signup')} >
                {"Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
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

export default LoginForm;


