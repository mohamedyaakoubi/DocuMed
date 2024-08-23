import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../Configs/firebase'; // Ensure this path is correct

export const MakeAppointment = () => {
    const location = useLocation();
    const { doctor, patientId } = location.state || {}; // Get doctor and patient data from location state
    const navigate = useNavigate();

    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [message, setMessage] = useState('');
    const [status] = useState('Pending Approval'); // Default status

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!doctor || !patientId) {
            alert('Doctor or patient information is missing.');
            return;
        }
    
        // Validate the date and time
        if (!appointmentDate || !appointmentTime) {
            alert('Please select both date and time for the appointment.');
            return;
        }
    
        console.log('Doctor ID for appointment:', doctor.id); // Debugging log
    
        try {
            const appointmentDue = new Date(`${appointmentDate}T${appointmentTime}`);
    
            const appointmentRef = collection(db, 'patientAppointments');
            await addDoc(appointmentRef, {
                appointmentDue: Timestamp.fromDate(appointmentDue),
                appointmentId: Date.now().toString(),
                docId: doctor.docId || '', // Ensure the doctor ID is included
                docName: doctor.name || '', // Ensure default values if needed
                docSurname: doctor.surname || '',
                specialty: doctor.specialty || '',
                message: message || '',
                patientId: patientId || '',
                status: status,
            });
    
            alert('Appointment request submitted successfully!');
            navigate('/Appointments');
        } catch (error) {
            console.error('Error requesting appointment:', error);
            alert('Failed to submit appointment request.');
        }
    };

    if (!doctor || !patientId) {
        return <p>Doctor or patient information is missing.</p>;
    }

    return (
        <div>
            <h2>Make Appointment</h2>
            <div>
                <img src="assets/hello.jpg" alt={doctor.name} width={100} height={100} />
                <p><strong>Name:</strong> {doctor.name} {doctor.surname}</p>
                <p><strong>Specialty:</strong> {doctor.specialty}</p>
                <p><strong>Address:</strong> {doctor.docAddress || 'Not provided'}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Appointment Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="time">Appointment Time:</label>
                    <input
                        type="time"
                        id="time"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button type="submit">Submit Request</button>
            </form>
        </div>
    );
};

export default MakeAppointment;
