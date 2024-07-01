// import React from 'react';
// import { Container, Grid, Card, CardContent, Typography, Avatar, Button, Box } from '@mui/material';
// import WorkIcon from '@mui/icons-material/Work';
// import SchoolIcon from '@mui/icons-material/School';
// import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

// const careersStyles = {
//     section: {
//         padding: '40px 0',
//         backgroundColor: '#f7f7f7',
//     },
//     card: {
//         margin: '16px',
//         padding: '16px',
//         backgroundColor: '#ffffff',
//         borderRadius: '16px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         textAlign: 'center',
//     },
//     icon: {
//         fontSize: '64px',
//         marginBottom: '16px',
//         color: '#1976d2',
//     },
//     avatar: {
//         width: '150px',
//         height: '150px',
//         margin: '0 auto 16px auto',
//     },
//     missionCard: {
//         margin: '16px',
//         padding: '16px',
//         backgroundColor: '#1976d2',
//         borderRadius: '16px',
//         color: '#ffffff',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     },
//     applyButton: {
//         marginTop: '16px',
//     },
// };

// const jobOpenings = [
//     { title: 'Registered Nurse', description: 'We are looking for a dedicated registered nurse to join our team.', icon: <LocalHospitalIcon style={careersStyles.icon} /> },
//     { title: 'Medical Assistant', description: 'Assist doctors and patients with various medical tasks.', icon: <WorkIcon style={careersStyles.icon} /> },
//     { title: 'Healthcare Administrator', description: 'Manage the daily operations of our healthcare facility.', icon: <SchoolIcon style={careersStyles.icon} /> },
// ];

// const Careers = () => {
//     return (
//         <Container maxWidth="lg">
//             <Box style={careersStyles.section}>
//                 <Typography variant="h3" gutterBottom textAlign="center">
//                     Careers
//                 </Typography>
//                 <Typography variant="h6" textAlign="center" paragraph>
//                     Join our team and help us provide the best healthcare services to our community.
//                 </Typography>
//                 <Grid container spacing={4}>
//                     {jobOpenings.map((job, index) => (
//                         <Grid item xs={12} md={4} key={index}>
//                             <Card style={careersStyles.card}>
//                                 {job.icon}
//                                 <CardContent>
//                                     <Typography variant="h5" gutterBottom>
//                                         {job.title}
//                                     </Typography>
//                                     <Typography variant="body1">
//                                         {job.description}
//                                     </Typography>
//                                     <Button variant="contained" color="primary" style={careersStyles.applyButton}>
//                                         Apply Now
//                                     </Button>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Box>
//             <Box style={careersStyles.section}>
//                 <Typography variant="h4" gutterBottom textAlign="center">
//                     Why Work With Us?
//                 </Typography>
//                 <Card style={careersStyles.missionCard}>
//                     <CardContent>
//                         <Typography variant="body1">
//                             We offer competitive salaries, excellent benefits, and a supportive work environment. Join our team and make a difference in the lives of our patients and their families.
//                         </Typography>
//                     </CardContent>
//                 </Card>
//             </Box>
//             <Box style={careersStyles.section}>
//                 <Typography variant="h4" gutterBottom textAlign="center">
//                     Meet Our Team
//                 </Typography>
//                 <Grid container spacing={4} justifyContent="center">
//                     <Grid item xs={12} sm={6} md={4}>
//                         <Card style={careersStyles.card}>
//                             <Avatar alt="John Doe" src="/avatar1.jpg" style={careersStyles.avatar} />
//                             <CardContent>
//                                 <Typography variant="h6">John Doe</Typography>
//                                 <Typography variant="body1">Chief Medical Officer</Typography>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={4}>
//                         <Card style={careersStyles.card}>
//                             <Avatar alt="Jane Smith" src="/avatar2.jpg" style={careersStyles.avatar} />
//                             <CardContent>
//                                 <Typography variant="h6">Jane Smith</Typography>
//                                 <Typography variant="body1">Head of Surgery</Typography>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={4}>
//                         <Card style={careersStyles.card}>
//                             <Avatar alt="Richard Roe" src="/avatar3.jpg" style={careersStyles.avatar} />
//                             <CardContent>
//                                 <Typography variant="h6">Richard Roe</Typography>
//                                 <Typography variant="body1">Head of Pediatrics</Typography>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 </Grid>
//             </Box>
//         </Container>
//     );
// };

// export default Careers;


