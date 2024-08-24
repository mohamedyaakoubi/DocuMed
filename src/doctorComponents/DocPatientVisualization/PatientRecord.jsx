import { useEffect, useState } from 'react';
import { db } from '../../Configs/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

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
        <div class="container" style={{float:'left' , backgroundColor:'white'}}>
            <div class="main-body">
            
        
                <div class="row gutters-sm">
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150"/>
                                    <div class="mt-3">
                                        <h4>{patient.name}</h4>
                                        <p class="text-secondary mb-1" style={{fontWeight:'bold'}}>{patient.patientId}</p>
                                        <p class="text-secondary mb-1">19 years old</p>
                                        <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                                        <button class="btn btn-primary">Message</button>
                                        
                                    </div>
                                </div>
                            
                            
                            </div>
                            </div>
                        </div>
                        
                        
                        <div class="col-md-8">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-sm-3">
                                        <h6 class="mb-0" >Full Name</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                        Kenneth Valdez
                                    </div>
                                </div>
                                <hr/>
                                <div class="row">
                                    <div class="col-sm-3">
                                    <h6 class="mb-0">Email</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    fip@jukmuh.al
                                    </div>
                                </div>
                                <hr/>
                                <div class="row">
                                    <div class="col-sm-3">
                                    <h6 class="mb-0">Phone</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    (239) 816-9029
                                    </div>
                                </div>
                                <hr/>
                                <div class="row">
                                    <div class="col-sm-3">
                                    <h6 class="mb-0">Mobile</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    (320) 380-4539
                                    </div>
                                </div>
                                <hr/>
                                <div class="row">
                                    <div class="col-sm-3">
                                    <h6 class="mb-0" style={{marginRight:'-10px'}}>Address</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    Bay Area, San Francisco, CA
                                    </div>
                                </div>
                                <hr/>
                                <div class="row">
                                    <div class="col-sm-12">
                                    <a class="btn btn-primary " target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</a>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                
            
            </div> 
        </div>
        



        <div  > 
        <form
            class="container , containerdiv"
            style={{marginTop:'-500px', display: 'flex', flexDirection: 'column'}}
        >
            
                <textarea class="form-control" placeholder="Description" id="floatingTextarea2" ></textarea>
                
            
                
            <Form.Control className='inputss'
                
                type="text"
                placeholder={"Date: +" + 'record.docName' || 'N/A'}
                disabled
            />
            <Form.Control className='inputss'

                type="text"
                placeholder="Doctor: "
                disabled
            />
            <Form.Control className='inputss'
      type="text"
                placeholder="Diagnosis: "
                disabled
            />
            <Form.Control className='inputss'
                

                type="text"
                placeholder="Treatment: "
                disabled
            />
            <Form.Control className='inputss'
                
                
                type="text"
                placeholder="Remarks: "
                disabled
            />
            <Form.Control className='inputss'
                
                type="text"
                placeholder="Specialty: "
                disabled
            />
            <Form.Control className='inputss'
                
                type="text"
                placeholder="Doctor Address: "
                disabled
            />
            
            
        </form>
        </div>
        --------------
            
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
            <SomeComponent />     </>
    );
};

// Test Component to render a link to a specific patient record
const SomeComponent = () => {
    const testPatientId = '12345'; // example ID for testing
    return <Link to={`/PatientRecord/${testPatientId}`}>View Test Patient Record</Link>;
};
