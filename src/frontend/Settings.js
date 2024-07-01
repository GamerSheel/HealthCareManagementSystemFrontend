import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Avatar,
    Box,
    Container,
    CssBaseline,
    Paper,
    Typography,
    Grid,
    Divider,
    CircularProgress,
    IconButton, Card, CardContent, TextField, Button,Select,MenuItem, Snackbar
} from '@mui/material';
import { styled } from '@mui/system';
import DashboardLayout from './DashboardLayout';
import { PhoneIcon, Person } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

const StyledContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '180vh',
    backgroundColor: 'Lavender',
});

const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
});

const StyledPaper = styled(Paper)({
    padding: '24px',
    marginTop: '24px',
    width: '100%',
    backgroundColor: 'Snow',
});

const styles = {
    card: {
        // margin: '16px',
        marginTop: '40px',
        padding: '5px',
        backgroundColor: 'Snow',
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {

        marginBottom: '20px',
        color: '#1976d2',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
    },
    button: {
        marginTop: '20px',
    },
};

const Settings = () => {

    const [editMode, setEditMode] = useState({
        name: false,
        dob: false,
        address: false,
        email: false,
        mobileNumber: false,
        gender: false,
    });

    const [formData, setFormData] = useState({
        name:'',
        email: '',
        dob: '',
        gender: '',
        mobileNumber: '',
        address: '',
    });

        
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedGender, setSelectedGender] = React.useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const gender = ['Male', 'Female', 'Other'];
    

    const [pwdData, setPwdData] = useState({
        email:'',
        currentPassword :'',
        newPassword:'',
        againPassword:'',
    });

const submitChangePassword = async (event) =>{
    event.preventDefault();
    // Handle form submission logic

    try {
        if(pwdData['newPassword']!=pwdData['againPassword']){
            setMessage('New Password and Confirm Password do not match');
            setOpen(true);
        }
        else{

        
        console.log(pwdData);
        // const response = await axios.post('http://localhost:8080/signup', {formData});
        const response = await fetch('http://localhost:8080/changePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pwdData),
        });
        if (response.ok) {
            setMessage('Password Form submitted successfully!');
            setOpen(true);
            setTimeout(() => {
                window.location.reload();
            }, 3000); // Redirect after 3 seconds
        } else {
            setMessage('Failed to submit form');
            setOpen(true);
        }
    }

    } catch (error) {
        console.log(pwdData)
        setMessage('Error: ' + error.message);
        setOpen(true);
    }
}

