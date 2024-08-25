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
            <div style={{ border: "solid black 1px", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <CiSearch />
                <input
                    type="text"
                    className="form-control empty"
                    id="iconified"
                    placeholder="Search for doctors"
                />
                <button>Search</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <h2>Search for Your Doctor</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
                {doctors.map(doctor => (
                    <div key={doctor.id} style={{ backgroundColor: "#00b5ec", padding: "1rem", borderRadius: "8px" }}>
                        <img src="assets/hello.jpg" alt={doctor.name} width={50} height={50} style={{borderRadius:'50%', marginBottom:"20px"}}/>
                        <br />
                        <span style={{ display: "inline-block" }}>
                            <p style={{ display: "inline-block", margin: 0 }}>Name:</p>
                            <p style={{ display: "inline-block", margin: 0 }}>{doctor.name}</p>
                        </span><br />
                        <p style={{ display: "inline-block", margin: 0 }}>Surname:</p>
                        <p style={{ display: "inline-block", margin: 0 }}>{doctor.surname}</p><br />
                        <p style={{ display: "inline-block", margin: 0 }}>Specialty:</p>
                        <p style={{ display: "inline-block", margin: 0 }}>{doctor.specialty}</p><br />
                        <p>More info?</p>
                        <Link to="/MakeAppointment" state={{ doctor, patientId }}>
                            <button style={{borderRadius:'20px', marginBottom:"20px"}}>Make Appointment</button>
                        </Link>
                        <br />
                    </div>
                ))}
            </div>
        </>
    );
};

export default ClientDashboard;