import { useEffect, useState } from 'react';
import { db } from '../../Configs/firebase'; // Import the Firestore database instance
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useParams, Link, useNavigate } from 'react-router-dom';

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

    if (loading) {
        return <p>Loading patient information...</p>; // Render loading message while data is being fetched
    }

    if (!patient) {
        return <p>Patient not found.</p>; // Render message if no patient data is found
    }

    return (
        <>
            <h1>{patient.name} {patient.surname}</h1> {/* Display patient's full name */}
            <p><strong>Age:</strong> {patient.age}</p> {/* Display patient's age */}
            <p><strong>Gender:</strong> {patient.gender}</p> {/* Display patient's gender */}
            <p><strong>ID:</strong> {patient.patientId}</p> {/* Display patient's ID */}

            <h2>Medical History</h2>
            {medicalHistory.length > 0 ? ( // Conditional rendering based on medical history availability
                <ul>
                    {medicalHistory.map((record, index) => (
                        <li key={index}>
                            <hr />
                            <p><strong>Date:</strong> {record.timeAdded ? new Date(record.timeAdded.seconds * 1000).toLocaleString() : 'N/A'}</p> {/* Convert and display date */}
                            <p><strong>Doctor:</strong> Dr. {record.docName || 'N/A'} {record.docSurname || 'N/A'}</p> {/* Display doctor's name */}
                            <p><strong>Diagnosis:</strong> {record.diagnosis || 'N/A'}</p> {/* Display diagnosis */}
                            <p><strong>Treatment:</strong> {record.treatment || 'N/A'}</p> {/* Display treatment */}
                            <p><strong>Description:</strong> {record.description || 'N/A'}</p> {/* Display description */}
                            <p><strong>Remarks:</strong> {record.remarks || 'N/A'}</p> {/* Display remarks */}
                            <p><strong>Specialty:</strong> {record.specialty || 'N/A'}</p> {/* Display doctor's specialty */}
                            <p><strong>Doctor Address:</strong> {record.docAddress || 'N/A'}</p> {/* Display doctor's address */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No medical history available.</p> // Render this if no medical history is available
            )}

            <button className="btn btn-primary" onClick={handleInsertDiagnosis}>
                Insert Diagnosis
            </button> {/* Button to navigate to diagnosis insertion page */}

            {/* Render the test component with the link to a test patient record */}
            <SomeComponent />
        </>
    );
};

// Test Component to render a link to a specific patient record
const SomeComponent = () => {
    const testPatientId = '12345'; // example ID for testing
    return <Link to={`/PatientRecord/${testPatientId}`}>View Test Patient Record</Link>; // Link to a test patient's record
};

export default PatientRecord;
