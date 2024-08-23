import { useState } from 'react';
import { db } from '../../Configs/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

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
        <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Description"
                required
            />
            <input
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                type="text"
                placeholder="Diagnosis"
                required
            />
            <input
                value={docAddress}
                onChange={(e) => setDocAddress(e.target.value)}
                type="text"
                placeholder="Doctor Address"
                required
            />
            <input
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                type="text"
                placeholder="Doctor Name"
                required
            />
            <input
                value={docSurname}
                onChange={(e) => setDocSurname(e.target.value)}
                type="text"
                placeholder="Doctor Surname"
                required
            />
            <input
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                type="text"
                placeholder="Remarks"
                required
            />
            <input
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                type="text"
                placeholder="Specialty"
                required
            />
            <input
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                type="text"
                placeholder="Treatment"
                required
            />
            <label>
                <input
                    type="checkbox"
                    checked={stillOngoing}
                    onChange={(e) => setStillOngoing(e.target.checked)}
                />
                Still Ongoing
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};
