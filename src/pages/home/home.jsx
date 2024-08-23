import React from 'react';
import doc from '../Navbar/doc.jpeg';
import heart from '../Navbar/heart.png';
import calander from '../Navbar/calander.jpeg';  // Ensure this file exists
import helpdoc from '../Navbar/helpdoc.jpg';
import patient from '../Navbar/patient.png';
import pat from './pat.jpg';
import './Home.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';

export const Home = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navButtons">
          <Button className="navButton">Home</Button>
          <button className="navButton">Contact</button>
          <button className="navButton">Login</button>
          <button className="navButton">Sign Up</button>
          <button className="navButton">Help</button>
          
        </div>
      </nav>

      <div className="contentContainer">
        <div className="statements">
          <div className="statement">Communicating with Doctors</div>
          <div className="statement">Enhancing Accessibility and Convenience</div>
          <div className="statement">Improving Patient Engagement and Compliance</div>
        </div>

        <div className="imageContainer">
          <img src={doc} alt="Document" className="docImage" />
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
          <img src={calander} alt="Calendar" className="calanderImage" />
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
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque nobis quae voluptate atque delectus! Et voluptates exercitationem illo, excepturi quibusdam sit dolore adipisci nobis, doloribus quae maxime fugit minus consequuntur?</p>
      </div>

      <div className="askpatient">
        <h1>Are you a patient?</h1>
        <img src={pat} alt="pat" className="pat" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo repudiandae, totam optio ipsa illum aliquam animi, impedit soluta quia distinctio dolorem fugiat quibusdam quidem possimus iste ducimus odio ab numquam.</p>
      </div>
    </div>
  );
};
