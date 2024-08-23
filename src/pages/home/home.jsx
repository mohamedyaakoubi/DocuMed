import React from 'react';
import doc from '../Navbar/doc.jpeg';
import heart from '../Navbar/heart.png';
import calander from '../Navbar/calander.jpeg';  // Ensure this file exists
import helpdoc from '../Navbar/helpdoc.jpg';
import patient from '../Navbar/patient.png';
import pat from './pat.jpg';
import calen from './calen.png'
import './Home.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';

export const Home = () => {
  return  (
    <div>
      <div className="contentContainer">
        <div className="statements">
          <p className="statement">Communicating with Doctors</p>
          <p className="statement">Enhancing Accessibility and Convenience</p>
          <p className="statement">Improving Patient Engagement and Compliance</p>
        </div>

        <div>
        <div className="imageContainer">
          <img src={doc} alt="Document" className="docImage" />
        </div>
      </div>
      </div>
      <div className="servicesSection">
        <h2>Our Services for You</h2>
      </div>

      <div className="imageGroup">
        <div className="imageItem">
          <img src={heart} alt="Heart" className="heartImage" />
          <p>desc here</p>
        </div>
        <div className="imageItem">
          <img src={calen} alt="Calendar" className="calanderImage" />
          <p>desc here</p>
        </div>
        <div className="imageItem">
          <img src={patient} alt="Patient" className="patientImage" />
          <p>desc here</p>
        </div>
      </div>

      <div className="askdoc">
        <h1>Are you a doctor?</h1>
        <img src={helpdoc} alt="Help Document" className="docImage" />
        <p>All communications, including appointment reminders, prescriptions, and follow-up instructions, are stored digitally. This helps in maintaining a comprehensive record of patient interactions and can be easily accessed when needed.</p>
      </div>

      <div className="askpatient">
        <h1>Are you a patient?</h1>
        <img src={pat} alt="pat" className="pat" />
        <p>Patients can actively participate in their healthcare by asking questions, tracking their symptoms, and receiving educational materials. This fosters a more collaborative approach to health management.</p>
      </div>
    </div>
  );
};
