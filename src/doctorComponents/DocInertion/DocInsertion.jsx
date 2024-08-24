import { useState } from 'react';
import { db } from '../../Configs/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

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
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="diagnosis">Diagnosis</label>
                    <input
                        type="text"
                        className="form-control"
                        id="diagnosis"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="docAddress">Doctor Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="docAddress"
                        value={docAddress}
                        onChange={(e) => setDocAddress(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="docName">Doctor Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="docName"
                        value={docName}
                        onChange={(e) => setDocName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="docSurname">Doctor Surname</label>
                    <input
                        type="text"
                        className="form-control"
                        id="docSurname"
                        value={docSurname}
                        onChange={(e) => setDocSurname(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="remarks">Remarks</label>
                    <input
                        type="text"
                        className="form-control"
                        id="remarks"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty</label>
                    <input
                        type="text"
                        className="form-control"
                        id="specialty"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="treatment">Treatment</label>
                    <input
                        type="text"
                        className="form-control"
                        id="treatment"
                        value={treatment}
                        onChange={(e) => setTreatment(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="stillOngoing">Still Ongoing</label>
                    <input
                        type="checkbox"
                        id="stillOngoing"
                        checked={stillOngoing}
                        onChange={(e) => setStillOngoing(e.target.checked)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="visits">Visits</label>
                    <input
                        type="number"
                        className="form-control"
                        id="visits"
                        value={visits}
                        onChange={(e) => setVisits(parseInt(e.target.value, 10))}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default DocInsertion;
