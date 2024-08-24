import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../Configs/firebase'; // Adjust the path according to your project structure
import '../../doctorComponents/styleSignUp.css';
import { Link } from 'react-router-dom';

export const ClientSignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        familyName: '',
        email: '',
        phoneNumber: '',
        password: '',
        checkPassword: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.checkPassword) {
            alert('Passwords do not match!');
            return;
        }
        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            await setDoc(doc(db, 'clients', userCredential.user.uid), {
                name: formData.name,
                familyName: formData.familyName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                address1: formData.address1,
                address2: formData.address2,
                city: formData.city,
                state: formData.state,
                zip: formData.zip,
            });
            navigate('/ClientDashboard');
        } catch (error) {
            console.error('Error signing up: ', error);
            alert('Error signing up: ' + error.message);
        }
    };

    return (
        <>
            <div>
                <nav
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        backgroundColor: 'antiquewhite',
                    }}
                >
                    <img
                        src="c:/Users/GigaByte/Desktop/new project/3584597.jpg"
                        alt="Logo"
                        style={{ width: '50px' }}
                    />
                    <h5>Centre d'aide ?</h5>
                    <Link to="/login">Already have an account?</Link>
                </nav>

                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridFamilyName">
                            <Form.Label>Family name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter family name"
                                name="familyName"
                                value={formData.familyName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPhoneNumber">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                                type="phone"
                                placeholder="Enter phone number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCheckPassword">
                            <Form.Label>Check Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Renter password"
                                name="checkPassword"
                                value={formData.checkPassword}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            placeholder="1234 Main St"
                            name="address1"
                            value={formData.address1}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control
                            placeholder="Apartment, studio, or floor"
                            name="address2"
                            value={formData.address2}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Select
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            >
                                <option value="">Choose...</option>
                                <option value="Tunis">Tunis</option>
                                <option value="Ariana">Ariana</option>
                                <option value="Ben Arous">Ben Arous</option>
                                <option value="Manouba">Manouba</option>
                                <option value="Sfax">Sfax</option>
                                <option value="Sousse">Sousse</option>
                                <option value="Gabès">Gabès</option>
                                <option value="Bizerte">Bizerte</option>
                                <option value="Nabeul">Nabeul</option>
                                <option value="Kairouan">Kairouan</option>
                                <option value="Kasserine">Kasserine</option>
                                <option value="Gafsa">Gafsa</option>
                                <option value="Beja">Beja</option>
                                <option value="Jendouba">Jendouba</option>
                                <option value="Le Kef">Le Kef</option>
                                <option value="Mahdia">Mahdia</option>
                                <option value="Monastir">Monastir</option>
                                <option value="Medenine">Medenine</option>
                                <option value="Tataouine">Tataouine</option>
                                <option value="Tozeur">Tozeur</option>
                                <option value="Kebili">Kebili</option>
                                <option value="Zaghouan">Zaghouan</option>
                                <option value="Siliana">Siliana</option>
                                <option value="Sidi Bouzid">Sidi Bouzid</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="State"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Zip"
                                name="zip"
                                value={formData.zip}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

                <footer style={{ backgroundColor: 'aquamarine' }}>
                    <center>Hello here footer</center>
                </footer>
            </div>
        </>
    );
};
