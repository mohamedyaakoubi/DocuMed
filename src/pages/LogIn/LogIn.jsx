import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../Configs/firebase'; // Ensure this path is correct
import './Login.css'; 

export const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
    const auth = getAuth(); // Initialize Firebase Auth

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Sign in the user with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check if user exists in the doctors collection
            const doctorsCollection = collection(db, 'doctors');
            const patientsCollection = collection(db, 'patients');
            const doctorQuery = query(doctorsCollection, where('email', '==', email));
            const patientQuery = query(patientsCollection, where('email', '==', email));
            
            const doctorSnapshot = await getDocs(doctorQuery);
            const patientSnapshot = await getDocs(patientQuery);

            if (!doctorSnapshot.empty) {
                // User is a doctor
                navigate('/DocDashboard');
            } else if (!patientSnapshot.empty) {
                // User is a patient
                navigate('/ClientDashboard');
            } else {
                // No user found in either collection
                setError('User not found in either doctors or patients collection');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to handle redirection to Sign Up page
    const handleRedirect = () => {
        navigate('/SignUp'); // Redirect to the SignUp page
    };

    return (
        <div className="loginContainer">
            <h2>Log In</h2>
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
                Don't have an account?{' '}
                <button type="button" onClick={handleRedirect} className="redirectButton">
                    Sign Up
                </button>
            </p>
        </div>
    );
};

export default LogIn;
