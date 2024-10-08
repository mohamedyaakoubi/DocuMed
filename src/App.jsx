import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home/Home.jsx';
import { About } from './Pages/About/About.jsx';
import Contact from './Pages/Contact/Contact.jsx';
import { LogIn } from './Pages/LogIn/LogIn.jsx';
import { SignUp } from './Pages/SignUp/SignUp.jsx';
import { Footer } from './Pages/Footer/Footer.jsx';
import ClientDashboard from './ClientComponents/ClientDashboard/ClientDashboard.jsx';
import Navbar from './Pages/Navbar/Navbar.jsx'; 
import { Pricing } from './Pages/Pricing/Pricing.jsx';
import { ClientSignUp } from './ClientComponents/ClientSignUp/ClientSignUp.jsx';
import DocSignUp from './DoctorComponents/DoctorSignUp/DocSignUp.jsx';
import { ClientParams } from './ClientComponents/ClientParameters/ClientParams.jsx';
import Appointments from './ClientComponents/Appointments/Appointments.jsx';
import MakeAppointment from './ClientComponents/Appointments/MakeAppointment.jsx';
import DoctorParams from './DoctorComponents/DoctorParameters/DoctorParams.jsx';
import PatientRecord from './DoctorComponents/DocPatientVisualization/PatientRecord.jsx';
import DocDashboard from './DoctorComponents/DocDhashboard/DocDashboard.jsx';
import DocInsertion from './DoctorComponents/DocInertion/DocInsertion.jsx';


function App() {
  return (
    
      <div className="App">
        
          <BrowserRouter>
              <Navbar />
              <main>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/About" element={<About />} />
                      <Route path="/Contact" element={<Contact />} />
                      <Route path="/LogIn" element={<LogIn />} />
                      <Route path="/Signup" element={<SignUp />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/ClientDashboard" element={<ClientDashboard />} />
                      <Route path="/ClientSignUp" element={<ClientSignUp />} />
                      <Route path="/DocSignUp" element={<DocSignUp />} />
                      <Route path="/ClientParams" element={<ClientParams />} />
                     
                      <Route path="/Appointments" element={<Appointments />} />
                      <Route path="/DoctorParams" element={<DoctorParams />} />
                      <Route path="/PatientRecord/:patientId" element={<PatientRecord />} />
                      <Route path="/DocInsertion" element={<DocInsertion />} />
                      <Route path="/Docdashboard" element={<DocDashboard />} />
                      <Route path="/MakeAppointment" element={<MakeAppointment />} />
                      <Route path="*" element={<Home />} />
                  </Routes>
              </main>
              <Footer />
          </BrowserRouter>
      </div>
     
  );
}

export default App;