import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Avatar, Button, Box, IconButton } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PeopleIcon from '@mui/icons-material/People';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DashboardLayout from './DashboardLayout';

const careersStyles = {
    section: {
        padding: '40px 0',
        backgroundColor: '#f9f9f9',
    },
    card: {
        margin: '16px',
        padding: '24px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        transition: 'transform 0.3s',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
    icon: {
        fontSize: '64px',
        marginBottom: '16px',
        color: '#1976d2',
    },
    avatar: {
        width: '100px',
        height: '100px',
        margin: '0 auto 16px auto',
    },
    missionCard: {
        margin: '16px',
        padding: '24px',
        backgroundColor: '#1976d2',
        borderRadius: '12px',
        color: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    applyButton: {
        marginTop: '16px',
    },
    sectionHeader: {
        textAlign: 'center',
        marginBottom: '32px',
    },
};

const jobOpenings = [
    { title: 'Registered Nurse', description: 'We are looking for a dedicated registered nurse to join us.', icon: <LocalHospitalIcon style={careersStyles.icon} /> },
    { title: 'Medical Assistant', description: 'Assist doctors and patients with various medical tasks.', icon: <WorkIcon style={careersStyles.icon} /> },
    { title: 'Healthcare Administrator', description: 'Manage the daily operations of our healthcare facility.', icon: <SchoolIcon style={careersStyles.icon} /> },
];

const teamMembers = [
    { name: 'John Doe', role: 'Chief Medical Officer', avatarUrl: '/avatar1.jpg' },
    { name: 'Jane Smith', role: 'Head of Surgery', avatarUrl: '/avatar2.jpg' },
    { name: 'Richard Roe', role: 'Head of Pediatrics', avatarUrl: '/avatar3.jpg' },
];

const Careers = () => {
    return (
        <DashboardLayout>
        <Container maxWidth="lg">
            <Box style={careersStyles.section}>
                <Typography variant="h3" gutterBottom style={careersStyles.sectionHeader}>
                    Careers
                </Typography>
                <Typography variant="h6" paragraph textAlign="center">
                    Join our team and help us provide the best healthcare services to our community.
                </Typography>
                <Grid container spacing={4}>
                    {jobOpenings.map((job, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card style={careersStyles.card}>
                                {job.icon}
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        {job.title}
                                    </Typography>
                                    <Typography variant="body1">
                                        {job.description}
                                    </Typography>
                                    <Button variant="contained" color="primary" style={careersStyles.applyButton} endIcon={<ArrowForwardIcon />}>
                                        Apply Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box style={{ ...careersStyles.section, backgroundColor: '#e3f2fd' }}>
                <Typography variant="h4" gutterBottom style={careersStyles.sectionHeader}>
                    Why Work With Us?
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Card style={careersStyles.missionCard}>
                            <CardContent>
                                <Typography variant="body1">
                                    We offer competitive salaries, excellent benefits, and a supportive work environment. Join our team and make a difference in the lives of our patients and their families.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Box style={careersStyles.section}>
                <Typography variant="h4" gutterBottom style={careersStyles.sectionHeader}>
                    Meet Our Team
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {teamMembers.map((member, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card style={careersStyles.card}>
                                <Avatar alt={member.name} src={member.avatarUrl} style={careersStyles.avatar} />
                                <CardContent>
                                    <Typography variant="h6">{member.name}</Typography>
                                    <Typography variant="body1">{member.role}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box style={{ ...careersStyles.section, backgroundColor: '#e3f2fd' }}>
                <Typography variant="h4" gutterBottom style={careersStyles.sectionHeader}>
                    Benefits of Joining Us
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Card style={careersStyles.card}>
                            <IconButton>
                                <PeopleIcon style={careersStyles.icon} />
                            </IconButton>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Collaborative Environment
                                </Typography>
                                <Typography variant="body1">
                                    Work with a team of professionals dedicated to providing excellent patient care.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card style={careersStyles.card}>
                            <IconButton>
                                <ThumbUpIcon style={careersStyles.icon} />
                            </IconButton>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Great Benefits
                                </Typography>
                                <Typography variant="body1">
                                    Enjoy comprehensive health insurance, retirement plans, and more.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card style={careersStyles.card}>
                            <IconButton>
                                <WorkIcon style={careersStyles.icon} />
                            </IconButton>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Career Growth
                                </Typography>
                                <Typography variant="body1">
                                    Opportunities for professional development and career advancement.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
        </DashboardLayout>
    );
};

export default Careers;

