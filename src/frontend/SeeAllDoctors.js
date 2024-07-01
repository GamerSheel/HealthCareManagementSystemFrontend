

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid, Card, CardContent, Typography, Avatar, Button, Box,
  Container,
  CssBaseline,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material';
import DashboardLayout from './DashboardLayout';
import SearchBar from './SearchBar';
import axios, { all } from 'axios';
import { styled } from '@mui/system';
import { List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, ListItemIcon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
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
  paper: {
    // margin: '16px',
    // padding: '16px',
    backgroundColor: 'GhostWhite',
    borderRadius: '16px',
  },
  listItem: {
    // marginBottom: '16px',
  },
  card: {
    margin: '16px',
    padding: '16px',
    backgroundColor: 'GhostWhite   ',
    borderRadius: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'flex-start',
  },
  content: {
    flex: 1,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '16px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    marginTop: '2px',
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'left',
    marginBottom: '10px',
  },
  list: {
    listStyle: 'circle', /* Change to "circle" or "square" for different bullet styles */
    paddingLeft: '16px' /* Adjust padding to align bullets */
  },
};

const SeeAllDoctors = () => {
  const [allDoctors, setAllDoctors] = useState(null);
  const [filteredAllDoctors, setFilteredAllDoctors] = useState(null);
  const [allDoctorsDegrees, setAllDoctorsDegrees] = useState(null);
  const [filteredAllDoctorsDegrees, setFilteredAllDoctorsDegrees] = useState(null);
  const [allDoctorsSpecialities, setAllDoctorsSepcialities] = useState(null);
  const [filteredAllDoctorsSpecialities, setFilteredAllDoctorsSepcialities] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [searchTerm, setSearchTerm] = useState('');
  const [findByAuthority, setfindByAuthority] = useState(null);
  const [findSearchTerm , setFindSearchTerm] = useState(false);
  const [finallyFindSearchTerm , setFinallyFindSearchTerm] = useState(false);


  const appointmentBooking = (doctor) => {
    console.log(doctor);
    // navigate('/')
    navigate('/appointmentDateAndTime' ,{state : {doctor}});
    // navigate('/bookAppointment', { state: { doctor } });
};

const seeDoctorSchedule=(doctor) =>{
  console.log(doctor);
  navigate('/viewschedule' ,{state : {doctor}});
}

  const viewDoctorDetails = async () => {
    try {
      
      // const responsefindByAuthority = await axios.get('http://localhost:8080/findByAuthority', {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }).then((responsefindByAuthority) => {
      //       // Handle successful response
      //       setfindByAuthority(responsefindByAuthority.data);
      //       console.log(responsefindByAuthority.data);
      //     });

      const responseAllDoctors = await axios.get('http://localhost:8080/seeAllDoctors', 
        // {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      // }
    ).then((responseAllDoctors) => {
        // Handle successful response
        setAllDoctors(responseAllDoctors.data);
        setFilteredAllDoctors(responseAllDoctors.data);
        console.log(responseAllDoctors.data);
      });

      const responseAllDoctorsDegrees = await axios.get('http://localhost:8080/getAllDoctorsDegrees', 
        // {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      // }
    ).then((responseAllDoctorsDegrees) => {
        // Handle successful response
        setAllDoctorsDegrees(responseAllDoctorsDegrees.data);
        setFilteredAllDoctorsDegrees(responseAllDoctorsDegrees.data);
        console.log(responseAllDoctorsDegrees.data);
      });

      const responseAllDoctorsSpecialities = await axios.get('http://localhost:8080/getAllDoctorsSpecialities', 
        // {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      // }
    ).then((responseAllDoctorsSpecialities) => {
        // Handle successful response
        setAllDoctorsSepcialities(responseAllDoctorsSpecialities.data);
        setFilteredAllDoctorsSepcialities(responseAllDoctorsSpecialities.data);
        console.log(responseAllDoctorsSpecialities.data);
        setLoading(false);
      });

    } catch (error) {
      console.error('Failed to fetch user data:', error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    viewDoctorDetails();
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

  if (allDoctors.length===0 || !allDoctorsDegrees.length===0 || !allDoctorsSpecialities===0) {
    return (
      <DashboardLayout>
        <StyledContainer>
          <Typography variant="h6">No user data found</Typography>
        </StyledContainer>
      </DashboardLayout>
    );
  }


  try{
    if(allDoctors && allDoctorsDegrees && allDoctorsSpecialities && searchTerm && !findSearchTerm){
      
      // setFilteredAllDoctors(
      //   allDoctors.filter(doctors => 
      //     doctors.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      //     doctors.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      //     doctors.email.toLowerCase().includes(searchTerm.toLowerCase())
      //   )
      // );
        // setItems((prevItems) => [...prevItems, 'New Item']);
        setFilteredAllDoctorsDegrees(
          allDoctorsDegrees.filter(doctorsDegrees => 
            doctorsDegrees.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctorsDegrees.institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctorsDegrees.yearDegree.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
  
          setFilteredAllDoctorsSepcialities(
            allDoctorsSpecialities.filter(doctorsSpecialities => 
              doctorsSpecialities.speciality.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        setFindSearchTerm(true);
        setFinallyFindSearchTerm(false);

    }else if(searchTerm == '' && (allDoctors!==filteredAllDoctors || allDoctorsDegrees!==filteredAllDoctorsDegrees || allDoctorsSpecialities!==filteredAllDoctorsSpecialities) ){
      setFilteredAllDoctors(allDoctors);
      setFilteredAllDoctorsDegrees(allDoctorsDegrees);
      setFilteredAllDoctorsSepcialities(allDoctorsSpecialities);
    }

  }catch(error){
    console.log(error);
  }
  finally{
    if(findSearchTerm && !finallyFindSearchTerm){

      setFilteredAllDoctors(
        allDoctors.filter(doctors => 
          doctors.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctors.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctors.email.toLowerCase().includes(searchTerm.toLowerCase())
          || filteredAllDoctorsDegrees.some((degree) => degree.email === doctors.email) || filteredAllDoctorsSpecialities.some((speciality) => speciality.email === doctors.email)
        )
      );
 
      // filteredAllDoctorsDegrees.map((doctorDegrees) => {
      //     setFilteredAllDoctors((prevItems) => [...prevItems , allDoctors.filter((doctors) => (doctorDegrees.email === doctors.email) && !(filteredAllDoctors.some((filteredDoctors) => filteredDoctors.email === doctors.email)))]);
      // });
      setFinallyFindSearchTerm(true);
      
    }
    
  }




  // const filteredCards = cardData.filter(card =>
  //   card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   card.email.toLowerCase().includes(searchTerm.toLowerCase())
  // );


  return (
    <DashboardLayout>
      <SearchBar onSearch={setSearchTerm} boolSearchTerm={setFindSearchTerm} />
      {/* {searchTerm} */}
      <Grid container spacing={2} minWidth={'100px'}>
        {filteredAllDoctors.map((doctor, index) => (
          <Grid item xs={12} sm={6} md={6} key={index} >
            <Card style={styles.card}>
              <CardContent>
                <div style={styles.avatarContainer}>
                  <Avatar alt={doctor.firstName} src={doctor.firstName} style={{ width: '150px', height: '150px', marginBottom: '10px' }} />
                </div>
                <Typography variant="h5" style={styles.title}>{doctor.firstName} {doctor.lastName}</Typography>
                <Typography sx={{ fontWeight: 'bold', textAlign:'left' }}>Degrees:</Typography>

                  
                <List >
                  {allDoctorsDegrees.filter(degree => degree.email === doctor.email).map((degree, index) => (
                    <ListItem key={index} sx={{ padding: '0 0' }}>
                      <Typography>
                        
                        {degree.degree}, {degree.institute}, {degree.yearDegree}
                      
                      </Typography>
                    </ListItem>
                  ))}
                </List>
                <Typography  sx={{ fontWeight: 'bold' , textAlign:'left' }}>Specialities:</Typography>

                {/* <Box sx={{ display: 'flex', flexWrap: 'wrap',  textAlign: 'left' }}> */}
                <List >
                {allDoctorsSpecialities.filter(speciality => speciality.email === doctor.email).map((speciality, index) => (
                    <ListItem key={index} sx={{ padding: '0 0' }}>
                      <Typography sx={{ textAlign: 'left' }}>
                        
                        {speciality.speciality}
                      
                      </Typography>
                      </ListItem>
                    
                  ))}
                  </List>
                  {/* </Box> */}
              </CardContent>
              {/* <div style={styles.buttons}> */}
              <Button variant="outlined" color="primary" style={{ marginBottom: '10px' }} onClick={() => seeDoctorSchedule(doctor)}>See Schedule</Button>
              {token && <Button variant="contained" color="primary" onClick={() => appointmentBooking(doctor)}>Book an appointment</Button>}
              {/* </div> */}
            </Card>
          </Grid>
        ))}
      </Grid>

    </DashboardLayout>
  );
};

export default SeeAllDoctors;
