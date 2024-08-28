
import React, { useState, useEffect} from 'react';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../Configs/firebase'; 
import './Login.css'; 

export const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 
    const auth = getAuth(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem("user", JSON.stringify(user))

            const doctorsCollection = collection(db, 'doctors');
            const patientsCollection = collection(db, 'patients');
            const doctorQuery = query(doctorsCollection, where('email', '==', email));
            const patientQuery = query(patientsCollection, where('email', '==', email));
            
            const doctorSnapshot = await getDocs(doctorQuery);
            const patientSnapshot = await getDocs(patientQuery);

            if (!doctorSnapshot.empty) {
                localStorage.setItem("role", "doctor")
                navigate('/DocDashboard');
            } else if (!patientSnapshot.empty) {
                localStorage.setItem("role", "patient")
                navigate('/ClientDashboard');
            } else {
                setError('User not found in either doctors or patients collection');
            }
        } catch (err) {
            setError(err.message);
        }
    };


    // Function to handle redirection to Sign Up page  
    // const handleRedirect = () => {
    //    navigate('/SignUp'); // Redirect to the SignUp page
    // }; 

    // ==> istead of it make <link to "/page1" > txt </link> as following it is easier 
    // in this case 

    return (
        <body className='bodyLogin'>
            <div className="loginContainer">
                <h2 className='logini'>Log in</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form className="loginForm" onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Enter your password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="loginButton">Log In</button>
                </form>
                <p className="redirectText">
                    <Link to="/signup" className="redirectButton">
                        Don't have an account?
                    </Link>
                </p>
            </div>
        </body>
=======
    const handleRedirect = () => {
        navigate('/SignUp'); 
    };

    return (
        <div className="loginContainer">
            <h2>Log In</h2>
            {error && <p className="errorMessage">{error}</p>}
            <form className="loginForm" onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Enter your password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="loginButton">Log In</button>
            </form>
            <p className="redirectText">
                Don't have an account?{' '}
                <button type="button" onClick={handleRedirect} className="redirectButton">
                    Sign Up
                </button>
            </p>
        </div>

    );
};

export default LogIn;
