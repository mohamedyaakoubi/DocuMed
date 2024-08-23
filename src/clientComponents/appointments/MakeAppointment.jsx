import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../Configs/firebase'; // Ensure this path is correct

export const MakeAppointment = () => {
    const location = useLocation();
    const { doctor } = location.state || {}; // Get doctor data from location state
    const navigate = useNavigate();

    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const appointmentRef = collection(db, 'appointments');
            await addDoc(appointmentRef, {
                doctorId: doctor.id,
                doctorName: doctor.name,
                doctorSurname: doctor.surname,
                doctorSpecialty: doctor.specialty,
                address: doctor.address,
                appointmentDate,
                appointmentTime,
                message,
                status: 'pending',
                timeDue: new Date(`${appointmentDate}T${appointmentTime}`).toISOString(), // Save timeDue as ISO string
            });

            alert('Appointment request submitted successfully!');
            navigate('/Appointments'); // Redirect to Appointments page after submission
        } catch (error) {
            console.error('Error requesting appointment:', error);
            alert('Failed to submit appointment request.');
        }
    };

    if (!doctor) {
        return <p>No doctor information available.</p>;
    }

    return (
        <div>
            <h2>Make Appointment</h2>
            <div>
                <img src="assets/hello.jpg" alt={doctor.name} width={100} height={100} />
                <p><strong>Name:</strong> {doctor.name} {doctor.surname}</p>
                <p><strong>Specialty:</strong> {doctor.specialty}</p>
                <p><strong>Address:</strong> {doctor.address}</p>
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
