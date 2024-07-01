import React , {useEffect , useState} from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Toolbar, AppBar, Typography } from '@mui/material';
import { Home, Dashboard, AccountCircle, Settings, Star, School } from '@mui/icons-material';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DescriptionIcon from '@mui/icons-material/Description';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import FeedbackIcon from '@mui/icons-material/Feedback';
import axios from 'axios';
import ScheduleIcon from '@mui/icons-material/Schedule';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FaceIcon from '@mui/icons-material/Face';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CommentIcon from '@mui/icons-material/Comment';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { LocalHospital, MedicalServices, Healing, HealthAndSafety, Person } from '@mui/icons-material';
import { Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SchoolIcon from '@mui/icons-material/School';


const drawerWidth = 240;
const navbarHeight = 56;
const sidebarHeight = 700;
const Sidebar = () => {
    const token = localStorage.getItem('token');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const loggedInUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/currentLoginUser', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                setUserData(response.data);
                setLoading(false);
                // console.log(response.data);
            });

        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        loggedInUser();
    }, []);

    // console.log(userData);
    return (
        <div style={{ display: 'flex' }}>

            <Drawer
                variant="permanent"

                sx={{
                    
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        // height:'1000px',
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        position: 'sticky',
                        top: `${navbarHeight}px`,
                        // position:"fixed",
                        // marginBottom:"20px",
                    },
                }}
            >
                

                <div style={{ overflow: 'auto' }}>

                    {token && userData && userData.role===3 && <List> 
                        
                        {['Home', 'Dashboard' , 'See All Doctors' ,'Create New Appointment' , 'View Upcoming Appointments'  , 'View Previous Appointments' ,'Give Feedback', 'ViewFeedbacks' , 'Settings' ].map((text, index) => (
                            <ListItem button key={text} component={Link} to={`/${text.toLowerCase().replace(/\s+/g, '')}`}>
                                <ListItemIcon>
                                    {index === 0 && <Home style={{ color: "DarkViolet"}}/>}
                                    {index === 1 && <Dashboard style={{ color: "DarkViolet"}} />}
                                    {index === 2 && <AccountCircle style={{ color: "DarkViolet"}}/>}
                                    {index === 3 && <WatchLaterIcon style={{ color: "DarkViolet"}} /> }
                                    {index === 4 && <EventAvailableIcon style={{ color: "DarkViolet"}} /> }
                                    {/* {index === 5 && <LocalHospitalIcon style={{ color: "DarkViolet"}} /> } */}
                                    {index === 5 && <AssignmentIcon style={{ color: "DarkViolet"}}/>}
                                    {index === 6 && <FeedbackIcon style={{ color: "DarkViolet"}}/>}
                                    {index === 7 && <ThumbUpIcon style={{ color: "DarkViolet"}}/>}
                                    {index === 8 && <Settings style={{ color: "DarkViolet"}}/>}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>}

                    {token && userData && userData.role===2 &&<List>
                        {['Home', 'Dashboard'  ,'Schedule' , 'View Upcoming Appointments Doctor' ,  'View Previous Appointments Doctor' , 'Upload Medical Record' , 'View Patients','Give Feedback', 'View  Feedbacks', 'Settings' ].map((text, index) => (
                            <ListItem button key={text} component={Link} to={`/${text.toLowerCase().replace(/\s+/g, '')}`}>
                                <ListItemIcon>
                                    {index === 0 && <Home style={{ color: "DarkViolet"}}/>}
                                    {index === 1 && <Dashboard style={{ color: "DarkViolet"}} />}
                                    {index === 2 && <ScheduleIcon style={{ color: "DarkViolet"}} />}
                                    {index === 3 && <EventAvailableIcon style={{ color: "DarkViolet"}} /> }
                                    {index === 4 && <AssignmentIcon style={{ color: "DarkViolet"}}/>}
                                    {/* {index === 5 && <LocalHospitalIcon style={{ color: "DarkViolet"}} /> }  'View Medical Records' */}
                                    {index === 5 && <UploadFileIcon style={{ color: "DarkViolet"}} /> }
                                    {index === 6 && <AssignmentIndIcon style={{ color: "DarkViolet"}}/>}
                                    {index === 7 && <RateReviewIcon style={{ color: "DarkViolet"}}/>}
                                    {index === 8 && <ThumbUpIcon style={{ color: "DarkViolet"}}/>}
                                    {index === 9 && <Settings style={{ color: "DarkViolet"}}/>}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>}

                    {token && userData && userData.role===1 &&<List>
                        {['Home', 'Dashboard' , 'View All Doctors' , 'View All Patients' , 'View Upcoming Appointments Admin' ,  'View Previous Appointments Admin' , 'Add a Doctor' ,'Add Doctor Degree' , 'Add Doctor Speciality' , 'View  Feedbacks', 'Settings' ].map((text, index) => (
                            <ListItem button key={text} component={Link} to={`/${text.toLowerCase().replace(/\s+/g, '')}`}>
                                <ListItemIcon>
                                    {index === 0 && <Home style={{ color: "DarkViolet"}}/>}
                                    {index === 1 && <Dashboard style={{ color: "DarkViolet"}} />}
                                    {index === 2 && <HealthAndSafety sx={{ color: "DarkViolet" }} />}
                                    {index === 3 && <AssignmentIndIcon style={{ color: "DarkViolet"}}/>}
                                    {index === 4 && <EventAvailableIcon style={{ color: "DarkViolet"}} /> }
                                    {index === 5 && <AssignmentIcon style={{ color: "DarkViolet"}}/>}
                                    {index === 6 && <PersonAddIcon style={{ color: "DarkViolet"}}/>}
                                    {index === 7 && <School style={{ color: "DarkViolet"}}/>}
                                    {index === 8 && <LocalHospital style={{ color: "DarkViolet"}}/>}
                                    {index === 9 && <ThumbUpIcon style={{ color: "DarkViolet"}}/>}
                                    {index === 10 && <Settings style={{ color: "DarkViolet"}}/>}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>}
                    {/* {token} */}
                    {!token && <List>
                        {['Home', 'See All Doctors' ,  'ViewFeedbacks' ].map((text, index) => (
                            <ListItem button key={text} component={Link} to={`/${text.toLowerCase().replace(/\s+/g, '')}`}>
                                <ListItemIcon>
                                    {index === 0 && <Home style={{ color: "DarkViolet"}}/>}
                                    {index === 1 && <AccountCircle style={{ color: "DarkViolet"}}/>}
                                    {/* {index === 2 && <FeedbackIcon style={{ color: "DarkViolet"}}/>} */}
                                    {index === 2 && <ThumbUpIcon style={{ color: "DarkViolet"}}/>}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                }
                </div>
            </Drawer>


            <CssBaseline />
        </div>
    );
};

export default Sidebar;

