import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { db } from '../../Configs/firebase'; // Ensure this path is correct

export const ClientDashboard = () => {
    const [doctors, setDoctors] = useState([]);
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

    return (
        <>
            {/* Header with search bar */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 2rem",
                backgroundColor: "#f8f9fa",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginBottom: "2rem"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CiSearch size={24} />
                    <input
                        type="text"
                        className="form-control empty"
                        id="iconified"
                        placeholder="Search for doctors"
                        style={{
                            padding: "0.5rem",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            outline: "none",
                            width: "300px"
                        }}
                    />
                    <button style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginLeft: "0.5rem"
                    }}>
                        Search
                    </button>
                </div>
                <button onClick={handleLogout} style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer"
                }}>
                    Logout
                </button>
            </div>

            {/* Main content */}
            <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Search for Your Doctor</h2>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "1.5rem",
                padding: "0 2rem"
            }}>
                {doctors.map(doctor => (
                    <div key={doctor.id} style={{
                        backgroundColor: "#007bff",
                        padding: "1.5rem",
                        borderRadius: "12px",
                        color: "#fff",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.3s",
                    }}>
                        <img src="assets/hello.jpg" alt={doctor.name} width={50} height={50} style={{ borderRadius: '50%' }} />
                        <div style={{ marginTop: "1rem" }}>
                            <p style={{ margin: 0, fontWeight: "bold" }}>Name: {doctor.name}</p>
                            <p style={{ margin: 0 }}>Surname: {doctor.surname}</p>
                            <p style={{ margin: 0 }}>Specialty: {doctor.specialty}</p>
                        </div>
                        <div style={{ marginTop: "1rem" }}>
                            <Link to="/MakeAppointment" state={{ doctor, patientId }}>
                                <button style={{
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#28a745",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    width: "100%",
                                    textAlign: "center"
                                }}>
                                    Make Appointment
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ClientDashboard;
