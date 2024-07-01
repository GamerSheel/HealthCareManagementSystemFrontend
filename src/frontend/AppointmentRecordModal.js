import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Grid,
    IconButton, Box, Divider, TextField, Snackbar
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import NoteIcon from '@mui/icons-material/Note';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import {
    CalendarToday, Person, MonetizationOn, EventAvailable, AccessTime, Description, CurrencyRupee, ReportProblem, Healing,
    BugReport, MedicalServices, AccountCircle,
    Dashboard, prescription, Icon, MedicationLiquid, MedicalInformation,
} from '@mui/icons-material';
import moment from 'moment';
import axios from 'axios';

const styles = {

    header: {
        // marginBottom: '20px',
        color: '#1976d2',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
    },
};

const AppointmentRecordModal = ({ isOpen, onClose, event, isDoctor }) => {
    // console.log(event);
    const [editMode, setEditMode] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [recordDate, setRecordDate] = useState(null);
    const [recordTime, setRecordTime] = useState(null);
    const [dataSubmitted, setDataSubmitted] = useState(false);
    // const [appointment , setAppointment] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [uploadFile, setUploadFile] = useState(false);

    const [formData, setFormData] = useState({
        appointmentId: '',
        prescription: '',
        description: '',
        notes: '',
        medicalRecordUploadPath: '',
        recordDate: '',
        patientId: '',
        doctorId: '',
        filePath: '',
    });

    // if(event && !appointment){
    //     setAppointment({
    //         ...event,
    //         ['startTime']: event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , hour12: false }),
    //         ['endTime'] : event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , hour12: false }),
    //     });
    // }

    // if(event && !formData.appointmentId){
    //     // console.log(appointment);
    //     setFormData({
    //         ...formData,
    //         'appointmentId':event.appointmentId,
    //         'patientId':event.patientId.email,
    //         'doctorId':event.doctorId.email,
    //     });

    // }


    // const [editAvailable , setEditAvailable] = useState(event.endTime<=new Date()); 

    const handleSubmit = async (eventRecord) => {
        eventRecord.preventDefault();
        setUploadFile(false);
        console.log(formData);
        // Handle form submission logic
        try {

            // const response = await axios.post('http://localhost:8080/patientRecord/save', {formData});
            // const response = await fetch('http://localhost:8080/patientRecord/save', {
            //     method: 'POST',
            //     headers: {
            //         // 'Content-Type': 'application/json',
            //         'Content-Type': 'multipart/form-data',
            //     },
            //     // body: JSON.stringify(formData),
            // });

            console.log("ok in try");
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/patientRecord/save', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("response patient record", response);
            if (response.status === 200) {
                setMessage('Medical Record Uploaded successfully!');
                setOpen(true);
                setEditMode(false);
                setDataSubmitted(true);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
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

    const fetchPatientRecord = async () => {
        try {
            const token = localStorage.getItem('token');

            const responsePatientRecord = await axios.get('http://localhost:8080/patientRecord/ByAppointmentId', {
                params: {
                    'appointmentId': event.appointmentId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((responsePatientRecord) => {
                setFormData({
                    ...formData,
                    'description': responsePatientRecord.data.description,
                    'prescription': responsePatientRecord.data.prescription,
                    'notes': responsePatientRecord.data.notes,
                    'medicalRecordUploadPath': responsePatientRecord.data.medicalRecordUploadPath,
                    'filePath': responsePatientRecord.data.medicalRecordUploadPath,
                    'recordDate': responsePatientRecord.data.recordDate,
                    'appointmentId': event.appointmentId,
                    'patientId': event.patientId.email,
                    'doctorId': event.doctorId.email,
                });
                setFileName(null);
                setRecordDate(null);
                setRecordTime(null);
                console.log(responsePatientRecord.data);

                // Handle successful response

            });

            setLoading(false);

        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setLoading(false);
        }
    };

    if (formData.filePath && !recordDate) {
        console.log("how to remove this");
        const parts = formData.filePath.split('_');
        setFileName(parts.slice(-1)[0]);

        // Parse the string using moment.js for flexibility and locale handling
        const dateTime = moment(formData.recordDate, "DD-MM-YYYY HH:mm:ss.SSS");

        // Extract date and format in desired format (without milliseconds)
        setRecordDate(dateTime.format("DD-MM-YYYY"));
        setRecordTime(dateTime.format("hh:mm A")); // "hh" for 12-hour format, "A" for AM/PM

    }

    useEffect(() => {
        if (isOpen) {
            fetchPatientRecord();
            setDataSubmitted(false);
        }

    }, [isOpen, dataSubmitted]);

    const handleDownload = async () => {
        const token = localStorage.getItem('token');
        try {

            console.log(fileName);
            // axios({
            //     url: `http://localhost:8080/patientRecord/download/${fileName}`,
            //     method: 'GET',
            //     responseType: 'blob', // Important for downloading files
            //   })
            const response = await axios.get('http://localhost:8080/patientRecord/download', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    'fileName': fileName,
                    'appointmentId': formData.appointmentId,
                },
                responseType: 'blob',
            }).then((response) => {
                console.log(response);
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName); // Set the download attribute
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }).catch((error) => {
                console.error('Error downloading the file:', error);
            });
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setLoading(false);
        }
    };

    const handleEditToggle = () => {
        setEditMode(true);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (name === 'medicalRecordUploadPath') {
            setUploadFile(true);
            console.log(event.target.files[0]);
            setFormData((prevData) => ({
                ...prevData,
                [name]: event.target.files[0],
                ['filePath']: value,
            }));

        }
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    if (!event) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle >
                <Typography variant="body1" style={styles.header}>
                    {/* variant="h2" style={styles.header} */}
                    Appointment Details

                </Typography>

            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center" mb={1} >
                            <PersonIcon style={{ color: "DarkViolet" }} sx={{ mr: 1 }} />
                            <Typography> <strong>Patient Name :</strong> {event.forWhichPerson}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center" mb={1} >
                            <AccountCircle style={{ color: "DarkViolet" }} sx={{ mr: 1 }} />
                            <Typography><strong>Guardian Name :</strong> {event.patientId.firstName} {event.patientId.lastName}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center" mb={1} >
                            <AccessTime style={{ color: "DarkViolet" }} sx={{ mr: 1 }} />
                            <Typography><strong>Start Time :</strong> {event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center" mb={1} >
                            <AccessTime style={{ color: "DarkViolet" }} sx={{ mr: 1 }} />
                            <Typography><strong>End Time :</strong> {event.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center" mb={1} >
                            <CalendarToday style={{ color: "DarkViolet" }} sx={{ mr: 1 }} />
                            <Typography> <strong>Appointment Date :</strong> {new Date(event.appointmentDate).toLocaleDateString()}</Typography>
                        </Box>
                    </Grid>



                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center" mb={1} >
                            <CurrencyRupee style={{ color: "DarkViolet" }} sx={{ mr: 1 }} />
                            <Typography> <strong>Fees :</strong> 1,00,000</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" mb={1} >
                            <DescriptionIcon style={{ color: "DarkViolet" }} sx={{ mr: 1 }} />
                            <Typography><strong>Issue : </strong>{event.issue}</Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Divider style={{ margin: '20px 0' }} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" mb={1} >
                            <EventIcon style={{ color: "DarkViolet" }} sx={{ mr: 1 }} />
                            <Typography><strong>Patient Record Date : </strong> </Typography>
                            <Typography> {recordDate}   {recordTime}</Typography> : <Typography />


                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" mb={1} >
                            <MedicationLiquid style={{ color: "DarkViolet" }} sx={{ mr: 1 }} />

                            <Typography><strong>Prescriptions :</strong> </Typography>
                            {editMode ?
                                <TextField
                                    label="prescription"
                                    name="prescription"
                                    // defaultValue={`${userData.firstName} ${userData.lastName}`}
                                    variant="outlined"
                                    value={formData.prescription}
                                    onChange={handleChange}

                                />
                                :
                                (<Typography>{formData.prescription}</Typography>)
                            }
                        </Box>
                    </Grid>

                    <Grid item xs={12}>

                        <Box display="flex" alignItems="center" mb={1} >
                            <MedicalServices style={{ color: "DarkViolet" }} sx={{ mr: 1 }} />
                            <Typography> <strong>Doctor Description :</strong>  </Typography>
                            {editMode ?
                                <TextField
                                    label="description"
                                    name="description"
                                    // defaultValue={`${userData.firstName} ${userData.lastName}`}
                                    variant="outlined"
                                    value={formData.description}
                                    onChange={handleChange}

                                />
                                :
                                (<Typography> {formData.description}</Typography>)}
                        </Box>
                    </Grid>


                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" mb={1} >
                            <DescriptionIcon style={{ color: "DarkViolet" }} sx={{ mr: 1 }} />
                            <Typography>
                                <strong>PDF Document :</strong></Typography>
                            {editMode ?
                                <Typography>
                                    <Box display="flex" alignItems="center">
                                        <Button
                                            variant="contained"
                                            component="label"
                                        >
                                            Upload File
                                            <input
                                                type="file"
                                                hidden
                                                onChange={handleChange}
                                                name="medicalRecordUploadPath"
                                            />
                                        </Button>

                                        <Button variant="contained" color="primary" onClick={handleDownload}>
                                            Download {fileName}
                                        </Button>

                                        {uploadFile ? <Typography variant="body2" style={{ marginTop: '10px' }}>{formData.filePath}</Typography>
                                            : <Typography></Typography>}
                                        {/* {formData.medicalRecordUploadPath?
                                 <Typography variant="body2" style={{ marginTop: '10px' }}>{formData.filePath}</Typography>
                                : <Typography/>} */}
                                    </Box>
                                </Typography>

                                :
                                <Typography> {fileName  ? <Typography><Button variant="contained" color="primary" onClick={handleDownload}>
                                    Download {fileName}
                                </Button> </Typography> : <Typography />}</Typography>
                            }

                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" mb={1} >
                            <NoteIcon style={{ color: "DarkViolet" }} sx={{ mr: 1 }} />
                            <Typography><strong>Notes :</strong></Typography>
                            {editMode ?
                                <TextField
                                    label="Notes"
                                    name="notes"
                                    variant="outlined"
                                    value={formData.notes}
                                    onChange={handleChange}

                                />
                                : (<Typography> {formData.notes}</Typography>)}
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                {editMode ?
                    <Typography style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Button color="error" variant="contained" fontWeight="bold" onClick={() => handleCancel()}>Cancel Upload</Button>
                    </Typography>
                    : <Typography />}


                {event.endTime <= new Date() && !editMode && isDoctor ?
                    <Button color="primary" variant="contained" fontWeight="bold" onClick={() => handleEditToggle()}>
                        Update Medical Record</Button>
                    : <Typography></Typography>}

                {event.endTime <= new Date() && editMode ?
                    <Button color="primary" onClick={handleSubmit} variant="contained" fontWeight="bold" >
                        Update the existing !</Button>
                    : <Typography></Typography>}

                <Button onClick={onClose} color="error" variant="contained" fontWeight="bold">Close</Button>
            </DialogActions>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message={message}
            />
        </Dialog>
    );
};

export default AppointmentRecordModal;
