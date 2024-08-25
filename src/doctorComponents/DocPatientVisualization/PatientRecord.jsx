import { useEffect, useState } from 'react';
import { db } from '../../Configs/firebase'; // Import the Firestore database instance
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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

            <div className="container" style={{ float: 'left', backgroundColor: 'white' }}>
                <div className="main-body">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                            alt="Patient"
                                            className="rounded-circle"
                                            width="150"
                                        />
                                        <div className="mt-3">
                                            <h4>{patient.name}</h4>
                                            <p className="text-secondary mb-1" style={{ fontWeight: 'bold' }}>
                                                {patient.patientId}
                                            </p>
                                            <p className="text-secondary mb-1">{patient.age} years old</p>
                                            <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                                            <Button variant="primary">Message</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {patient.name} {patient.surname}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {patient.email || 'N/A'}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Phone</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {patient.phone || 'N/A'}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Mobile</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {patient.mobile || 'N/A'}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Address</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {patient.address || 'N/A'}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <Button variant="primary" target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">
                                                Edit
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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

            <Button className="btn btn-primary" onClick={handleInsertDiagnosis}>
                Insert Diagnosis
            </Button>
        </>
    );
};

export default PatientRecord;
