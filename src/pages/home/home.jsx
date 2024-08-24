import React from 'react';
import { useNavigate } from 'react-router-dom';
import doc from '../../imgs/doctorrr.png';
import heart from '../Navbar/heart.png';
import calander from '../Navbar/calander.jpeg';
import helpdoc from '../Navbar/helpdoc.jpg';
import patient from '../Navbar/patient.png';
import pat from './pat.jpg';

import calen from './calen.png'
import './Home.css'


import './Home.css';


import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';

export const Home = () => {


  const navigate = useNavigate(); 

  const navigate = useNavigate(); // Initialize the navigate function


  return (
    <div>
      

      <div className="servicesSection1">
        <h2>Who are we ?</h2>
      </div>
      <div className="contentContainer">
      
        <div className="statements">
          
          <p className="statement">enhancing both accessibility and convenience in healthcare. Patients can easily schedule appointments, access medical records, and consult with doctors from the comfort of their homes, reducing the need for in-person visits and long waiting times. For doctors, the app streamlines communication, enabling them to manage appointments, track patient progress, and provide timely advice or follow-ups, leading to more efficient and personalized care. Additionally, the app can support telemedicine services, expanding healthcare access to remote or underserved areas and improving overall patient outcomes.</p>
          <br />
          <p className="statement">An app that connects doctors with patients revolutionizes healthcare by fostering continuous and real-time communication. Patients can quickly reach out to their healthcare providers with concerns or questions, receiving prompt responses that can prevent minor issues from escalating. The app also supports better coordination of care, allowing multiple healthcare professionals to collaborate more effectively on a patient's treatment plan. Furthermore, with features like reminders for medication and appointments, patients are more likely to adhere to their prescribed treatments, enhancing the effectiveness of care. Overall, the app empowers patients with greater control over their health while enabling doctors to deliver more proactive and tailored care.</p>

          
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
          <p>Care</p>
        </div>
        <div className="imageItem">
          <img src={calen} alt="Calendar" className="calanderImage" />
          <p>Appoitments</p>
        </div>
        <div className="imageItem">
          <img src={patient} alt="Patient" className="patientImage" />
          <p>secure filing</p>
        </div>
      </div>

      <div className="askdoc">
        <h1>Are you a doctor?</h1>
        <br />

        <img src={helpdoc} alt="Help Document" className="docImage" />
        <br />
        <p>All communications, including appointment reminders, prescriptions, and follow-up instructions, are stored digitally. This helps in maintaining a comprehensive record of patient interactions and can be easily accessed when needed.</p>
      </div>

      <div className="askpatient">
        <h1>Are you a patient?</h1>
        <img src={pat} alt="pat" className="pat" />
        <br />
        <p>Patients can actively participate in their healthcare by asking questions, tracking their symptoms, and receiving educational materials. This fosters a more collaborative approach to health management.</p>
      </div>
    </div>
  );
};