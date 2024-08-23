import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home/Home.jsx';
import { About } from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import { LogIn } from './Pages/LogIn/LogIn';
import { SignUp } from './Pages/SignUp/SignUp';
import { Footer } from './Pages/Footer/Footer';


import {ClientDashboard} from './ClientComponents/ClientDashboard/ClientDashboard.jsx'
import Navbar from './Pages/Navbar/Navbar'; 
import { Pricing } from './Pages/Pricing/Pricing';

import { ClientSignUp } from './ClientComponents/ClientSignUp/ClientSignUp';
import DocSignUp from './DoctorComponents/DoctorSignUp/DocSignUp.jsx';
import { ClientParams } from './ClientComponents/ClientParameters/ClientParams';

import { ClientAppointments } from './ClientComponents/ClientAppointments/ClientAppoitnments.jsx';
import {Appointments} from './ClientComponents/Appointments/Appointments.jsx';

import DoctorParams from './DoctorComponents/DoctorParameters/DoctorParams';
import { PatientRecord } from './DoctorComponents/DocPatientVisualization/PatientRecord';
import { DocDashboard } from './DoctorComponents/DocDhashboard/DocDashboard';
import { DocInsertion } from './DoctorComponents/DocInertion/DocInsertion';
import MakeAppointment from './ClientComponents/Appointments/MakeAppointment.jsx';




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

                      <Route path="/ClientDashboard" element={<ClientDashboard />} />
                      <Route path="/ClientAppointments" element={<ClientAppointments />} />
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
