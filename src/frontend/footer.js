import React from 'react';
import { Box, Container, Grid, Link, Typography , Divider} from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'black', // Set background color to black
        color: 'white',
        py: 1,
        // bottom: 0,
        // width: '100%',
        position: 'sticky',

        mt:'20px',
        // mt: 'auto',
      }}
    >
      <Container maxWidth="lg" >
        <Grid container spacing={4}>
          {/* Grid items with section titles and links */}
          {/* Facebook */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Divider sx={{ mb: 1 , backgroundColor: 'white'}} /> 
            <Link href="/about" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
              About Us
            </Link>
            <Link href="/careers" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
              Careers
            </Link>
            <Link href="/contact" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
              Contact
            </Link>
            {/* Your company links */}
          </Grid>
          {/* Twitter */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Services
            </Typography>
            <Divider sx={{ mb: 1 , backgroundColor: 'white'}} /> 
            <Link href="/faq" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
            FAQs
            </Link>
            <Link href="/helpcenter" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
             Help Center
            </Link>
            <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
            Appointment Booking
            </Link>
            {/* Your service links */}
          </Grid>
          {/* LinkedIn */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Resources
              
            </Typography>
            <Divider sx={{ mb: 1 , backgroundColor: 'white'}} /> 
            <Link href="/blog" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
              Blog
            </Link>
            <Link href="/termsandconditions" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
              Terms & Conditions
            </Link>
            <Link href="/privacypolicy" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
              Privacy Policy
            </Link>
            {/* Your resource links */}
          </Grid>
          {/* Instagram */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Divider sx={{ mb: 1 , backgroundColor: 'white'}} /> 
            {/* <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
              <FacebookIcon /> Facebook
            </Link> */}
            <Link href="https://x.com/Sheel1512" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
              <TwitterIcon /> Twitter
            </Link>
            <Link href="https://www.linkedin.com/in/sheel-ranjan-bajpai-b565a9228/" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
              <LinkedInIcon /> LinkedIn
            </Link>
            <Link href="https://www.instagram.com/sheel_ranjan_bajpai/" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
              <InstagramIcon /> Instagram
            </Link>
          </Grid>
        </Grid>
        {/* Copyright text */}
        <Box sx={{ textAlign: 'center', mt: 4 , backgroundColor: 'rgba(128, 128, 128, 0.5)', py: 1}}>
          <Typography variant="body2" color="inherit">
            &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

// FAQs
// Online Check-In
//Appointment Booking