import { useEffect, useState } from 'react';
import { db } from '../../Configs/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';

export const PatientRecord = () => {
    const { patientId } = useParams();
    const [patient, setPatient] = useState(null);
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatientData = async () => {
            setLoading(true);

            try {
                // Fetch patient details
                const patientRef = collection(db, 'patientInfo');
                const patientQuery = query(patientRef, where('patientId', '==', patientId));
                const patientDocs = await getDocs(patientQuery);

                if (patientDocs.empty) {
                    console.error('Patient not found!');
                    setPatient(null);
                    setLoading(false);
                    return;
                }

                const patientDoc = patientDocs.docs[0];
                setPatient(patientDoc.data());

                // Fetch medical history
                const medicalHistoryRef = collection(db, 'patientRecord');
                const historyQuery = query(
                    medicalHistoryRef,
                    where('patientId', '==', patientId),
                    orderBy('timeAdded', 'desc')
                );

                const querySnapshot = await getDocs(historyQuery);
                console.log('Medical History Documents:', querySnapshot); // Debugging output

                if (querySnapshot.empty) {
                    console.log('No medical records found for this patient.');
                }

                const historyList = querySnapshot.docs.map(doc => doc.data()); // Get only the data, not IDs
                console.log('Medical History Data:', historyList); // Debugging output

                setMedicalHistory(historyList);
            } catch (error) {
                console.error('Error fetching patient data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPatientData();
    }, [patientId]);

    if (loading) {
        return <p>Loading patient information...</p>;
    }

    if (!patient) {
        return <p>Patient not found.</p>;
    }

    return (
        <>
            <h1>{patient.name} {patient.surname}</h1>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>ID:</strong> {patient.patientId}</p>

            <h2>Medical History</h2>
            {medicalHistory.length > 0 ? (
                <ul>
                    {medicalHistory.map((record, index) => (
                        <li key={index}>
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

            {/* Render the test component with the link to a test patient record */}
            <SomeComponent />
        </>
    );
};

// Test Component to render a link to a specific patient record
const SomeComponent = () => {
    const testPatientId = '12345'; // example ID for testing
    return <Link to={`/PatientRecord/${testPatientId}`}>View Test Patient Record</Link>;
};
