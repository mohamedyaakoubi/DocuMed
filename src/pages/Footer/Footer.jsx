
import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Footer.css';  
export const Footer = () => {
return (
<div className="footer">
   <div className="container">
      <div className="row text-center">
         <div className="col-lg-12 col-sm-12 col-xs-12">
            <div className="footer_menu">
               <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Service</a></li>
                  <li><a href="#">Works</a></li>
                  <li><a href="#">Contact</a></li>
               </ul>
            </div>
            <div className="footer_copyright">
               <p>© 2024 TN. All Rights Reserved.</p>
            </div>
            <div className="footer_profile">
               <ul>
                  <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="#"><i class="fa-solid fa-x"></i></a></li>
                  <li><a href="#"><i class="fa-brands fa-google-plus-g"></i></a></li>
                  <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
               </ul>
            </div>
         </div>
      </div>
   </div>
</div>

)};


