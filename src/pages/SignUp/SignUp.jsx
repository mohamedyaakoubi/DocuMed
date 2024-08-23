import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div>
      <nav style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'antiquewhite' }}>
        <img src="c:/Users/GigaByte/Desktop/new project/3584597.jpg" alt="Logo" style={{ width: '50px' }} />
        <h5>Centre d'aide ?</h5>
      </nav>
      
      <section style={{ backgroundColor: 'blue', width: '100%', height: '87vh', marginTop: '-20px' }}>
        <div style={{ backgroundColor: 'rgb(215, 139, 139)', width: '50%', alignItems: 'center' }}>
          <h3>Are you?</h3>
          <button onClick={() => navigate('/DocSignUp')}>I am a Doctor</button><br/>
          <button onClick={() => navigate('/ClientSignUp')}>I am a Patient</button>
        </div>
      </section>
      
      <footer style={{ backgroundColor: 'aquamarine' }}>
        <center>Hello here footer</center>
      </footer>
    </div>
  );
};
