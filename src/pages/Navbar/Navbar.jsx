import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import { useUser } from '../../Context/UserContext';

const Navbar = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const firestore = getFirestore();

  useEffect(() => {
    setUserRole(localStorage.getItem("role"))
    const fetchUserRole = async () => {
      if (currentUser) {
        const userDocRef = doc(firestore, 'patients', currentUser.uid); // Check 'patients' collection first
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserRole('patient');
        } else {
          // Check 'doctors' collection if not found in 'patients'
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

    // fetchUserRole();
  }, [currentUser, firestore]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/Login');
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
  const HandleMyRecord = () => {
    if (userRole === 'patient') {
      navigate(`/PatientRecord/${currentUser.uid}`);
    }
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
              <button className="btn btn-primary" onClick={HandleMyRecord}>
                My Records
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
          <li className="nav-item">
            <button className="btn btn-secondary" onClick={handleParametersClick}>
              Parameters
            </button>
          </li>
        </ul>
        {currentUser && (
          <button className="btn btn-outline-danger my-2 my-sm-0" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
