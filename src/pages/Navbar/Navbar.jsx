import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './Navbar.css';

const Navbar = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const firestore = getFirestore();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (currentUser) {
        const userDocRef = doc(firestore, 'patients', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserRole('patient');
        } else {
          const doctorDocRef = doc(firestore, 'doctors', currentUser.uid);
          const doctorDoc = await getDoc(doctorDocRef);

          if (doctorDoc.exists()) {
            setUserRole('doctor');
          } else {
            console.error('User role not found!');
          }
        }
      }
    };

    fetchUserRole();
  }, [currentUser, firestore]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAppointmentsClick = () => {
    navigate('/appointments');
  };

  const handleParametersClick = () => {
    if (userRole === 'patient') {
      navigate('/ClientParams');
    } else if (userRole === 'doctor') {
      navigate('/DocParams');
    }
  };

  const handleMyRecord = () => {
    if (userRole === 'patient') {
      navigate(`/PatientRecord/${currentUser.uid}`);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#e3f2fd' }}>
        <div className="container-fluid">
          <a className="navbar-brand me-auto" href="#">Logo</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Logo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link mx-lg-2 active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-lg-2" to="/login">Log In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-lg-2" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-lg-2" to="/pricing">Pricing</Link>
                </li>
                {userRole === 'patient' && (
                  <>
                    <li className="nav-item">
                      <Link className=" nav-link mx-lg-2" onClick={handleAppointmentsClick}>My Appointments</Link>
                    </li>
                    <li className="nav-item">
                      <Link className=" nav-link mx-lg-2" onClick={handleMyRecord}>My Records</Link>
                    </li>
                  </>
                )}
                {userRole && (
                  <li className="nav-item">
                    <Link className="nav-link mx-lg-2" to={userRole === 'doctor' ? '/DocDashboard' : '/ClientDashboard'}>
                      Dashboard
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link mx-lg-2" onClick={handleParametersClick}>Parameters</Link>
                </li>
              </ul>
            </div>
          </div>
          {currentUser && (
            <Link className="btn btn-outline-danger" onClick={handleLogout}>Logout</Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
