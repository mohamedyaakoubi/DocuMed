import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Configs/firebase'; // Ensure this path is correct

export const Appointments = ({ patientId }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        const fetchAppointments = async () => {
            const UID = JSON.parse(localStorage.getItem("user")).uid;
            const testPatientId = UID; // Replace with a known patientId for testing

            if (!patientId && !testPatientId) {
                setError('Patient ID is not provided.');
                setLoading(false);
                return;
            }

            const idToQuery = patientId || testPatientId;

            console.log('Fetching appointments for patientId:', idToQuery); // Debugging output

            try {
                const appointmentsCollection = collection(db, 'patientAppointments');
                const q = query(appointmentsCollection, where('patientId', '==', idToQuery));
                const appointmentsSnapshot = await getDocs(q);

                console.log('Appointments snapshot:', appointmentsSnapshot); // Debugging output

                // Log all documents in the collection
                const allDocsSnapshot = await getDocs(appointmentsCollection);
                console.log('All documents in collection:', allDocsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                if (appointmentsSnapshot.empty) {
                    setError('No appointments found.');
                } else {
                    const appointmentsList = appointmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setAppointments(appointmentsList);
                }
            } catch (error) {
                setError('Error fetching appointments: ' + error.message);
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchAppointments();
    }, [patientId]);

    return (
        <div style={{ padding: "2rem" }}>
            <h2 style={{ marginBottom: "2rem", textAlign: "center", fontSize: "2rem", color: "#333" }}>Your Appointments</h2>
            {loading ? (
                <p style={{ textAlign: "center", color: "#999" }}>Loading...</p> // Display loading state
            ) : error ? (
                <p style={{ textAlign: "center", color: "red" }}>{error}</p> // Display error message if any
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
                    {appointments.length > 0 ? (
                        appointments.map(appointment => (
                            <div 
                                key={appointment.appointmentId} 
                                style={{
                                    backgroundColor: "#fff", 
                                    padding: "1.5rem", 
                                    borderRadius: "10px", 
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    textAlign: "center"
                                }}
                            >
                                <img 
                                    src="assets/hello.jpg" 
                                    alt={appointment.docName} 
                                    width={80} 
                                    height={80} 
                                    style={{ borderRadius: "50%", marginBottom: "1rem" }} 
                                />
                                <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                                    {appointment.docName} {appointment.docSurname}
                                </p>
                                <p style={{ color: "#666", marginBottom: "0.5rem" }}>
                                    <strong>Specialty:</strong> {appointment.specialty}
                                </p>
                                <p style={{ color: "#666", marginBottom: "0.5rem" }}>
                                    <strong>Date:</strong> {new Date(appointment.appointmentDue.toDate()).toLocaleDateString()}
                                </p>
                                <p style={{ color: "#666", marginBottom: "0.5rem" }}>
                                    <strong>Time:</strong> {new Date(appointment.appointmentDue.toDate()).toLocaleTimeString()}
                                </p>
                                <p 
                                    style={{ 
                                        fontWeight: "bold", 
                                        color: appointment.status === 'Pending' ? '#FFA500' : appointment.status === 'Approved' ? '#008000' : '#FF0000' 
                                    }}
                                >
                                    {appointment.status}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: "center", color: "#999", width: "100%" }}>No appointments found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Appointments;
