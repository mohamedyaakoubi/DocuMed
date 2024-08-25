import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import './Navbar.css'

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
    <>
    {/* navbar */}
    <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand me-auto" href="#">Logo</a>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Logo</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
              <li class="nav-item">
                <Link className="nav-link mx-lg-2 active" aria-current="page" to="/">Home</Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link mx-lg-2" to="/login">Services</Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link mx-lg-2" to="/about">About</Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link mx-lg-2" to="/contact">Contact</Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link mx-lg-2" to="/">Help center</Link>
              </li>

            </ul>
          </div>
        </div>
        <a href='#' className='login-button'>Login</a> 
        <button class="navbar-toggler pe-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
