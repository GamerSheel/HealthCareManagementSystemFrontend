import React from 'react';
import { Container, Typography, Box, Card, CardContent, Divider } from '@mui/material';
import { Dashboard } from '@mui/icons-material';
import DashboardLayout from './DashboardLayout';

const termsStyles = {
  section: {
    padding: '40px 0',
    backgroundColor: '#e3f2fd',
  },
  card: {
    margin: '16px',
    padding: '32px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
    color: '#1976d2',
  },
  subHeader: {
    marginTop: '16px',
    marginBottom: '8px',
    color: '#1976d2',
  },
  content: {
    marginBottom: '16px',
    color: '#333',
    lineHeight: '1.6',
  },
};

const TermsPage = () => {
  return (
    <DashboardLayout>
    <Container maxWidth="md">
      <Box style={termsStyles.section}>
        <Card style={termsStyles.card}>
          <CardContent>
            <Typography variant="h3" gutterBottom style={termsStyles.header}>
              Terms and Conditions
            </Typography>
            <Divider />
            <Typography variant="h6" gutterBottom style={termsStyles.subHeader}>
              Introduction
            </Typography>
            <Typography variant="body1" paragraph style={termsStyles.content}>
              Welcome to our healthcare management system. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern [Healthcare System]'s relationship with you in relation to this website.
            </Typography>
            <Typography variant="h6" gutterBottom style={termsStyles.subHeader}>
              Use of the Website
            </Typography>
            <Typography variant="body1" paragraph style={termsStyles.content}>
              By accessing the website, you warrant and represent to [Healthcare System] that you are legally entitled to do so and to make use of information made available via the website.
            </Typography>
            <Typography variant="h6" gutterBottom style={termsStyles.subHeader}>
              Trademarks
            </Typography>
            <Typography variant="body1" paragraph style={termsStyles.content}>
              The trademarks, names, logos, and service marks (collectively “trademarks”) displayed on this website are registered and unregistered trademarks of [Healthcare System]. Nothing contained on this website should be construed as granting any license or right to use any trademark without the prior written permission of [Healthcare System].
            </Typography>
            <Typography variant="h6" gutterBottom style={termsStyles.subHeader}>
              External Links
            </Typography>
            <Typography variant="body1" paragraph style={termsStyles.content}>
              External links may be provided for your convenience, but they are beyond the control of [Healthcare System] and no representation is made as to their content. Use or reliance on any external links and the content thereon provided is at your own risk.
            </Typography>
            <Typography variant="h6" gutterBottom style={termsStyles.subHeader}>
              Warranties
            </Typography>
            <Typography variant="body1" paragraph style={termsStyles.content}>
              [Healthcare System] makes no warranties, representations, statements, or guarantees (whether express, implied in law or residual) regarding the website.
            </Typography>
            <Typography variant="h6" gutterBottom style={termsStyles.subHeader}>
              Disclaimer of Liability
            </Typography>
            <Typography variant="body1" paragraph style={termsStyles.content}>
              [Healthcare System] shall not be responsible for and disclaims all liability for any loss, liability, damage (whether direct, indirect, or consequential), personal injury, or expense of any nature whatsoever which may be suffered by you or any third party.
            </Typography>
            <Typography variant="h6" gutterBottom style={termsStyles.subHeader}>
              Governing Law
            </Typography>
            <Typography variant="body1" paragraph style={termsStyles.content}>
              Any relevant terms and conditions, policies, and notices shall be governed by and construed in accordance with the laws of [State/Country] without giving effect to any principles of conflict of law. You hereby consent to the exclusive jurisdiction of the [State/Country] courts in respect of any disputes arising in connection with the website.
            </Typography>
            <Typography variant="h6" gutterBottom style={termsStyles.subHeader}>
              Contact Information
            </Typography>
            <Typography variant="body1" paragraph style={termsStyles.content}>
              If you have any questions about these Terms, please contact us at info@healthcaresystem.com.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
    </DashboardLayout>
  );
};

export default TermsPage;

