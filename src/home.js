// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import { useGridPrivateApiContext } from '@mui/x-data-grid/internals';
// import Sidebar from './frontend/Sidebar';
// // import { Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Toolbar, AppBar, Typography } from '@mui/material';
// import { Home, Dashboard, AccountCircle, Settings } from '@mui/icons-material';
// import HomeIcon from '@mui/icons-material/Home';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import SettingsIcon from '@mui/icons-material/Settings';
// import DashboardLayout from './frontend/DashboardLayout';
// import { Container, Grid, Typography, Paper } from '@mui/material';
// import {  Box,  Button, Card, CardContent, CardMedia } from '@mui/material';
// import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
// import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
// import HealingIcon from '@mui/icons-material/Healing';



// const drawerWidth = 240;


// const homePageStyles = {
//     heroSection: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '60vh',
//       backgroundColor: '#1976d2',
//       color: '#fff',
//       padding: '40px 0',
//     },
//     heroContent: {
//       textAlign: 'center',
//     },
//     heroTitle: {
//       fontSize: '3rem',
//       fontWeight: 'bold',
//       marginBottom: '20px',
//     },
//     heroSubtitle: {
//       fontSize: '1.5rem',
//       marginBottom: '20px',
//     },
//     heroButton: {
//       marginTop: '20px',
//       padding: '10px 20px',
//       backgroundColor: '#fff',
//       color: '#1976d2',
//       fontWeight: 'bold',
//     },
//     servicesSection: {
//       padding: '40px 0',
//     },
//     serviceCard: {
//       maxWidth: 345,
//       margin: 'auto',
//     },
//     serviceMedia: {
//       height: 140,
//     },
//     sectionTitle: {
//       textAlign: 'center',
//       marginBottom: '40px',
//       color: '#1976d2',
//     },
//   };

// const HomePage = () => {
//     const [userData, setUserData] = useState(null);

//     const loggedInUser = async () => {
//         try {
//             // const response=null;
//             // const token = localStorage.getItem('token'); // Retrieve token from storage
//             // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//             // const response = await fetch('http://localhost:8080/currentLoginUser', {
//             //     method: 'GET',
//             //     credentials: 'include',  // Include credentials to send cookies with the request
//             // });

//             const token = localStorage.getItem('token');
//             // console.log("in home")
//             // console.log(token)
//             const response = await axios.get('http://localhost:8080/currentLoginUser', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },

//             } 

//         )            .then((response) => {
//             // Handle successful response
//             setUserData(response.data);
//           });


//             // setUserData(response.data);
//             // The fetch request is asynchronous, meaning it doesn't wait for the data to be fetched before continuing to execute the code in your useEffect hook.
//             // By the time console.log(data) executes, the data might not have been retrieved yet, resulting in null being logged.

//             // console.log("not working or what")
//             // console.log(response.data);
//             // const data = await response.json();
//             // console.log("printing data getting from springboot")
//             // console.log(data);

//             // if (!response.ok) {
//             //     throw new Error('Network response was not ok');
//             // }


//             // console.log(response.data);
//             // console.log(userData);

//         } catch (error) {
//             console.log("in error");
//             // console.log(userData);
//             console.log(error);
//             // console.error('Failed to fetch user data:', error);
//         }
//     };

//     useEffect(() => {
//         loggedInUser();

//     }, []);
  
//     return (
//         <div>
//             <DashboardLayout>
//             {/* <Typography variant="h4" gutterBottom>
//                 HMS!
//             </Typography>
//             <Typography variant="body1">
//                 This is the home page with a fancy navbar and footer using Material-UI.
//             </Typography> */}
//                 <Container maxWidth="lg">
//       <Box style={homePageStyles.heroSection}>
//         <Box style={homePageStyles.heroContent}>
//           <Typography variant="h2" style={homePageStyles.heroTitle}>
//             Welcome to Healthcare System
//           </Typography>
//           <Typography variant="h5" style={homePageStyles.heroSubtitle}>
//             Your health is our priority. Providing the best healthcare services.
//           </Typography>
//           <Button variant="contained" style={homePageStyles.heroButton}>
//             Get Started
//           </Button>
//         </Box>
//       </Box>

