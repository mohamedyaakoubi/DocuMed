import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Import the CSS file

export const SignUp = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <img src="c:/Users/GigaByte/Desktop/new project/3584597.jpg" alt="Logo" />
        <h5>Centre d'aide ?</h5>
      </nav>
      
      {/* Main Section */}
      <section className="main-section">
        <div className="main-content">
          <h3>Are you?</h3>
          <button
            onClick={() => navigate('/DocSignUp')}
            className="signup-button"
          >
            I am a Doctor
          </button>
          <button
            onClick={() => navigate('/ClientSignUp')}
            className="signup-button"
          >
            I am a Patient
          </button>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
