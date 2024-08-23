import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../Configs/firebase'; // Ensure this path is correct
import { collection, addDoc } from 'firebase/firestore';

const DocSignUp = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');

    // Redirect if user is already authenticated
    useEffect(() => {
        const authUserString = localStorage.getItem('auth');
        if (authUserString !== null) {
            navigate('/docDashboard');
        }
    }, [navigate]);

    // Validation schema
    const userSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        surname: yup.string().required('Surname is required'),
        tel: yup.string().required('Telephone number is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        address: yup.string().required('Address is required'),
        pass: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
    });

    // Form methods
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userSchema),
    });

    // Form submission
    const submitData = async (data) => {
        try {
            // Create user with Firebase Authentication
            const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.pass);
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName: `${data.name} ${data.surname}` });
                const authUser = {
                    email: data.email,
                    name: data.name,
                    surname: data.surname,
                    isAuth: true,
                };
                localStorage.setItem('auth', JSON.stringify(authUser));

                // Add new doctor to Firestore
                await addDoc(collection(db, 'doctors'), {
                    docAddress: data.address,
                    docId: userCredentials.user.uid,
                    email: data.email,
                    name: data.name,
                    surname: data.surname,
                    tel: data.tel,
                    verified: false, // Optional field
                });

                // Redirect to the dashboard
                navigate('/docDashboard');
            }
        } catch (err) {
            console.error('Error signing up:', err.message);
            setErrorMessage(err.message);
        }
    };

    // Handle specialty change
    const handleSpecialtyChange = (event) => {
        setSelectedSpecialty(event.target.value);
    };

    return (
        <div>
            <nav style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'antiquewhite' }}>
                <img src="c:/Users/GigaByte/Desktop/new project/3584597.jpg" alt="Logo" style={{ width: '50px' }} />
                <h5>Centre d'aide ?</h5>
                <button>Let's Connect</button>
            </nav>

            <section style={{ backgroundColor: 'blue', width: '100%', height: '87vh', marginTop: '-20px' }}>
                <div style={{ backgroundColor: 'rgb(215, 139, 139)', width: '50%', alignItems: 'center' }}>
                    <form onSubmit={handleSubmit(submitData)} className="signup-form">
                        <label>Your name</label>
                        <input type="text" placeholder="Name" {...register('name')} />
                        {errors.name && <p className="error-message">{errors.name.message}</p>}
                        
                        <label>Your surname</label>
                        <input type="text" placeholder="Surname" {...register('surname')} />
                        {errors.surname && <p className="error-message">{errors.surname.message}</p>}
                        
                        <label>Telephone</label>
                        <input type="text" placeholder="Telephone" {...register('tel')} />
                        {errors.tel && <p className="error-message">{errors.tel.message}</p>}
                        
                        <label>Your email</label>
                        <input type="text" placeholder="Email" {...register('email')} />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                        
                        <label>Address</label>
                        <input type="text" placeholder="Address" {...register('address')} />
                        {errors.address && <p className="error-message">{errors.address.message}</p>}
                        
                        <label>Password</label>
                        <input type="password" placeholder="Password" {...register('pass')} />
                        {errors.pass && <p className="error-message">{errors.pass.message}</p>}
                        
                        <label>Specialty</label>
                        <select value={selectedSpecialty} onChange={handleSpecialtyChange} required>
                            <option value="" disabled>Specialty *</option>
                            <option value="271">Allergist</option>
	<option value="497">Anatomical Cytopathologist</option>
	<option value="57">Andrologist</option>
	<option value="15">Anesthesiologist</option>
	<option value="49">Angiologist</option>
	<option value="925">Audioprothesist</option>
	<option value="26">Oncologist</option>
	<option value="184">Medical Oncologist</option>
	<option value="185">Radiation Oncologist</option>
	<option value="16">Cardiologist</option>
	<option value="191">Chiropractor</option>
	<option value="17">Surgeon</option>
	<option value="180">Oncological Surgeon</option>
	<option value="1367">Facial and Neck Surgeon</option>
	<option value="205">Hand Surgeon</option>
	<option value="285">Pediatric Surgeon</option>
	<option value="47">Maxillofacial Surgeon</option>
	<option value="175">Maxillofacial and Stomatologist Surgeon</option>
	<option value="388">Oral Surgeon</option>
	<option value="19">Orthopedic Surgeon</option>
	<option value="12100">Orthopedic and Traumatologic Surgeon</option>
	<option value="18">Plastic and Aesthetic Surgeon</option>
	<option value="176">Thoracic and Cardiovascular Surgeon</option>
	<option value="177">Urological Surgeon</option>
	<option value="178">Vascular Surgeon</option>
	<option value="179">Visceral and Digestive Surgeon</option>
	<option value="1">Dentist</option>
	<option value="6">Dermatologist</option>
	<option value="414">Dietitian</option>
	<option value="36">Endocrinologist</option>
	<option value="398">Ergotherapist</option>
	<option value="21">Gastroenterologist and Hepatologist</option>
	<option value="35">Geneticist</option>
	<option value="55">Geriatrician</option>
	<option value="100">Medical Gynecologist</option>
	<option value="5">Medical Gynecologist and Obstetrician</option>
	<option value="102">Obstetrician-Gynecologist</option>
	<option value="28">Hematologist</option>
	<option value="378">Infectious Disease Specialist</option>
	<option value="30">Nurse</option>
	<option value="9">Physiotherapist</option>
	<option value="194">Acupuncturist</option>
	<option value="396">Addictologist</option>
	<option value="282">Biologist</option>
	<option value="889">Oral and Dental Medicine Doctor</option>
	<option value="232">Sports Medicine Doctor</option>
	<option value="37">Occupational Medicine Doctor</option>
	<option value="2">General Practitioner</option>
	<option value="228">Homeopath</option>
	<option value="434">Morphologist and Anti-Aging Specialist</option>
	<option value="32">Nuclear Medicine Doctor</option>
	<option value="190">Nutritionist</option>
	<option value="288">Reanimator</option>
	<option value="289">Public Health Specialist</option>
	<option value="12446">Specialist in General Medicine</option>
	<option value="1096">Emergency Physician</option>
	<option value="27">Nephrologist</option>
	<option value="20">Neurosurgeon</option>
	<option value="22">Neurologist</option>
	<option value="1642">Ocularist</option>
	<option value="4">Ophthalmologist</option>
	<option value="6493">Optician</option>
	<option value="7">ENT Specialist</option>
	<option value="421">ENT - Facial and Neck Surgeon</option>
	<option value="270">Orthodontist</option>
	<option value="1643">Orthopedic Orthotist</option>
	<option value="12">Speech Therapist</option>
	<option value="724">Orthoprothetist</option>
	<option value="29">Orthoptist</option>
	<option value="10">Osteopath</option>
	<option value="3">Pediatrician</option>
	<option value="8">Podiatrist</option>
	<option value="3097">Pharmacist</option>
	<option value="226">Phlebologist</option>
	<option value="23">Pulmonologist</option>
	<option value="575">Foot Orthotist</option>
	<option value="13">Psychiatrist</option>
	<option value="578">Child and Adolescent Psychiatrist</option>
	<option value="14">Psychologist</option>
	<option value="577">Psychomotrician</option>
	<option value="169">Psychotherapist</option>
	<option value="11">Radiologist</option>
	<option value="33">Radiotherapist</option>
	<option value="24">Rheumatologist</option>
	<option value="34">Midwife</option>
	<option value="18">Specialist in Reconstructive and Aesthetic Plastic Surgery</option>
	<option value="59">Specialist in Hemobiology-Transfusion</option>
	<option value="31">Specialist in Internal Medicine</option>
	<option value="61">Specialist in Forensic Medicine and Medical Expertise</option>
	<option value="284">Specialist in Physical Medicine and Rehabilitation</option>
	<option value="25">Stomatologist</option>
                        </select>
                        
                        <input type="submit" value="Sign Up" />
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>

                    <Link to="/login" className="signin-link">Already have an account?</Link>
                </div>
            </section>
        </div>
    );
};

export default DocSignUp;
