import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Grid , Snackbar , InputLabel } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
const SignupForm = ({doctor}) => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        role: doctor?'2':'3',
        password: '',
        gender: '',
        mobileNumber: '',
        address: '',
        authority: doctor?'ROLE_DOCTOR':'ROLE_PATIENT',
    });


    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // React Router hook for navigation
    const gender = ['Male', 'Female', 'Other'];
    const [selectedGender, setSelectedGender] = React.useState('');
    const today = new Date();
    const tenYearsInMilliseconds = 10 * 365 * 24 * 60 * 60 * 1000;
    const date10YearsAgo = new Date(today.getTime() - tenYearsInMilliseconds);
      // Calculate the maximum allowed date
  const maxDate = new Date(); // Get the current date
  maxDate.setFullYear(maxDate.getFullYear() - 10); // Subtract 10 years

  // Format the maximum date to "YYYY-MM-DD"
  const maxDateString = maxDate.toISOString().split('T')[0];


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if(name === "gender"){ setSelectedGender(event.target.value);}
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission logic

        try {
            console.log(formData)
            // const response = await axios.post('http://localhost:8080/signup', {formData});
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                
                
            });
            if (response.ok) {
                if(doctor)setMessage("Added the doctor Successfully");
                else 
                setMessage('Form submitted successfully!');
                setOpen(true);
                setTimeout(() => {
                    if(doctor){
                    navigate('/viewalldoctors' , {message:"Added the doctor Successfully"});
                    }else{
                    navigate('/login' , {message:"Form Submitted Successfully"});
                    }
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

                <Typography component="h1" variant="h5">
                   {doctor? "Add a Doctor" : "Sign Up"}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                autoComplete="fname"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                autoComplete="lname"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="mobileNumber"
                                label="Mobile Number"
                                id="mobileNumber"
                                autoComplete="mobileNo"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>

                        {/* <InputLabel id="select-label"         htmlFor="gender"
        sx={{ color: 'blue' }}></InputLabel> */}
                            <Select labelId="select-label"
                                sx={{ color: "black", }}
                                variant="outlined"
                                required
                                fullWidth
                                id="gender"
                                name="gender"
                                label="Gender"
                                value={selectedGender}
                                // onChange={handleGender}
                                autoComplete="gender"
                                onChange={handleChange}
                                
                            >
                                {gender.map((gen) => (
                                    
                                    <MenuItem key={gen} value={gen}>
                                        {gen}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Select DOB"
                                type="date"
                                // defaultValue={new Date()}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                  inputProps={{
                                    max: maxDateString, // Set the maximum allowed date
                                  }}
                                name="dob"
                                helperText="DOB should be 10 years before today's Date"
                                value={formData.dob}
                                min={date10YearsAgo}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                // multiline
                                // rows={4}
                                name="address"
                                label="Address"
                                id="address"
                                autoComplete="address"
                                value={formData.address}
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
                        {doctor?"Add a New Doctor" : "Sign Up"}
                    </Button>

                    <Grid container sx={{display:'flex' ,justifyContent:'center', textAlign:'center'}}>
            <Grid item >
              <Button variant="text" color="primary" onClick={()=>navigate('/login')} >
                {"Already have an account? Sign In"}
              </Button>
            </Grid>
          </Grid>
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

export default SignupForm;


/* <Grid item xs={12}>
<TextField
variant="outlined"
required
fullWidth
name="confirmPassword"
label="Confirm Password"
type="password"
id="confirmPassword"
autoComplete="new-password"
/>
</Grid> */