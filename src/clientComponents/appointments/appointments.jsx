import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Configs/firebase'; // Ensure this path is correct
import './Appointments.css';

export const Appointments = ({ patientId }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            const UID = JSON.parse(localStorage.getItem("user")).uid;
            const testPatientId = UID; 

            if (!patientId && !testPatientId) {
                setError('Patient ID is not provided.');
                setLoading(false);
                return;
            }

            const idToQuery = patientId || testPatientId;

            console.log('Fetching appointments for patientId:', idToQuery);

            try {
                const appointmentsCollection = collection(db, 'patientAppointments');
                const q = query(appointmentsCollection, where('patientId', '==', idToQuery));
                const appointmentsSnapshot = await getDocs(q);

                console.log('Appointments snapshot:', appointmentsSnapshot);

                if (appointmentsSnapshot.empty) {
                    setError('No appointments found.');
                } else {
                    const appointmentsList = appointmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setAppointments(appointmentsList);
                }
            } catch (error) {
                setError('Error fetching appointments: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [patientId]);

    return (
        <div className="appointments-container">
            <h2 className="appointments-header">Your Appointments</h2>
            {loading ? (
                <p className="appointments-loading">Loading...</p>
            ) : error ? (
                <p className="appointments-error">{error}</p>
            ) : (
                <div className="appointments-grid">
                    {appointments.length > 0 ? (
                        appointments.map(appointment => (
                            <div key={appointment.appointmentId} className="appointment-card">
                                <img 
                                    src="assets/hello.jpg" 
                                    alt={appointment.docName} 
                                    className="appointment-image" 
                                />
                                <div className="appointment-info">
                                    <p className="appointment-doctor">
                                        {appointment.docName} {appointment.docSurname}
                                    </p>
                                    <p className="appointment-specialty">
                                        <strong>Specialty:</strong> {appointment.specialty}
                                    </p>
                                    <p className="appointment-date">
                                        <strong>Date:</strong> {new Date(appointment.appointmentDue.toDate()).toLocaleDateString()}
                                    </p>
                                    <p className="appointment-time">
                                        <strong>Time:</strong> {new Date(appointment.appointmentDue.toDate()).toLocaleTimeString()}
                                    </p>
                                    <p 
                                        className={`appointment-status ${appointment.status.toLowerCase()}`}
                                    >
                                        {appointment.status}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="appointments-empty">No appointments found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Appointments;
