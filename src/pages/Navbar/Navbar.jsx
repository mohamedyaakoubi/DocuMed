import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';

import './Navbar.css'

import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';


const Navbar = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      const fetchUserRole = () => {
        const userRole = JSON.parse(localStorage.getItem("userRole"));
        console.log("Fetched userRole:", userRole); // Debugging line
        setUserRole(userRole);
      };

      fetchUserRole();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.clear();
      navigate('/Login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAppointmentsClick = () => {
    navigate('/appointments');
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#e3f2fd' }}>
      <a className="navbar-brand" href="#">My App</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home <span className="sr-only"></span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Log In</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pricing">Pricing</Link>
          </li>
          {userRole === 'patient' && (
            <li className="nav-item">
              <button className="btn btn-primary" onClick={handleAppointmentsClick}>
                My Appointments
              </button>
            </li>
          )}
          {userRole && (
            <li className="nav-item">
              <Link className="nav-link" to={userRole === 'doctor' ? '/DocDashboard' : '/ClientDashboard'}>
                Dashboard
              </Link>
            </li>
          )}
        </ul>
        {currentUser && (
          <button className="btn btn-outline-danger my-2 my-sm-0" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
