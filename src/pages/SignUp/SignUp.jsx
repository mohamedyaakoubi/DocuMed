import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <img src="c:/Users/GigaByte/Desktop/new project/3584597.jpg" alt="Logo" style={{ width: '50px' }} />
        <h5 style={{ margin: 0 }}>Centre d'aide ?</h5>
      </nav>
      
      {/* Main Section */}
      <section style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        backgroundColor: '#007bff',
        color: '#fff'
      }}>
        <div style={{
          backgroundColor: '#d78b8b',
          padding: '30px 50px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }}>
          <h3 style={{ marginBottom: '30px' }}>Are you?</h3>
          <button
            onClick={() => navigate('/DocSignUp')}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              backgroundColor: '#fff',
              color: '#007bff',
              border: '2px solid #007bff',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            I am a Doctor
          </button>
          <button
            onClick={() => navigate('/ClientSignUp')}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              backgroundColor: '#fff',
              color: '#007bff',
              border: '2px solid #007bff',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            I am a Patient
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <footer style={{
        backgroundColor: '#20c997',
        padding: '10px 0',
        textAlign: 'center',
        color: '#fff'
      }}>
        <p style={{ margin: 0 }}>Hello here footer</p>
      </footer>
    </div>
  );
};
