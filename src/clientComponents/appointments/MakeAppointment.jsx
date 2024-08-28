import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../Configs/firebase';
import './MakeAppointment.css';

export const MakeAppointment = () => {
    const location = useLocation();
    const { doctor, patientId } = location.state || {};
    const navigate = useNavigate();

    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [message, setMessage] = useState('');
    const [status] = useState('Pending Approval');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!doctor || !patientId) {
            alert('Doctor or patient information is missing.');
            return;
        }

        if (!appointmentDate || !appointmentTime) {
            alert('Please select both date and time for the appointment.');
            return;
        }

        try {
            const appointmentDue = new Date(`${appointmentDate}T${appointmentTime}`);

            const appointmentRef = collection(db, 'patientAppointments');
            await addDoc(appointmentRef, {
                appointmentDue: Timestamp.fromDate(appointmentDue),
                appointmentId: Date.now().toString(),
                docId: doctor.docId || '',
                docName: doctor.name || '',
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
        return <p className="error-message">Doctor or patient information is missing.</p>;
    }

    return (
        <div className="appointment-container">
            <h2 className="appointment-title">Make an Appointment</h2>
            <div className="doctor-info">
                <img src="assets/hello.jpg" alt={doctor.name} className="doctor-image" />
                <p><strong>{doctor.name} {doctor.surname}</strong></p>
                <p>{doctor.specialty}</p>
                <p>{doctor.docAddress || 'Address not provided'}</p>
            </div>
            <form onSubmit={handleSubmit} className="appointment-form">
                <div className="form-group">
                    <label htmlFor="date">Appointment Date:</label>
                    <input
                        type="date"
                        id="date"
                        className="date-picker"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Appointment Time:</label>
                    <input
                        type="time"
                        id="time"
                        className="time-picker"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        className="message-box"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter any specific details or concerns..."
                    />
                </div>
                <button type="submit" className="submit-button">Submit Request</button>
            </form>
        </div>
    );
};

export default MakeAppointment;
