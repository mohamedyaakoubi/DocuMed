import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Footer.css';  

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row text-center">
          <div className="col-12">
            <div className="footer_menu mb-3">
              <ul className="list-unstyled d-flex justify-content-center">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Works</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer_copyright mb-3">
              <p className="mb-0">© 2024 TN. All Rights Reserved.</p>
            </div>
            <div className="footer_profile">
              <ul className="list-unstyled d-flex justify-content-center">
                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>
                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