//       <Box style={homePageStyles.servicesSection}>
//         <Typography variant="h4" style={homePageStyles.sectionTitle}>
//           Our Services
//         </Typography>
//         <Grid container spacing={4}>
//           <Grid item xs={12} sm={4}>
//             <Card style={homePageStyles.serviceCard}>
//               <CardMedia style={homePageStyles.serviceMedia} image="/path/to/image1.jpg" title="Service 1" />
//               <CardContent>
//                 <MedicalServicesIcon color="primary" />
//                 <Typography gutterBottom variant="h5" component="div">
//                   General Checkup
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary" component="p">
//                   Regular health checkups to ensure you stay healthy and catch any early signs of health issues.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Card style={homePageStyles.serviceCard}>
//               <CardMedia style={homePageStyles.serviceMedia} image="/path/to/image2.jpg" title="Service 2" />
//               <CardContent>
//                 <LocalHospitalIcon color="primary" />
//                 <Typography gutterBottom variant="h5" component="div">
//                   Emergency Services
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary" component="p">
//                   24/7 emergency services to handle any critical health situations with utmost care.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Card style={homePageStyles.serviceCard}>
//               <CardMedia style={homePageStyles.serviceMedia} image="/path/to/image3.jpg" title="Service 3" />
//               <CardContent>
//                 <HealingIcon color="primary" />
//                 <Typography gutterBottom variant="h5" component="div">
//                   Specialist Consultation
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary" component="p">
//                   Consult with specialists for detailed and expert advice on specific health conditions.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
  
//             </DashboardLayout>
            
//         </div>
//     );
// };

// export default HomePage;




import React , {useState , useEffect}from 'react';
import axios from 'axios';
import { Container, Box, Typography, Button, Grid, Card, CardContent, CardMedia, Avatar, Paper } from '@mui/material';
import { styled } from '@mui/system';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealingIcon from '@mui/icons-material/Healing';
import PeopleIcon from '@mui/icons-material/People';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { Dashboard } from '@mui/icons-material';
import DashboardLayout from './frontend/DashboardLayout';


const drawerWidth = 240;

const HeroSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
  backgroundColor: '#1976d2',
  color: '#fff',
  padding: '40px 0',
  animation: 'fadeIn 2s',
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
}));

const HeroContent = styled(Box)({
  textAlign: 'center',
});

const HeroButton = styled(Button)({
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#fff',
  color: '#1976d2',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
});

const ServiceCard = styled(Card)({
  maxWidth: 345,
  margin: 'auto',
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'transform 0.3s ease-in-out',
  },
});

const ServiceMedia = styled(CardMedia)({
  height: 140,
});

const SectionTitle = styled(Typography)({
  textAlign: 'center',
  marginBottom: '40px',
  color: '#1976d2',
});

const ContactItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
});

const ContactIcon = styled(Box)({
  marginRight: '10px',
});

