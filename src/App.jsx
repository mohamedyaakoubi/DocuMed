import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home/home';
import { About } from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import { LogIn } from './Pages/LogIn/LogIn';
import { SignUp } from './Pages/SignUp/SignUp';
import { Footer } from './Pages/Footer/Footer';


import {ClientDashboard} from './ClientComponents/ClientDashboard/clientDashboard'
import Navbar from './Pages/Navbar/Navbar'; 
import { Pricing } from './Pages/Pricing/Pricing';

import { ClientSignUp } from './ClientComponents/ClientSignUp/ClientSignUp';
import DocSignUp from './doctorComponents/doctorSignUp/docSignUp';
import { ClientParams } from './ClientComponents/ClientParameters/ClientParams';

import {Appointments} from './ClientComponents/appointments/appointments';


import DoctorParams from './DoctorComponents/DoctorParameters/DoctorParams';
import { PatientRecord } from './DoctorComponents/DocPatientVisualization/PatientRecord';
import { DocDashboard } from './DoctorComponents/DocDhashboard/DocDashboard';
import DocInsertion from './DoctorComponents/DocInertion/DocInsertion.jsx';
import MakeAppointment from './ClientComponents/Appointments/MakeAppointment.jsx';

import DoctorParams from './doctorComponents/doctorParameters/DoctorParams';
import { PatientRecord } from './doctorComponents/DocPatientVisualization/PatientRecord';
import { DocDashboard } from './doctorComponents/DocDhashboard/DocDashboard';
import { DocInsertion } from './doctorComponents/DocInertion/DocInsertion';
import MakeAppointment from './ClientComponents/appointments/MakeAppointment.jsx';


import {UserProvider} from './Context/UserContext.jsx'

function App() {
  return (
    <UserProvider>
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
      </UserProvider>
  );
}

export default App;
