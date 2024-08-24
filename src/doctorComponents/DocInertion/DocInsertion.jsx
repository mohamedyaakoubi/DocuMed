import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { db } from '../../Configs/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styleSignUp.css'

export const DocInsertion = () => {
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

    const navigate = useNavigate();

    const patientRecordRef = collection(db, 'patientRecord'); // Collection reference

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newRecord = {
                description,
                diagnosis,
                docAddress,
                docId: '1111', // Hard-coded doctor ID for testing
                docName,
                docSurname,
                patientId: '1212', // Hard-coded patient ID for testing
                remarks,
                specialty,
                stillOngoing,
                timeAdded: serverTimestamp(),
                treatment,
                visits: visits + 1 // Increment visits
            };

            await addDoc(patientRecordRef, newRecord);

            setDescription('');
            setDiagnosis('');
            setDocAddress('');
            setDocName('');
            setDocSurname('');
            setRemarks('');
            setSpecialty('');
            setTreatment('');
            setStillOngoing(false);
            setVisits(prev => prev + 1);

            navigate(`/patients/1212`); // Redirect to the patient record page (hard-coded patient ID)

        } catch (error) {
            console.error('Error adding patient record:', error);
        }
    };

    return (
        <div class="body"> 
        <form
            class="container , containerdiv"
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            
                <textarea class="form-control" placeholder="Description" id="floatingTextarea2" value={description}
                onChange={(e) => setDescription(e.target.value)} required></textarea>
                
            
            
            <Form.Control className='inputss'
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                type="text"
                placeholder="Diagnosis"
                required
            />
            <Form.Control className='inputss'
                value={docAddress}
                onChange={(e) => setDocAddress(e.target.value)}
                type="text"
                placeholder="Doctor Address"
                required
            />
            <Form.Control className='inputss'
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                type="text"
                placeholder="Doctor Name"
                required
            />
            <Form.Control className='inputss'
                value={docSurname}
                onChange={(e) => setDocSurname(e.target.value)}
                type="text"
                placeholder="Doctor Surname"
                required
            />
            <Form.Control className='inputss'
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                type="text"
                placeholder="Remarks"
                required
            />
            <Form.Control className='inputss'
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                type="text"
                placeholder="Specialty"
                required
            />
            <Form.Control className='inputss'
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                type="text"
                placeholder="Treatment"
                required
            />
            <label>
                <input
                    className='chekini'
                    type="checkbox"
                    checked={stillOngoing}
                    onChange={(e) => setStillOngoing(e.target.checked)}
                />
                Still Ongoing
            </label>
            <button className='form-button' type="submit">Submit</button>
            
            
        </form>
        </div>
    );
};
