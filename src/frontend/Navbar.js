import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Button, Typography, Snackbar } from '@mui/material';
import axios from 'axios';

const Navbar = () => {
  // const [formData, setFormData] = useState("logout from react");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState('/');
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const loggedInUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/currentLoginUser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    ).then((response) => {
      // Handle successful response
      setUserData(response.data);
      console.log(response.data);
    });

      // setUserData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    loggedInUser();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = async () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('token');
    setMessage('Logout successfull!');
    setOpen(true);
    setRedirect('/login')

    setTimeout(() => {
      navigate('/login', { message: "Form Submitted Successfully" });
      window.location.reload();
    }, 3000);

    // Redirect to the login page or perform any other action
    // navigate('/signup' , {message:"Logout Successful"})
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      
    >
      <List>
        {['Home', 'About', 'Services', 'Contact'].map((text, index) => (
          <ListItem button key={text} component={Link} to={`/${text.toLowerCase()}`}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />

      {userData ?
        <Button variant="contained" color="secondary" sx={{ m: 2 }} onClick={handleLogout}>
          Logout
        </Button>
        :
        <div>
          <Button variant="contained" color="secondary" sx={{ m: 2 }} component={Link} to="/signup">
            Sign Up
          </Button>
          <Button variant="contained" color="secondary" sx={{ m: 2 }} component={Link} to="/login">
            Login
          </Button>
        </div>
      }
    </Box>
  );



  return (
    <AppBar position="static" sx={{ marginBottom: '20px' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {userData ?
              <Typography variant="h6" component="div">
                {userData.firstName} {userData.lastName}
              </Typography>
              :
              <Typography variant="h6" component="div">
                Gr8 HMS
              </Typography>
            }
          </Box>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawer}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }}>
                Home
              </Link>
              <Link to="/about" style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }}>
                About
              </Link>
              <Link to="/services" style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }}>
                Services
              </Link>
              <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }}>
                Contact
              </Link>


              {userData ?
                <Button variant="contained" color="secondary" sx={{ ml: 2 }} onClick={handleLogout}>
                  Logout
                </Button>
                :
                <div>
                  <Button variant="contained" color="secondary" sx={{ ml: 2 }} component={Link} to="/signup">
                    Sign Up
                  </Button>
                  <Button variant="contained" color="secondary" sx={{ ml: 2 }} component={Link} to="/login">
                    Login
                  </Button>
                </div>
              }
            </Box>
          )}
        </Toolbar>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={message}
      />
    </AppBar>

  );
};

export default Navbar;
