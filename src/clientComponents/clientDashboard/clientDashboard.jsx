import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { db } from '../../Configs/firebase'; // Ensure this path is correct
import './ClientDashboard.css'; // Import the CSS file

export const ClientDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    const patientId = user ? user.uid : null; // Assuming patientId is the user's UID

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const doctorsCollection = collection(db, 'doctors');
                const doctorSnapshot = await getDocs(doctorsCollection);
                const doctorList = doctorSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setDoctors(doctorList);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.clear(); // Clear local storage on logout
            navigate('/Login'); // Redirect to login page after logout
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="client-dashboard">
            <header className="dashboard-header">
                <div className="search-container">
                    <CiSearch className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for doctors"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <button className="search-button">Search</button>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </header>
            <h2 className="dashboard-title">Search for Your Doctor</h2>
            <div className="doctor-list">
                {filteredDoctors.map(doctor => (
                    <div key={doctor.id} className="doctor-card">
                        <img src="assets/hello.jpg" alt={doctor.name} className="doctor-image" />
                        <div className="doctor-info">
                            <p><strong>Name:</strong> {doctor.name}</p>
                            <p><strong>Surname:</strong> {doctor.surname}</p>
                            <p><strong>Specialty:</strong> {doctor.specialty}</p>
                        </div>
                        <Link to="/MakeAppointment" state={{ doctor, patientId }}>
                            <button className="appointment-button">Make Appointment</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientDashboard;
