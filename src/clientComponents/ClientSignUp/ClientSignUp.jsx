import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../Configs/firebase'; // Adjust the path according to your project structure
import '../../DoctorComponents/styleSignUp.css'
import { Link } from 'react-router-dom';

export const ClientSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Save additional user info to Firestore without the password
      const patientId = user.uid; // Use user ID as patient ID
      await setDoc(doc(db, 'patients', patientId), {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phone: Number(formData.phone),
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        patientId,
      });

      // Redirect to ClientDashboard
      navigate('/ClientDashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <div class="body">
      <section  class="container">
        <div class="container , containerdiv" >

          <Form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <Form.Label ><center>Sign up</center></Form.Label>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSurname">
                <Form.Label>Family name</Form.Label>
                <Form.Control type="text" placeholder="Enter family name" name="surname" value={formData.surname} onChange={handleChange} />
              </Form.Group>
            

            
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="phone" placeholder="Enter phone number" name="phone" value={formData.phone} onChange={handleChange} />
              </Form.Group>
            

            
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" name="password" value={formData.password} onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Re-enter password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
              </Form.Group>
            

            <Form.Group className="mb-3" controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" name="address" value={formData.address} onChange={handleChange} />
            </Form.Group>

            
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Select name="city" value={formData.city} onChange={handleChange}>
                  <option>Choose...</option>
                  <option value="tunis">Tunis</option>
                  <option value="sfax">Sfax</option>
                  <option value="sousse">Sousse</option>
                  <option value="bizerte">Bizerte</option>
                  <option value="gabes">Gabès</option>
                  <option value="nabeul">Nabeul</option>
                  <option value="kairouan">Kairouan</option>
                  <option value="monastir">Monastir</option>
                  <option value="mahdia">Mahdia</option>
                  <option value="gafsa">Gafsa</option>
                  <option value="tozeur">Tozeur</option>
                  <option value="medenine">Médenine</option>
                  <option value="kasserine">Kasserine</option>
                  <option value="sidi-bouzid">Sidi Bouzid</option>
                  <option value="tataouine">Tataouine</option>
                  <option value="beja">Beja</option>
                  <option value="jendouba">Jendouba</option>
                  <option value="zaghouan">Zaghouan</option>
                  <option value="siliana">Siliana</option>
                  <option value="kebili">Kebili</option>
                  <option value="ariana">Ariana</option>
                  <option value="manouba">Manouba</option>
                  <option value="ben-arous">Ben Arous</option>
                  <option value="kef">Le Kef</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control name="state" value={formData.state} onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control name="zip" value={formData.zip} onChange={handleChange} />
              </Form.Group>
            

            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit" className='sign-up-btn, form-button'>
              Sign Up
            </Button>
          </Form>
        
      

          <Link to="/login" className="signin-link ">Already have an account?</Link>

          </div>
      </section>
    </div>
    </>
  );
};