const HomePage = () => {
    const [userData, setUserData] = useState(null);
        // localStorage.removeItem('token');

    const loggedInUser = async () => {
        try {
            // const response=null;
            // const token = localStorage.getItem('token'); // Retrieve token from storage
            // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // const response = await fetch('http://localhost:8080/currentLoginUser', {
            //     method: 'GET',
            //     credentials: 'include',  // Include credentials to send cookies with the request
            // });

            const token = localStorage.getItem('token');
            // console.log("in home")
            // console.log(token)
            const response = await axios.get('http://localhost:8080/currentLoginUser', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            } 

        ).then((response) => {
            // Handle successful response
            setUserData(response.data);
          });


            // setUserData(response.data);
            // The fetch request is asynchronous, meaning it doesn't wait for the data to be fetched before continuing to execute the code in your useEffect hook.
            // By the time console.log(data) executes, the data might not have been retrieved yet, resulting in null being logged.

            // console.log("not working or what")
            // console.log(response.data);
            // const data = await response.json();
            // console.log("printing data getting from springboot")
            // console.log(data);

            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }


            // console.log(response.data);
            // console.log(userData);

        } catch (error) {
            console.log(error);
            // console.error('Failed to fetch user data:', error);
        }
    };

    useEffect(() => {
        loggedInUser();

    }, []);
  return (
    <DashboardLayout>
    <Container maxWidth="lg">
      <HeroSection>
        <HeroContent>
          <Typography variant="h2" component="h1" sx={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
            Welcome to Healthcare System
          </Typography>
          <Typography variant="h5" component="p" sx={{ fontSize: '1.5rem', marginBottom: '20px' }}>
            Your health is our priority. Providing the best healthcare services.
          </Typography>
          <HeroButton variant="contained">Get Started</HeroButton>
        </HeroContent>
      </HeroSection>

      <Box sx={{ padding: '40px 0' }}>
        <SectionTitle variant="h4">Our Services</SectionTitle>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <ServiceCard>
              <ServiceMedia image="/path/to/image1.jpg" title="Service 1" />
              <CardContent>
                <MedicalServicesIcon color="primary" />
                <Typography gutterBottom variant="h5" component="div">
                  General Checkup
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Regular health checkups to ensure you stay healthy and catch any early signs of health issues.
                </Typography>
              </CardContent>
            </ServiceCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ServiceCard>
              <ServiceMedia image="/path/to/image2.jpg" title="Service 2" />
              <CardContent>
                <LocalHospitalIcon color="primary" />
                <Typography gutterBottom variant="h5" component="div">
                  Emergency Services
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  24/7 emergency services to handle any critical health situations with utmost care.
                </Typography>
              </CardContent>
            </ServiceCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ServiceCard>
              <ServiceMedia image="/path/to/image3.jpg" title="Service 3" />
              <CardContent>
                <HealingIcon color="primary" />
                <Typography gutterBottom variant="h5" component="div">
                  Specialist Consultation
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Consult with specialists for detailed and expert advice on specific health conditions.
                </Typography>
              </CardContent>
            </ServiceCard>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ padding: '40px 0', backgroundColor: '#f5f5f5' }}>
        <SectionTitle variant="h4">Meet Our Team</SectionTitle>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
              <Avatar alt="Dr. John Doe" src="/path/to/doctor1.jpg" sx={{ width: 120, height: 120, margin: 'auto' }} />
              <Typography variant="h6" component="p" sx={{ marginTop: '10px' }}>
                Dr. John Doe
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Cardiologist
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
              <Avatar alt="Dr. Jane Smith" src="/path/to/doctor2.jpg" sx={{ width: 120, height: 120, margin: 'auto' }} />
              <Typography variant="h6" component="p" sx={{ marginTop: '10px' }}>
                Dr. Jane Smith
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Neurologist
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
              <Avatar alt="Dr. Alan Brown" src="/path/to/doctor3.jpg" sx={{ width: 120, height: 120, margin: 'auto' }} />
              <Typography variant="h6" component="p" sx={{ marginTop: '10px' }}>
                Dr. Alan Brown
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Orthopedic Surgeon
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ padding: '40px 0' }}>
        <SectionTitle variant="h4">Contact Us</SectionTitle>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <ContactItem>
              <ContactIcon>
                <PhoneIcon />
              </ContactIcon>
              <Typography variant="body1" component="p">
                +1 234 567 890
              </Typography>
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <EmailIcon />
              </ContactIcon>
              <Typography variant="body1" component="p">
                contact@healthcare.com
              </Typography>
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <ContactSupportIcon />
              </ContactIcon>
              <Typography variant="body1" component="p">
                123 Healthcare St, City, Country
              </Typography>
            </ContactItem>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* You can add a contact form or a map here */}
          </Grid>
        </Grid>
      </Box>
    </Container>

    </DashboardLayout>
  );
};

export default HomePage;
