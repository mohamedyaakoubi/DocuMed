import React, { useState } from 'react';
import { db } from '../../Configs/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import Form from 'react-bootstrap/Form';
import '../styleSignUp.css';

const DocInsertion = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const patientId = location.state?.patientId;
    const [description, setDescription] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [docAddress, setDocAddress] = useState('');
    const [docName, setDocName] = useState('');
    const [docSurname, setDocSurname] = useState('');
    const [remarks, setRemarks] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [treatment, setTreatment] = useState('');
    const [stillOngoing, setStillOngoing] = useState(false);
    const [visits, setVisits] = useState(0);

    const auth = getAuth();
    const currentUser = auth.currentUser;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            console.error('User not authenticated');
            return;
        }

        try {
            const recordRef = collection(db, 'patientRecord');
            await addDoc(recordRef, {
                description,
                diagnosis,
                docAddress,
                docId: currentUser.uid, // Use the authenticated user's ID
                docName,
                docSurname,
                patientId,
                remarks,
                specialty,
                stillOngoing,
                timeAdded: Timestamp.now(),
                treatment,
                visits
            });

            navigate(`/PatientRecord/${patientId}`);
        } catch (error) {
            console.error('Error adding document:', error);
        }
    };

    return (
        <div>
            <h1>Insert Diagnosis</h1>
            <div className="body">
                <form
                    className="container containerdiv"
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column' }}
                >
                    <textarea
                        className="form-control"
                        placeholder="Description"
                        id="floatingTextarea2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>

                    <Form.Control
                        className="inputss"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        type="text"
                        placeholder="Diagnosis"
                        required
                    />
                    <Form.Control
                        className="inputss"
                        value={docAddress}
                        onChange={(e) => setDocAddress(e.target.value)}
                        type="text"
                        placeholder="Doctor Address"
                        required
                    />
                    <Form.Control
                        className="inputss"
                        value={docName}
                        onChange={(e) => setDocName(e.target.value)}
                        type="text"
                        placeholder="Doctor Name"
                        required
                    />
                    <Form.Control
                        className="inputss"
                        value={docSurname}
                        onChange={(e) => setDocSurname(e.target.value)}
                        type="text"
                        placeholder="Doctor Surname"
                        required
                    />
                    <Form.Control
                        className="inputss"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        type="text"
                        placeholder="Remarks"
                        required
                    />
                    <Form.Control
                        className="inputss"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        type="text"
                        placeholder="Specialty"
                        required
                    />
                    <Form.Control
                        className="inputss"
                        value={treatment}
                        onChange={(e) => setTreatment(e.target.value)}
                        type="text"
                        placeholder="Treatment"
                        required
                    />
                    <label>
                        <input
                            className="chekini"
                            type="checkbox"
                            checked={stillOngoing}
                            onChange={(e) => setStillOngoing(e.target.checked)}
                        />
                        Still Ongoing
                    </label>
                    <button className="form-button" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DocInsertion;
