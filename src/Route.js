import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './home';
import Navbar from './frontend/Navbar';
import Footer from './frontend/footer';
import SignupForm from './frontend/SignupForm';
import LoginForm from './frontend/LoginForm';
import Dashboard from './frontend/DashboardUser';
import SeeAllDoctors from './frontend/SeeAllDoctors';
import DoctorDegreeForm from './frontend/DoctorDegreeForm';
import DoctorSpecialityForm from './frontend/DoctorSpecialityForm';
import BookAppointment from './frontend/BookAppointment';
import CreateNewAppointment from './frontend/CreateNewAppointment';
import ViewUpcomingAppointments from './frontend/ViewUpcomingAppointments';
import ViewPreviousAppointments from './frontend/ViewPreviousAppointment';
import About from './frontend/About';
import Services from './frontend/Services';
import Contact from './frontend/Contact';
import Careers from './frontend/Careers';
import FAQs from './frontend/FAQ';
import Blog from './frontend/Blog';
import HelpCenter from './frontend/HelpCenter';
import PrivacyPolicy from './frontend/PrivacyPolicy';
import TermsPage from './frontend/TermsAndConditions';
import ViewMedicalRecords from './frontend/ViewMedicalRecord';
import CalendarSchedule from './frontend/CalendarSchedule';
import BookAppointmentCalendarSchedule from './frontend/BookAppointmentCalendarSchedule';
import Settings from './frontend/Settings';
import ViewUpcomingAppointmentsDoctor from './frontend/ViewUpcomingAppointmentsDoctor';
import ViewPreviousAppointmentsDoctor from './frontend/ViewPreviousAppointmentDoctor';
import DoctorSchedule from './frontend/DoctorSchedule';
import ViewPeopleDoctor from './frontend/ViewPeopleDoctor';
import AllAppointmentPatient from './frontend/AllAppointmentPatient';
import ViewUpcomingAppointmentsAdmin from './frontend/ViewUpcomingAppointmentsAdmin';
import ViewPreviousAppointmentsAdmin from './frontend/ViewPreviousAppointmentsAdmin';
import AllPatients from './frontend/AllPatients';
import GiveFeedback from './frontend/GiveFeedback';
import ViewFeedback from './frontend/ViewFeedback';

const RouteFrontend =() => {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/signup" element={<SignupForm doctor={false}/>} /> 
                <Route path="/login" element={<LoginForm />} /> 
                <Route path="/createnewappointment" element={<CreateNewAppointment />} />
                <Route path="/dashboard" element={<Dashboard />} />  
                <Route path="/seealldoctors" element={<SeeAllDoctors />} /> 
                <Route path="/doctorDegreeForm" element={<DoctorDegreeForm />} /> 
                <Route path="/adddoctordegree" element={<DoctorDegreeForm />} /> 
                <Route path="/doctorSpecialityForm" element={<DoctorSpecialityForm />} />
                <Route path="/adddoctorspeciality" element={<DoctorSpecialityForm />} />
                <Route path="/bookAppointment/:AppointmentDate/:StartTime/:EndTime" element={<BookAppointment />} />
                <Route path="/viewupcomingappointments" element={<ViewUpcomingAppointments />} />
                <Route path="/viewmedicalrecords" element={<ViewMedicalRecords />} />
                <Route path="/uploaddocuments" element={<HomePage />} />
                <Route path="/givefeedback" element={<GiveFeedback />} />
                <Route path="/viewfeedbacks" element={<ViewFeedback />} />
                <Route path="/viewpreviousappointments" element={<ViewPreviousAppointments />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/helpcenter" element={<HelpCenter />} />
                <Route path="/privatepolicy" element={<HomePage />} />
                <Route path="/faq" element={<FAQs />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/termsandconditions" element={<TermsPage/>} />
                <Route path="/viewschedule" element={<CalendarSchedule/>} />
                <Route path="/appointmentDateAndTime" element={<CalendarSchedule/>} />
                <Route path="/settings" element={<Settings/>} />
                <Route path="/viewupcomingappointmentsdoctor" element={<ViewUpcomingAppointmentsDoctor />} />
                <Route path="/viewpreviousappointmentsdoctor" element={<ViewPreviousAppointmentsDoctor />} />
                <Route path="/schedule" element={<DoctorSchedule/>} />
                <Route path="/uploadmedicalrecord" element={<DoctorSchedule/>} />
                <Route path="/viewpatients" element={<ViewPeopleDoctor/>} />
                <Route path="/allAppointmentPatient" element={<AllAppointmentPatient/>} />
                <Route path="/viewalldoctors" element={<AllPatients doctor={true}/>} />
                <Route path="/viewallpatients" element={<AllPatients doctor={false}/>} />
                <Route path="/viewupcomingappointmentsadmin" element={<ViewUpcomingAppointmentsAdmin/>} />
                <Route path="/viewpreviousappointmentsadmin" element={<ViewPreviousAppointmentsAdmin/>} />
                <Route path="/addadoctor" element={<SignupForm doctor={true}/>} />
            </Routes>
            <Footer/>
        </Router>
    );
};




export default RouteFrontend;