const handlePwdChange = (event) => {
    const { name, value } = event.target;
    // console.log("in handle pwd change");
    // console.log(pwdData)
    setPwdData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

const PasswordChange = () => (
    <Card style={styles.card}>
        <CardContent>
            <Typography variant="h5" style={styles.header}>Change Password</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth label="Current Password" variant="outlined" type="password" value={pwdData.currentPassword} onChange={handlePwdChange}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="New Password" variant="outlined" type="password" value={pwdData.newPassword} onChange={handlePwdChange}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Confirm New Password" variant="outlined" type="password" value={pwdData.againPassword} onChange={handlePwdChange} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth style={styles.button} onClick={submitChangePassword} >Change Password</Button>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);


    const handleEditToggle = (arg) => {
        console.log(arg);
        setEditMode({
            ...editMode,
            [arg]: true,
        });
        console.log("in handleEditToggle");
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if(name === "gender"){ setSelectedGender(event.target.value);}
    };

    const submitSettings = async (event) => {
        event.preventDefault();
        // Handle form submission logic

        try {
            console.log(formData);
            // const response = await axios.post('http://localhost:8080/signup', {formData});
            const response = await fetch('http://localhost:8080/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(response);
            if (response.ok) {
                setMessage('Settings Form submitted successfully!');
                setOpen(true);
                setTimeout(() => {
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

    const setEditModeFalse = () => {
        setEditMode({
            ['name']: false,
            ['dob']: false,
            ['address']: false,
            ['email']: false,
            ['mobileNumber']: false,
            ['gender']: false,
        })
    }

    const loggedInUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/currentLoginUser', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                // Handle successful response
                setUserData(response.data);
                setLoading(false);
                setFormData({
                    ...formData,
                    ['name']: response.data.firstName+" "+response.data.lastName,
                    ['email']: response.data.email,
                    ['dob']: response.data.dob,
                    ['gender']: response.data.gender,
                    ['mobileNumber']: response.data.mobileNumber,
                    ['address']: response.data.address,
                });
                setPwdData({
                    ...pwdData,
                    ['email'] : response.data.email,
                })
                setSelectedGender(response.data.gender)
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
            <DashboardLayout>
                <StyledContainer>
                    <CircularProgress />
                </StyledContainer>
            </DashboardLayout>
        );
    }

    if (!userData) {
        return (
            <DashboardLayout>
                <StyledContainer>
                    <Typography variant="h6">No user data found</Typography>
                </StyledContainer>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <StyledContainer component="main" maxWidth="md">
                <CssBaseline />
                <StyledBox>
                    <Avatar
                        style={{ width: 80, height: 80, marginBottom: '16px', color: "DarkViolet", backgroundColor: 'Plum', }}
                        alt={userData.name}
                    //   src="/static/images/avatar/1.jpg"
                    />
                    <Typography variant="h4" component="h1" gutterBottom>
                        User Details
                    </Typography>
                    <StyledPaper>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>

                                <Typography variant="h6" gutterBottom color="primary">
                                    Name
                                    <IconButton color="primary" onClick={() => handleEditToggle('name')}>
                                        <EditIcon fontSize='small' />
                                    </IconButton>
                                </Typography>


                                {editMode.name ?

                                    <TextField
                                        label="Name"
                                        name="name"
                                        // defaultValue={`${userData.firstName} ${userData.lastName}`}
                                        variant="outlined"
                                        value={formData.name}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    :
                                    <Typography variant="body1">{userData.firstName} {userData.lastName}</Typography>
                                }
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom color="primary">
                                    Email
                                    {/* <IconButton color="primary" onClick={() => handleEditToggle('email')}>
                                        <EditIcon fontSize='small' />
                                    </IconButton> */}
                                </Typography>

                                {/* {editMode.email ?
                                    <TextField
                                        label="Email"
                                        name="email"
                                        defaultValue={userData.email}
                                        variant="outlined"
                                        value={formData.email}
                                        fullWidth
                                    />
                                    : */}
                                    <Typography variant="body1">{userData.email}</Typography>
                                {/* } */}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom color="primary">
                                    Date of Birth
                                    <IconButton color="primary" onClick={() => handleEditToggle('dob')}>
                                        <EditIcon fontSize='small' />
                                    </IconButton>
                                </Typography>

                                {editMode.dob ?
                                    <TextField
                                        // label="Date of Birth"
                                        name="dob"
                                        type="date"
                                        value={formData.date}
                                        // defaultValue={userData.dob}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                    :

                                    <Typography variant="body1">{userData.dob}</Typography>
                                }
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom color="primary">
                                    Gender
                                    <IconButton color="primary" onClick={() => handleEditToggle('gender')}>
                                        <EditIcon fontSize='small' />
                                    </IconButton>
                                </Typography>
                                {editMode.gender?
                                                            <Select
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
                                    //         <TextField
                                    //         label="Gender"
                                    //         name="gender"
                                    //         defaultValue={userData.gender}
                                    //         variant="outlined"
                                    //         fullWidth
                                    //   />
                                      :
                                
                                <Typography variant="body1">{userData.gender}</Typography>
                                }
                                </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom color="primary">
                                    Address
                                    <IconButton color="primary" onClick={() => handleEditToggle('address')}>
                                        <EditIcon fontSize='small' />
                                    </IconButton>
                                </Typography>
                                {editMode.address?
                                            <TextField
                                            label="Address"
                                            name="address"
                                            // defaultValue={userData.address}
                                            variant="outlined"
                                            fullWidth
                                            value={formData.address}
                                            onChange={handleChange}
                                      />
                                      :
                                <Typography variant="body1">{userData.address}</Typography>
                                }
                                </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom color="primary">
                                    Mobile Number
                                    <IconButton color="primary" onClick={() => handleEditToggle('mobileNumber')}>
                                        <EditIcon fontSize='small' />
                                    </IconButton>

                                </Typography>
                                {editMode.mobileNumber?
                                            <TextField
                                            label="Mobile Number"
                                            name="mobileNumber"
                                            // defaultValue={userData.mobileNumber}
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                            variant="outlined"
                                            fullWidth
                                      />
                                      :
                                
                                <Typography variant="body1">{userData.mobileNumber}</Typography>
                                }
                                </Grid>

                            <Grid item xs={12} sm={6}>

                                <Button variant="contained" color="error" fullWidth style={styles.button} onClick={setEditModeFalse}>Cancel</Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <Button variant="contained" color="primary" fullWidth style={styles.button} onClick={submitSettings}>Save Changes</Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {/* <PasswordChange /> */}

                            <Card style={styles.card}>
        <CardContent>
            <Typography variant="h5" style={styles.header}>Change Password</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth name="currentPassword" label="Current Password" variant="outlined" type="password" value={pwdData.currentPassword} onChange={handlePwdChange}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="New Password" name="newPassword" variant="outlined" type="password" value={pwdData.newPassword} onChange={handlePwdChange}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Confirm New Password" name="againPassword" variant="outlined" type="password" value={pwdData.againPassword} onChange={handlePwdChange} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth style={styles.button} onClick={submitChangePassword} >Change Password</Button>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
                        </Grid>
                        {/* <Divider style={{ margin: '24px 0' }} /> */}
                        {/* <Typography variant="body2" color="textSecondary" align="center">
            © 2024 MyWebsite
          </Typography> */}
                    </StyledPaper>
                </StyledBox>
            </StyledContainer>
            <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={message}
      />
        </DashboardLayout>
    );
};

export default Settings;
