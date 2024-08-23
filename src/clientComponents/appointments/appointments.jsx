import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Configs/firebase'; // Ensure this path is correct

export const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const appointmentsCollection = collection(db, 'appointments');
                const appointmentsSnapshot = await getDocs(appointmentsCollection);
                const appointmentsList = appointmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAppointments(appointmentsList);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div>
            <h2>Your Appointments</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
                {appointments.map(appointment => (
                    <div key={appointment.id} style={{ backgroundColor: "lightgray", padding: "1rem", borderRadius: "8px" }}>
                        <img src="assets/hello.jpg" alt={appointment.doctorName} width={50} height={50} />
                        <br />
                        <p><strong>Doctor:</strong> {appointment.doctorName} {appointment.doctorSurname}</p>
                        <p><strong>Specialty:</strong> {appointment.doctorSpecialty}</p>
                        <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {new Date(appointment.timeDue).toLocaleTimeString()}</p>
                        <p><strong>Status:</strong> {appointment.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Appointments;
