
import React from 'react';
import { Container, Typography, Box, Card, CardContent, Divider } from '@mui/material';
import DashboardLayout from './DashboardLayout';

const privacyPolicyStyles = {
  section: {
    padding: '40px 0',
    backgroundColor: '#f4f4f4',
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

const PrivacyPolicy = () => {
  return (
    <DashboardLayout>
    <Container maxWidth="md">
      <Box style={privacyPolicyStyles.section}>
        <Card style={privacyPolicyStyles.card}>
          <CardContent>
            <Typography variant="h3" gutterBottom style={privacyPolicyStyles.header}>
              Privacy Policy
            </Typography>
            <Divider />
            <Typography variant="h6" gutterBottom style={privacyPolicyStyles.subHeader}>
              Introduction
            </Typography>
            <Typography variant="body1" paragraph style={privacyPolicyStyles.content}>
              Your privacy is important to us. This privacy statement explains the personal data our healthcare management system processes, how we process it, and for what purposes.
            </Typography>
            <Typography variant="h6" gutterBottom style={privacyPolicyStyles.subHeader}>
              Information We Collect
            </Typography>
            <Typography variant="body1" paragraph style={privacyPolicyStyles.content}>
              We collect data to provide the services you request, ease your navigation on the site, communicate with you, and improve your overall experience.
            </Typography>
            <Typography variant="h6" gutterBottom style={privacyPolicyStyles.subHeader}>
              How We Use Your Information
            </Typography>
            <Typography variant="body1" paragraph style={privacyPolicyStyles.content}>
              We use the information we collect in various ways, including to provide, operate, and maintain our website, improve and personalize our website, understand and analyze how you use our website, and communicate with you.
            </Typography>
            <Typography variant="h6" gutterBottom style={privacyPolicyStyles.subHeader}>
              Sharing Your Information
            </Typography>
            <Typography variant="body1" paragraph style={privacyPolicyStyles.content}>
              We do not share your personal information with any third parties except for our service providers who assist us in running our services.
            </Typography>
            <Typography variant="h6" gutterBottom style={privacyPolicyStyles.subHeader}>
              Security of Your Information
            </Typography>
            <Typography variant="body1" paragraph style={privacyPolicyStyles.content}>
              We use administrative, technical, and physical security measures to help protect your personal information.
            </Typography>
            <Typography variant="h6" gutterBottom style={privacyPolicyStyles.subHeader}>
              Changes to This Privacy Policy
            </Typography>
            <Typography variant="body1" paragraph style={privacyPolicyStyles.content}>
              We may update this privacy policy from time to time. We encourage you to review this privacy policy periodically to stay informed about how we are protecting your information.
            </Typography>
            <Typography variant="h6" gutterBottom style={privacyPolicyStyles.subHeader}>
              Contact Us
            </Typography>
            <Typography variant="body1" paragraph style={privacyPolicyStyles.content}>
              If you have any questions about this Privacy Policy, please contact us at info@healthcaresystem.com.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
    </DashboardLayout>
  );
};

export default PrivacyPolicy;
