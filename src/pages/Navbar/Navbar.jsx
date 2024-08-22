import React from 'react';
import doc from './doc.jpeg';

export const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navButtons}>
        <button style={styles.navButton}>Home</button>
        <button style={styles.navButton}>Contact</button>
        <button style={styles.navButton}>Login</button>
        <button style={styles.navButton}>Sign up</button>
        <button style={styles.navButton}>Help</button>
      </div>
      <div style={styles.logoContainer}>
        <img src={doc} alt="Document" style={styles.logo} />
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007bff',
  },
  navButtons: {
    display: 'flex',
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: '#555',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    margin: '0 10px',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '5px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '40px', // Adjust the height as needed
    width: 'auto',
  },
};

export default Navbar;
