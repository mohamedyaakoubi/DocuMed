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
        <div>
            <h2>Your Appointments</h2>
            {loading ? (
                <p>Loading...</p> // Display loading state
            ) : error ? (
                <p>{error}</p> // Display error message if any
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
                    {appointments.length > 0 ? (
                        appointments.map(appointment => (
                            <div key={appointment.appointmentId} style={{ backgroundColor: "lightgray", padding: "1rem", borderRadius: "8px", textAlign: "center" }}>
                                <img src="assets/hello.jpg" alt={appointment.docName} width={50} height={50} />
                                <p><strong>Doctor:</strong> {appointment.docName} {appointment.docSurname}</p>
                                <p><strong>Specialty:</strong> {appointment.specialty}</p>
                                <p><strong>Date:</strong> {new Date(appointment.appointmentDue.toDate()).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {new Date(appointment.appointmentDue.toDate()).toLocaleTimeString()}</p>
                                <p><strong>Status:</strong> {appointment.status}</p>
                            </div>
                        ))
                    ) : (
                        <p>No appointments found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Appointments;
