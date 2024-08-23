import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../../Configs/firebase';
import { useNavigate } from 'react-router-dom';
import './dashcss.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const DocDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState({});
  const [loading, setLoading] = useState(true);
  const [docId, setDocId] = useState(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchDocIdAndAppointments = async () => {
      setLoading(true);

      try {
        if (currentUser) {
          // Get the current user's email
          const userEmail = currentUser.email;

          // Query Firestore to find the docId for the current user
          const doctorsCollection = collection(db, 'doctors');
          const q = query(doctorsCollection, where('email', '==', userEmail));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const doctorDoc = querySnapshot.docs[0].data();
            const doctorDocId = querySnapshot.docs[0].id;
            setDocId(doctorDocId);

            // Fetch appointments based on the found docId
            const appointmentsCollection = collection(db, 'patientAppointments');
            const appointmentsQuery = query(appointmentsCollection, where('docId', '==', doctorDocId));
            const appointmentsSnapshot = await getDocs(appointmentsQuery);

            const appointmentsList = appointmentsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));

            setAppointments(appointmentsList);

            // Fetch patient details
            const patientIds = [...new Set(appointmentsList.map(app => app.patientId))];
            const patientsCollection = collection(db, 'patientInfo');
            const patientsQuery = query(patientsCollection, where('patientId', 'in', patientIds));
            const patientsSnapshot = await getDocs(patientsQuery);

            const patientsData = {};
            patientsSnapshot.docs.forEach(doc => {
              const data = doc.data();
              patientsData[data.patientId] = data;
            });

            setPatients(patientsData);
          } else {
            console.error('Doctor not found');
          }
        }
      } catch (error) {
        console.error('Error fetching doctor ID or appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocIdAndAppointments();
  }, [currentUser]);

  const handleAction = async (appointmentId, action) => {
    try {
      const appointmentDocRef = doc(db, 'patientAppointments', appointmentId);

      if (action === 'accept') {
        await updateDoc(appointmentDocRef, { status: 'Accepted' });
      } else if (action === 'reject') {
        await updateDoc(appointmentDocRef, { status: 'Rejected' });
      } else if (action === 'delay') {
        await updateDoc(appointmentDocRef, { status: 'Delayed' });
      }

      // Refresh appointments list
      if (docId) {
        const updatedQuerySnapshot = await getDocs(query(collection(db, 'patientAppointments'), where('docId', '==', docId)));
        const updatedAppointmentsList = updatedQuerySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(updatedAppointmentsList);
      }
    } catch (error) {
      console.error('Error handling appointment action:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      sessionStorage.clear();
      navigate('/Login');
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCardClick = (patientId) => {
    navigate(`/PatientRecords/${patientId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard">
      <button 
        onClick={handleLogout} 
        style={{ marginBottom: '20px', padding: '10px', backgroundColor: 'red', color: 'white' }}
      >
        Logout
      </button>

      <div className='main--content'>
        <div className='header--wrapper'>
          <div className='header--title'>
            <span>Primary</span>
            <h2>Dashboard</h2>
          </div>
          <div className='user--info'> 
            <div className='search--box'>
              <i className="fas fa-search"></i>
              <input type='text' placeholder='Search'/>
            </div>
            <img src="/assets/doctor.jpg" alt='' />
          </div>
        </div>

        <div className='tabular--wrapper'>
          <h3 className='main--title'>Today's Appointments</h3>
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Date</th>
                  <th>Appointment Type</th>
                  <th className='lined'>Accept</th>
                  <th>Reject</th>
                  <th>Delay</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => {
                  const patient = patients[appointment.patientId] || {};
                  return (
                    <tr key={appointment.id}>
                      <td>{patient.name || 'N/A'}</td>
                      <td>{patient.surname || 'N/A'}</td>
                      <td>{new Date(appointment.appointmentDue.seconds * 1000).toLocaleString()}</td>
                      <td>{appointment.specialty || 'N/A'}</td>
                      <td><button className='accept' onClick={() => handleAction(appointment.id, 'accept')}>Accept</button></td>
                      <td><button className='reject' onClick={() => handleAction(appointment.id, 'reject')}>Reject</button></td>
                      <td><button className='delete' onClick={() => handleAction(appointment.id, 'delay')}>Delay</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Patient cards should be displayed here if intended */}
      <div className="patient-cards-container">
        {Object.values(patients).map(patient => (
          <div
            key={patient.patientId}
            className="patient-card"
            onClick={() => navigate(`/PatientRecord/${patient.patientId}`)} // Navigate to patient detail page
          >
            <div className='patient-info'>
              <h4>{patient.name} {patient.surname}</h4>
              <p>Age: {patient.age || 'N/A'}</p>
              <p>Gender: {patient.gender || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocDashboard;
