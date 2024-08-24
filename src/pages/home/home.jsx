import React from 'react';
import { useNavigate } from 'react-router-dom';
import doc from '../Navbar/doc.jpeg';
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

  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div>
      

      <div className="contentContainer" >
        <div className="statements" style={{marginTop:"200px"}}>
          <p className="statement , statement1" >Welcome at DocuMed</p>
          <p className="statement , statement2">Connecting Doctors and Patients through the Digital word </p>
          <p className="statement , statement3" >DocuMed is a palatform designed to facilitate the communication between the Doctor and the Patients . It offers a Digital Records , appointment taking and many others services that the will discover after your log in ! </p>
        </div>

        <div>
        <div className="imageContainer">
          <img src='/assets/doctori.png' alt="Document" className="docImage1"   style={{width:"500px",  }}/>
        </div>
      </div>
      </div>
    <div className='all'>
      <div className="servicesSection">
          <h2>Our Services for You</h2>
        </div>
      <div className="services">
        <div className="imageGroup">
          <div className="imageItem">
            <img src={heart} alt="Heart" className="heartImage" />
            <p>Free access to all Doctors</p>
          </div>
          <div className="imageItem">
            <img src={calen} alt="Calendar" className="calanderImage" />
            <p>Pick the convinient appointment</p>
          </div>
          <div className="imageItem">
            <img src={patient} alt="Patient" className="patientImage" />
            <p>Online Docs availibility</p>
          </div>
        </div>
      </div>
      </div>   
    <div className='divii' >
      <div className="askdoc">
        <h1 className='alignili , areu'>Are you a doctor?</h1>
        <img src={helpdoc} alt="Help Document" className="docImage" />
        <p className='alignili'>All communications, including appointment reminders, prescriptions, and follow-up instructions, are stored digitally. This helps in maintaining a comprehensive record of patient interactions and can be easily accessed when needed.</p>
      </div>
    </div>
      <div className="askpatient">
        <h1>Are you a patient?</h1>
        <img src={pat} alt="pat" className="pat" />
        <p>Patients can actively participate in their healthcare by asking questions, tracking their symptoms, and receiving educational materials. This fosters a more collaborative approach to health management.</p>
      </div>
    </div>
  );
};
