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
  CircularProgress,  List, ListItem,

} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/system';
import DashboardLayout from './DashboardLayout';
import { PhoneIcon, Person } from '@mui/icons-material';


const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: 'Lavender',
  width: '100%',
  minHeight: '100vh',
  padding: 0, 
});

const StyledBox = styled(Box)({
  marginTop: '24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '24px',
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  width: '100%',
  boxSizing: 'border-box',
  marginBottom: '24px',
  // minHeight: '100vh',
});

const StyledPaper = styled(Paper)({
  padding: '24px',
  marginTop: '24px',
  width: '100%',
  backgroundColor: 'Snow',
});

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { user } = location.state || {};
  const [degrees , setDegrees] = useState();
  const [specialities , setSpecialities] = useState();
  const [updatedDegreeSpeciality , setUpdatedDegreeSpeciality] = useState(false);

  const loggedInUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/currentLoginUser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        ;
        setUserData(response.data);
        setLoading(false);
      });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setLoading(false);
    }
  };

  const getDegreeSpeciality = async () => {
    try {
      const token = localStorage.getItem('token');
      const responsedegrees = await axios.get('http://localhost:8080/degree/getDegreeByDoctorId', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params:{
          'doctorId' : userData.email,
        }
      }).then((responseDegrees) => {
        
        setDegrees(responseDegrees.data);
      });

      const responseSpeciality = await axios.get('http://localhost:8080/speciality/getSpecialityByDoctorId', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params:{
          'doctorId' : userData.email,
        }
      }).then((responseSpeciality) => {
        setSpecialities(responseSpeciality.data);
      });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setLoading(false);
    }
  };


  useEffect(() => {
    
    if (!user) {
      loggedInUser();
    } else {
      setLoading(false);
      setUserData(user);
    }
  }, [user]);

  console.log(user);

  if(!updatedDegreeSpeciality && userData){
    
    if(userData && userData.authority==='ROLE_DOCTOR'){
      console.log("calling degree");
      console.log(loading);
      getDegreeSpeciality();
    }
    setUpdatedDegreeSpeciality(true);
  }

  if (loading || (userData && (userData.authority==='ROLE_DOCTOR' && (!degrees || !specialities)))) {
    return (
      <DashboardLayout>
        <StyledContainer>
          <CircularProgress />
        </StyledContainer>
      </DashboardLayout>
    );
  }

  if (!userData || (userData && (userData.authority==='ROLE_DOCTOR' && (!degrees || !specialities)))) {
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
      <StyledContainer  component="main"  maxWidth="md">
        <CssBaseline />
        <StyledBox>
          <Avatar
            style={{ width: 80, height: 80, marginBottom: '16px', color: "DarkViolet", backgroundColor: 'Plum', }}
            alt={userData.firstName}
            //  src={userData.firstName}
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
                </Typography>


                <Typography variant="body1">{userData.firstName} {userData.lastName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom color="primary">
                  Email
                </Typography>
                <Typography variant="body1">{userData.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom color="primary">
                  Date of Birth
                </Typography>
                <Typography variant="body1">{userData.dob}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom color="primary">
                  Gender
                </Typography>
                <Typography variant="body1">{userData.gender}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom color="primary">
                  Address
                </Typography>
                <Typography variant="body1">{userData.address}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom color="primary">
                  Mobile Number
                </Typography>
                <Typography variant="body1">{userData.mobileNumber}</Typography>
              </Grid>
              {userData.authority === 'ROLE_DOCTOR' ?
                <>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom color="primary">
                      Degrees
                    </Typography>
                    <Typography variant="body1" style={{ display: 'flex', justifyContent: 'center' }}>
                    <List >
                      {degrees.map((degree, index) => (
                        <ListItem key={index} sx={{ padding: '0 0' ,width: '100%', display: 'flex', justifyContent: 'center'}}>
                          <Typography variant="body1" style={{ display: 'flex', justifyContent: 'center' }}>

                            {degree.degree}, {degree.institute}, {degree.year}

                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom color="primary">
                      Specialities
                    </Typography>
                    <Typography variant="body1" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <List >
                      {specialities.map((speciality, index) => (
                        <ListItem key={index} sx={{ padding: '0 0' , width: '100%', display: 'flex', justifyContent: 'center'}}>
                          <Typography sx={{ textAlign: 'center' }}>

                            {speciality.speciality}

                          </Typography>
                        </ListItem>

                      ))}
                    </List>
                    </Typography>
                  </Grid>
                </>
                :
                <></>
              }
            </Grid>
            {/* <Divider style={{ margin: '24px 0' }} /> */}
            {/* <Typography variant="body2" color="textSecondary" align="center">
            © 2024 MyWebsite
          </Typography> */}
          </StyledPaper>
        </StyledBox>
      </StyledContainer>
    </DashboardLayout>
  );
};

export default Dashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Avatar,
//   Box,
//   Container,
//   CssBaseline,
//   Paper,
//   Typography,
//   Grid,
//   Divider,
//   CircularProgress,
//   IconButton,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import { styled } from '@mui/system';

// const StyledContainer = styled(Container)({
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   minHeight: '100vh',
//   backgroundColor: '#f0f4f8',
//   padding: '20px',
// });

// const StyledBox = styled(Box)({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   padding: '20px',
//   boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
//   borderRadius: '10px',
//   backgroundColor: '#ffffff',
//   width: '100%',
//   maxWidth: '800px',
// });

// const StyledPaper = styled(Paper)({
//   padding: '20px',
//   marginTop: '20px',
//   width: '100%',
//   backgroundColor: '#e3f2fd',
// });

// const StyledAvatar = styled(Avatar)({
//   width: '80px',
//   height: '80px',
//   marginBottom: '20px',
//   backgroundColor: '#1976d2',
// });

// const StyledDivider = styled(Divider)({
//   margin: '20px 0',
//   backgroundColor: '#1976d2',
// });

// const Dashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const loggedInUser = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:8080/currentLoginUser', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUserData(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Failed to fetch user data:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loggedInUser();
//   }, []);

//   if (loading) {
//     return (
//       <StyledContainer>
//         <CircularProgress />
//       </StyledContainer>
//     );
//   }

//   if (!userData) {
//     return (
//       <StyledContainer>
//         <Typography variant="h6">No user data found</Typography>
//       </StyledContainer>
//     );
//   }

//   return (
//     <StyledContainer component="main">
//       <CssBaseline />
//       <StyledBox>
//         <StyledAvatar alt={userData.name}>{userData.name}</StyledAvatar>
//         <Typography variant="h4" component="h1" gutterBottom>
//           User Details
//         </Typography>
//         <StyledPaper>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="h6" color="primary">Name</Typography>
//               <Typography variant="body1">{userData.name}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="h6" color="primary">Email</Typography>
//               <Typography variant="body1">{userData.email}</Typography>
//             </Grid>
//             <StyledDivider variant="middle" />
//             <Grid item xs={12} sm={6}>
//               <Typography variant="h6" color="primary">Date of Birth</Typography>
//               <Typography variant="body1">{userData.dob}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="h6" color="primary">Gender</Typography>
//               <Typography variant="body1">{userData.gender}</Typography>
//             </Grid>
//             <StyledDivider variant="middle" />
//             <Grid item xs={12} sm={6}>
//               <Typography variant="h6" color="primary">Address</Typography>
//               <Typography variant="body1">{userData.address}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="h6" color="primary">Mobile Number</Typography>
//               <Typography variant="body1">{userData.mobileNumber}</Typography>
//             </Grid>
//           </Grid>
//           <Box display="flex" justifyContent="flex-end" mt={2}>
//             <IconButton color="primary">
//               <EditIcon />
//             </IconButton>
//           </Box>
//         </StyledPaper>
//       </StyledBox>
//     </StyledContainer>
//   );
// };

// export default Dashboard;
