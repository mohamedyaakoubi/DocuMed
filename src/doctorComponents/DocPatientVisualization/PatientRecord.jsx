import { useEffect, useState } from 'react';
import { db } from '../../Configs/firebase'; // Import the Firestore database instance
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './PatientRecord.css';

export const PatientRecord = () => {
    const { patientId } = useParams(); // Get the `patientId` from the URL parameters
    const [patient, setPatient] = useState(null); // State to hold patient details
    const [medicalHistory, setMedicalHistory] = useState([]); // State to hold the patient's medical history
    const [loading, setLoading] = useState(true); // Loading state to handle asynchronous data fetching
    const navigate = useNavigate(); // Hook to programmatically navigate within the app

    useEffect(() => {
        const fetchPatientData = async () => {
            setLoading(true); // Set loading to true when fetching begins

            try {
                // Fetch patient details from the `patients` collection where `patientId` matches
                const patientRef = collection(db, 'patients');
                const patientQuery = query(patientRef, where('patientId', '==', patientId));
                const patientDocs = await getDocs(patientQuery);

                if (patientDocs.empty) {
                    console.error('Patient not found!');
                    setPatient(null);
                    setLoading(false); // Stop loading if no patient is found
                    return;
                }

                // Assuming only one patient is found, take the first document
                const patientDoc = patientDocs.docs[0];
                setPatient(patientDoc.data()); // Set patient data to state

                // Fetch medical history from the `patientRecord` collection
                const medicalHistoryRef = collection(db, 'patientRecord');
                const historyQuery = query(
                    medicalHistoryRef,
                    where('patientId', '==', patientId), // Match the patientId
                    orderBy('timeAdded', 'desc') // Order by the time the record was added, most recent first
                );

                const querySnapshot = await getDocs(historyQuery);

                if (querySnapshot.empty) {
                    console.log('No medical records found for this patient.');
                }

                const historyList = querySnapshot.docs.map(doc => doc.data()); // Map the documents to their data
                setMedicalHistory(historyList); // Set the fetched history to state
            } catch (error) {
                console.error('Error fetching patient data:', error); // Log any errors
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        fetchPatientData(); // Invoke the fetch function when component mounts
    }, [patientId]); // Dependency array ensures fetch is called when patientId changes

    // Function to navigate to the diagnosis insertion page with the current patientId
    const handleInsertDiagnosis = () => {
        navigate('/DocInsertion', { state: { patientId } });
    };

    // Function to navigate to the edit page
    const handleEditInfo = () => {
        navigate('/ClientParams', { state: { patientId } });
    };

    if (loading) {
        return <p className="loading-message">Loading patient information...</p>; // Render loading message while data is being fetched
    }

    if (!patient) {
        return <p className="loading-message">Patient not found.</p>; // Render message if no patient data is found
    }

    return (
        <div className="patient-record">
            <Card className="patient-card">
                <Card.Body>
                    <div className="patient-header">
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Patient" className="patient-image" />
                        <div className="patient-info">
                            <h1>{patient.name} {patient.surname}</h1>
                            <p><strong>Age:</strong> {patient.age}</p>
                            <p><strong>Gender:</strong> {patient.gender}</p>
                            <p><strong>ID:</strong> {patient.patientId}</p>
                            <Button className="edit-button" variant="outline-primary" onClick={handleEditInfo}>
                                Edit Info
                            </Button>
                        </div>
                    </div>

                    <div className="patient-details">
                        <h5>Contact Information</h5>
                        <p><strong>Email:</strong> {patient.email || 'N/A'}</p>
                        <p><strong>Phone:</strong> {patient.phone || 'N/A'}</p>
                        <p><strong>Mobile:</strong> {patient.mobile || 'N/A'}</p>
                        <p><strong>Address:</strong> {patient.address || 'N/A'}</p>
                    </div>

                    <div className="medical-history">
                        <h2>Medical History</h2>
                        {medicalHistory.length > 0 ? (
                            <ul>
                                {medicalHistory.map((record, index) => (
                                    <li key={index} className="record-item">
                                        <hr />
                                        <p><strong>Date:</strong> {record.timeAdded ? new Date(record.timeAdded.seconds * 1000).toLocaleString() : 'N/A'}</p>
                                        <p><strong>Doctor:</strong> Dr. {record.docName || 'N/A'} {record.docSurname || 'N/A'}</p>
                                        <p><strong>Diagnosis:</strong> {record.diagnosis || 'N/A'}</p>
                                        <p><strong>Treatment:</strong> {record.treatment || 'N/A'}</p>
                                        <p><strong>Description:</strong> {record.description || 'N/A'}</p>
                                        <p><strong>Remarks:</strong> {record.remarks || 'N/A'}</p>
                                        <p><strong>Specialty:</strong> {record.specialty || 'N/A'}</p>
                                        <p><strong>Doctor Address:</strong> {record.docAddress || 'N/A'}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No medical history available.</p>
                        )}
                    </div>

                    <Button className="insert-diagnosis-btn" variant="primary" onClick={handleInsertDiagnosis}>
                        Insert Diagnosis
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default PatientRecord;
